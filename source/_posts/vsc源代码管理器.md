---
title: VS code 当前打开的文件夹中没有git存储库
cover: /img/vsc-git.jpg
categories:
  - VS code 配置
---

踩坑！踩坑！今天下午切换分支时电脑卡死了，然后就直接关闭vsc编辑器，再次打开时，发现vsc的源码管理器不会自动识别已经变更的文件。研究了一下午，终于搞定了。


## 问题
    打开vsc，更改文件代码时，发现变更的文件不会再源码管理器里出现。代码merge冲突的文件也不会显示。 出现这种问题，无非是两种情况导致的。
  1. 项目的文件夹下面没有.git文件（在文件夹设置里打开隐藏文件就可以看到，编辑器里面是看不到的） 
  2. vsc的git.path路径配置错误 

## 解决方式
 
  1. 如果是.git文件没有，如果你的项目是git上拉下来的，可以直接从新拉项目了；或者自己git init生成一个（提交后不是原仓库）
  2. 打开vsc的setting.json文件，找到git.path部分修改路径为你的git在本机的路径 "C:\\extension\\Git\\mingw64\bin\\git.exe"

  <font color=red>注：</font>：
  1. 必须是双斜杠，转义，或者"C:/extension/Git/mingw64\bin/git.exe"
  2. 使用cmd获取的路径和其他工具（git bash等）获取的路径可能不一样！！！可以多试几个
  3. 修改完之后需要重启编辑器