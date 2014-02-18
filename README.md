# 支持七牛云存储的 Ghost

Ghost 目前仅支持将上传的文件（主要是图片）存储在 `content/images` 目录下面。此项目的目的是增加对七牛云存储的支持，也就是将上传到 Ghost 的图片存储到七牛云服务器上，本地服务器不保存。这样既能减轻自己服务器的压力，还能通过 CDN 加速图片载入。

## 增加的文件

主要是在 `core/server/storage` 目录增加 `qiniu.js` 文件（继承 `baseStore` 基类实现各个方法）。

## 修改的文件

- 修改了 `core/server/storage/index.js` 文件以支持加载 `qiniu.js` 存储类。
- 修改了 `package.json` 文件，增加了对 `qiniu` npm包的依赖


## 配置

案例如下：

```
qiniu: {
            bucketname: 'my-first-bucket', //空间名称
            ACCESS_KEY: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', //具体含义请参考七牛的文档
			SECRET_KEY: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            root: '/images/', //文件存储在哪个目录。可以设置为 `/` 表示存储在根目录
            prefix: 'http://cdn.my-domainname.com'  //上传的文件的 URL 前缀，可以是你自己绑定的二级域名或者七牛云默认分配的二级域名。文件最中的 URL 为：prefix + root + md5(file) + extension
            例如：http://cdn.my-domainname.com/images/a/ab/dqwerqwetetqwedfasdf.png
        }
```

## 上传文件在七牛云上的存储结构

首先计算上传文件的 md5 值，然后取 md5 值的第1位字符作为一级目录名称，取第2和3位作为二级目录名称，剩余的字符作为文件名。例如：

某上传文件的 md5 值为：6fb2a38dc107eacb41cf1656e899cf70；扩展名为 .jpg ；目录及文件组织结构为：6/fb/2a38dc107eacb41cf1656e899cf70.jpg

# [Ghost](https://github.com/TryGhost/Ghost) [![Build Status](https://travis-ci.org/TryGhost/Ghost.png?branch=master)](https://travis-ci.org/TryGhost/Ghost)

Ghost is a free, open, simple blogging platform that's available to anyone who wants to use it. Lovingly created and maintained by [John O'Nolan](http://twitter.com/JohnONolan) + [Hannah Wolfe](http://twitter.com/ErisDS) + an amazing group of [contributors](https://github.com/TryGhost/Ghost/contributors).

Visit the project's website at <http://ghost.org>!

Full documentation is available at <http://docs.ghost.org>.

## Getting Involved

Want to report a bug, request a feature, or help us build or translate Ghost? Check out our in depth guide to [Contributing to Ghost](https://github.com/TryGhost/Ghost/blob/master/CONTRIBUTING.md). We need all the help we can get! You can also join in with our [community](https://github.com/TryGhost/Ghost#community) to keep up-to-date and meet other Ghosters.



## Getting Started

There are **two** main ways to get started with Ghost, take care to use the method which best suits your needs.

**Please note** - the downloadable zip files we provide on [Ghost.org](http://ghost.org/download) are pre-built packages designed for getting started quickly. Cloning from the git repository requires you to install several dependencies and build the assets yourself. 

### Getting Started Guide for Bloggers

If you just want to get a Ghost blog running in the fastest time possible, this method is for you.

For detailed instructions for various platforms visit the [Ghost Installation Guide](http://docs.ghost.org/installation/). If you get stuck, help is available on [our forum](http://ghost.org/forum/).

1. Install [Node.js](http://nodejs.org) - Ghost requires **Node v0.10.***
1. Download the latest Ghost package from [Ghost.org](http://ghost.org/download). 
   **If you cloned the GitHub repository you should follow the instructions [for developers](https://github.com/TryGhost/Ghost#getting-started-guide-for-developers).**
1. Create a new directory where you would like to run the code, and unzip the package to that location.
1. Fire up a terminal (or node command prompt in Windows) and change directory to the root of the Ghost application (where config.example.js and index.js are)
1. run `npm install --production` to install the node dependencies. If you see `error Error: ENOENT` on this step, make sure you are in the project directory and try again.
1. To start ghost, run `npm start`
1. Visit `http://localhost:2368/` in your web browser or go to `http://localhost:2368/ghost` to log in

Check out the [Documentation](http://docs.ghost.org/) for more detailed instructions, or get in touch via the [forum](http://ghost.org/forum) if you get stuck.



### Getting Started Guide for Developers

If you're a theme, app or core developer, or someone comfortable getting up and running from a `git clone`, this method is for you.

If you clone the GitHub repository, you will need to build a number of assets, such as SASS and JavaScript templates. This requires you to have Ruby and a number of other pre-requisites.
Full instructions can be found in the [Contributing Guide](https://github.com/TryGhost/Ghost/blob/master/CONTRIBUTING.md) under the heading "[Working on Ghost Core](https://github.com/TryGhost/Ghost/blob/master/CONTRIBUTING.md#working-on-ghost-core)".

Check out the [Documentation](http://docs.ghost.org/) for more detailed instructions, or get in touch via the [forum](http://ghost.org/forum) if you get stuck.

### Updating with the latest changes

Documentation on updating can be found in the [Ghost Guide](http://docs.ghost.org/installation/upgrading/)

### Logging in For The First Time

Once you have the Ghost server up and running, you should be able to navigate to `http://localhost:2368/ghost/` from a web browser, where you will be prompted for a login.

1.  Click on the "register new user" link
2.  Enter your user details
3.  Return to the login screen and use those details to log in.

Note - this is still very alpha. Not everything works yet.


## Community

Keep track of Ghost development and Ghost community activity.

* Follow Ghost on [Twitter](http://twitter.com/TryGhost), [Facebook](http://facebook.com/tryghostapp) and [Google+](https://plus.google.com/114465948129362706086).
* Read and subscribe to the [The Official Ghost Blog](http://blog.ghost.org).
* Join in discussions on the [Ghost Forum](http://ghost.org/forum/)
* Chat with Ghost developers on IRC. We're on `irc.freenode.net`, in the `#Ghost` channel. We have a public meeting every Tuesday at 5:30pm London time.


## Versioning

For transparency and insight into our release cycle, and for striving to maintain backward compatibility, Ghost will be maintained according to the [Semantic Versioning](http://semver.org/) guidelines as much as possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>-<build>`

Constructed with the following guidelines:

* A new *major* release indicates a large change where backwards compatibility is broken.
* A new *minor* release indicates a normal change that maintains backwards compatibility.
* A new *patch* release indicates a bugfix or small change which does not affect compatibility.
* A new *build* release indicates this is a pre-release of the version.


## Copyright & License

Copyright (C) 2014 The Ghost Foundation - Released under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
