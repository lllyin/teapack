## Teapack

Just always be fresh.

永远保持最新技术支持的 **0配置** 脚手架。

## Why is teapack

tea: 绿色、休闲、健康

希望它能把你省下更多的时间，泡一杯tea, 享受休闲健康的生活。

## Install

```
npm install teapack --save-dev
```
or
```
yarn add teapack --dev
```

## Usage
在项目目录添加`package.json`添加：
```json
{
  "scripts": {
    "dev": "teapack dev",
    "build": "teapack build",
  },
}
```
然后:
```
// 开发调试
yarn run dev
```
```
// 构建发布
yarn run dev
```

## 命令行参数
- -d,--debug  开启调试模式

1. 启动失败，控制台输出详细日志
2. 打包失败，控制台输出详细日志

- `teapack dev` 开发调试

- `teapack build`  生产构建

## 适用场景
- React技术栈

## 底层

- webpack 4.x
- babel7
- webpack-chin
- webpack loaders
