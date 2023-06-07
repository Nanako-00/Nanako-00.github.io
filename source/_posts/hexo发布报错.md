---
title: hexo 发布报错-spawn failed
cover: /img/hexo.jpg
categories:
  - 博客搭建
---

由于本人在搭建博客发布时经常遇到问题，所以就记录了下来，希望对你们有所帮助

- hexo d 发布时有时候会报错 spawn failed
- 之前经常碰到这个问题是在魔改样式时碰到的，所以大家在魔改之间可以提前备份一份 _config.butterfly.yml 文件，如果遇到问题，也可以快速回退。

如果是刚搭建博客时，发布就遇到这样的问题，可以尝试以下两种方式

## 解决方案01
  - 打开配置文件 ——config.yml
  - 修改其中的配置
  ``` javascript
    deploy:
    type: git
    // repo:	https://github.com/yourName/yourName.github.io.git(不要使用这个)
    repo: git@github.com:yourName/yourName.github.io.git
    branch:
      master
  ```
  - 可以将其中的博客地址替换为ssh的形式在尝试发布一次

## 解决方案02
  - 如果上述的方法不成功，可以尝试下这个方法
  - 将下面三个指令走一遍
  ```shell
    // 删除这个文件
    rm -rf .depoly_git

    // 将git加入系统环境变量
    git config --global core.autocrlf false

    // 重新执行一键三连
    hexo clean&&hexo g&&hexo d
  ```

## 解决方案03
  - 如果之前发布的很正常，突然发布不成功，可以尝试以下方案
  - 如果突然的切换 sshkey 则也有可能导致 hexo d 失败（别问我怎么知道的 emmm...）
  - 建议重新生成一个 sshkey 去git上替换掉原先的 sshkey
  [如何生成并替换 sshkey](https://nanako-00.github.io/2023/06/05/%E7%94%9F%E6%88%90sshkey/)