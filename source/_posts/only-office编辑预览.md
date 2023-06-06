---
title: vue 集成 only office 实现文档编辑，预览功能
cover: /img/post-onlyoffice-01.jpg
categories:
  - 插件使用
---

上司让使用only office实现一个预览编辑的功能，查找文档后找到了如下方法，便记录了下来

## 基本配置使用
  ### 引入后台配置好的only office服务器
  1. 直接在public下的index.html引入
  ```javaScript
    <script type='text/javascript' src='http://ip:port/web-apps/apps/api/documents/api.js'></script>
  ```

  2. 在created函数中引入
  ```javaScript
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = http://ip:port/web-apps/apps/api/documents/api.js
    document.getElementsByTagName('head')[0].appendChild(script);
  ```

## Vue组件封装
```javaScript
<template>
    <div id="monitorOffice"></div>
</template>
<script>
import {handleDocType} from "../common/utils"
    export default {
        props: {
            option: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                doctype: ''
            }
        },
        mounted() {
            if (this.option.url)
                this.setEditor(this.option)
        },
        methods: {
            setEditor(option) {
               this.doctype = handleDocType(option.fileType);
                // office配置参数
                let config = {
                    document: {
                        fileType: option.fileType,
                        key: "",
                        title: option.title,
                        permissions: {
                            comment: false,
                            download: false,
                            modifyContentControl: true,
                            modifyFilter: true,
                            print: false,
                            edit: option.isEdit,//是否可以编辑: 只能查看，传false
                            // "fillForms": true,//是否可以填写表格，如果将mode参数设置为edit，则填写表单仅对文档编辑器可用。 默认值与edit或review参数的值一致。
                            // "review": true //跟踪变化
                        },
                        url: option.url
                    },
                    documentType: this.doctype,
                    editorConfig: {
                        callbackUrl: option.editUrl,//"编辑word后保存时回调的地址，这个api需要自己写了，将编辑后的文件通过这个api保存到自己想要的位置
                        lang: "zh",//语言设置
                        customization: {
                            autosave: false,//是否自动保存
                            chat: false,
                            comments: false,
                            help: false,
                            // "hideRightMenu": false,//定义在第一次加载时是显示还是隐藏右侧菜单。 默认值为false
                            logo: {
                                image: "https://file.iviewui.com/icon/viewlogo.png",
                                imageEmbedded: "https://file.iviewui.com/icon/viewlogo.png",
                            },
                            spellcheck: true,//拼写检查
                        },
                    },
                    width: "100%",
                    height: "100%",
                };
                let docEditor = new DocsAPI.DocEditor("monitorOffice", config);
            },
        },
        watch: {
            option: {
                handler: function (n, o) {
                    this.setEditor(n);
                    this.doctype = handleDocType(n.fileType);
                },
                deep: true,
            }
        }
    }
</script>
```

## 组件使用
```javaScript
<template>
    <div class="monitor-report">
        <Upload ref="upload" accept=".doc,.docx" :action="action" :headers="header" :format="['doc','docx']"
                :on-success="handleSuccess"
                :show-upload-list="false" :before-upload="handleBeforeUpload" :on-format-error="handleFormatError">
            <Button :loading="loading" class="up-class">上传</Button>
            <span>（文件格式为：doc,docx）</span>
        </Upload>
        <div class="office" v-if="pageLoading">
            <MonitorOffice :option="option"></MonitorOffice>
        </div>
    </div>
</template>
<script>
    // js
    import axios from "axios"
    import {GetMonitorReport} from "./api/template"
    import {USER_NAME_SESSION, USER_ID_SESSION} from "./common/storage";
    // 组件
    import MonitorOffice from "./components/monitor-office"

    export default {
        components: {
            MonitorOffice
        },
        data() {
            return {
                // 上传文件参数
                header: {
                    Authorization: `bearer ${sessionStorage.getItem("token")}`,
                },
                action: axios.defaults.baseURL + "/report/document/template",
                file: null,
                loading: false,
                // office配置参数
                option: {
                    url: "",
                    isEdit: false,
                    fileType: "",
                    title: ""
                },
                pageLoading: false
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.GetMonitorReport();
            },
            // 上传文件的格式验证
            handleFormatError(file) {
                this.$Message.warning(file.name + '格式不正确');
                this.loading = false;
            },
            // 上传之前
            handleBeforeUpload(file) {
                this.file = file;
                this.onUpload();
                return false;
            },
            onUpload() {
                this.loading = true;
                let _baseURL = axios.defaults.baseURL;
                this.action = `${_baseURL}/report/document/template`;
                setTimeout(() => {
                    this.$refs.upload.post(this.file);
                }, 1000)
            },
            // 导入成功时
            handleSuccess(res) {
                this.loading = false;
                if (res.status) {
                    this.$Message.success("上传成功");
                    // 这里重新上传文件，only office不会覆盖，所以先刷新解决
                    // location.reload();
                    this.GetMonitorReport();
                }
            },
            // 获取项目下监察报告模板
            GetMonitorReport() {
                this.pageLoading = false
                GetMonitorReport().then(res => {
                    if (res.status) {
                        let data = res.data;
                        if (data) {
                            this.option = {
                                url: data.fileViewPath,
                                fileType: data.fileType,
                                title: "",
                                isEdit: false,
                            }
                        }
                        this.pageLoading = true
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .monitor-report {
        .up-class {
            margin-bottom: 10px;
        }

        .office {
            height: 100vh;
        }
    }
</style>

```

## 配置项中documentType 动态设置
```javaScript
export function handleDocType(fileType) {
    let docType = '';
    let fileTypesDoc = [
        'doc', 'docm', 'docx', 'dot', 'dotm', 'dotx', 'epub', 'fodt', 'htm', 'html', 'mht', 'odt', 'ott', 'pdf', 'rtf', 'txt', 'djvu', 'xps'
    ];
    let fileTypesCsv = [
        'csv', 'fods', 'ods', 'ots', 'xls', 'xlsm', 'xlsx', 'xlt', 'xltm', 'xltx'
    ];
    let fileTypesPPt = [
        'fodp', 'odp', 'otp', 'pot', 'potm', 'potx', 'pps', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx'
    ];
    if (fileTypesDoc.includes(fileType)) {
        docType = 'text'
    }
    if (fileTypesCsv.includes(fileType)) {
        docType = 'spreadsheet'
    }
    if (fileTypesPPt.includes(fileType)) {
        docType = 'presentation'
    }
    return docType;
}

```
