---
title: 配置git sshkey
cover: /img/post-ssh.jpg
categories:
  - git配置
---

使用sshkey拉取项目时需要配置sshKey，所以今天来记录下sshkey配置过程

## 检查有没有已有的sshkey
  - 如果有可以直接使用，如果没有则继续往下看
```shell
  ls -al ~/.ssh 
```

## 生成sshkey

- 执行命令配置name和email
```shell
  git config –global user.name "你的name"
```
```shell
  git config –global user.email "你的邮箱"
```

- 生成密钥
- 以下使用的邮箱同上配置的一样
```shell
  ssh-keygen -t rsa -C "你的邮箱"
```

<font color=#00FFFF>代码参数含义：</font>
  -t 指定密钥类型，默认是 rsa ，可以省略。
  -C 设置注释文字，比如邮箱。
  -f 指定密钥文件存储文件名。

指令走完后
```shell
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/ASUS/.ssh/id_rsa):   <===  输入回车
/c/Users/ASUS/.ssh/id_rsa already exists.
Overwrite (y/n)? y  <===  输入y（有的也是回车）
Enter passphrase (empty for no passphrase):  <===  继续输入回车
Enter same passphrase again:    <===  继续输入回车
Your identification has been saved in /c/Users/ASUS/.ssh/id_rsa
Your public key has been saved in /c/Users/ASUS/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:Y9HCO1xmOK+3HG8iR8ZPZM1skZ8/T3VHnMD2IkwIvyE youremail@.com
The key's randomart image is:
+---[RSA 3072]----+
|       .. . ...o.|
|       ..+ . oo.o|
|       E*oB .+.+.|
|       ..Xooo.=o=|
|        So.o... =|
|       . ++ .  .o|
|        .ooo   .o|
|        .oo+o   .|
|         ooo.    |
+----[SHA256]-----+
```
指令执行完之后可以进入c盘的.ssh文件夹下找到id_rsa.pub文件就是sshkey(ctrl + a 复制内容)

## sshkey添加至远端

1. 登录 github 点击头像找到settings 选项
2. 进入该页面后在左侧找到 SSH and GPG keys 选项
3. 点击 New SSh key 按钮
4. 在Title输入名称， 将 id_rsa.pub 的内容粘贴到key里面
5. 点击 Add SSh key 完成