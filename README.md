## Teapack

Just always be fresh.

永远保持最新技术支持的 **0配置** 脚手架。

## Why is teapack

tea: 绿色、健康、休闲

面对webpack繁琐的配置，明明按照文档的配置，但是运行时控制台还是频频报错，是人性的扭曲，还是道德的沦丧。如果你也曾为此焦头烂额。可以试试`teapack`。

**希望它能把你省下更多的时间，泡一杯tea, 享受健康、休闲的生活。**

## Install

```
npm install teapack --save-dev

// or

yarn add teapack --dev
```

## Usage
在项目根目录下的`package.json`中添加：
```json
{
  "scripts": {
    "start": "teapack dev",
    "build": "teapack build",
  },
}
```
然后:

开发调试
```
yarn start
```

生产构建
```
yarn run build
```

### Demo

- [React Hooks Todo with Teapack](https://github.com/Andesome/react-hooks-todo)

### 必要的规范
1. 打包入口文件必须是项目根目录 下`src/index.js`文件。

2. 如果有模板文件，必须放在根目录下的`public/index.html`。

```
// 项目解构树形图

├── README.md
├── node_modules
├── public
│   ├── index.html				//模板文件*
├── src
│   ├── App.js
│   ├── index.js				//入口文件*
├── package.json
└── yarn.lock		   
```

> `*` 必须要遵循

### 适用场景
- React技术栈

### 命令行参数
- -d,--debug  开启调试模式

1. 启动失败，控制台输出详细日志
2. 打包失败，控制台输出详细日志

- `teapack dev` 开发调试

- `teapack build`  生产构建

## 适用场景
- React技术栈

## 可配置项
虽然默认项可以满足绝大部分业务场景，但针对特殊场景，用户可以自定义配置文件。
在项目根目录下新建`teapack.config.js`.
```js
   module.exports = {
     cssModules: true,            //  是否开启cssModules默认为true
     devtool: 'source-map'        //  webapack的devtool模式
  }
```
除`cssModules`配置项以外，其余皆和`webpack 4.x`官方配置一致。可以参考[官网配置](https://webpack.js.org/concepts).

## 待做事项
- [x] React技术栈支持

- [x] 支持代码切割（code split）

- [x] css3样式添加浏览器兼容(autoprefixer)

- [x] 开发支持热更新 

   ~~现在热更新是没有问题了，控制台可以看到每次修改文件，都自动构建了，但是浏览器没有自动刷新。目前正在查找原因，希望大佬支持。~~

   已解决。

   > When using Webpack Dev Server with the Node.js API, don't put the dev server options on the webpack config object. Instead, pass them as a second parameter upon creation.
   
   原因：使用热更新局部刷新时，在webpck.config.js不要在添加devServer选项了. [文档地址](https://webpack.js.org/guides/hot-module-replacement/#via-the-nodejs-api)

- [x] 打包进度人性化提示

- [x]  服务启动打开浏览器、 端口冲突自动切换 

- [x] 开放自定义配置

- [ ] Vue技术栈支持


## 底层

- babel 7.x
- webpack 4.x
- webpack loaders
- webpack-chain
- webpack-dev-serve



## 感谢



