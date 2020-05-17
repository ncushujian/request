---
title: Request
---
# Request
基于XMLHttpRequest实现get和post请求，支持了promise返回;
默认导出es6版本，需要iife格式版本直接引用dist/request.min.js

## 安装
```javascript
npm install qt-request
```
## 基本用法
```javascript
import request from 'qt-request';
Object.assign(request.defaults, {
  headers: {
    'X-Device': '123123123'
  }
});
// config 配置信息
request.before = config => {
  // 在发送请求之前做些什么
  console.log('before拦截，发送请求前执行：', config);
};
// res 请求返回的数据
request.after = res => {
  // 对响应数据做点什么
  console.log('after拦截，数据返回前执行：', res);
};
// 请求错误拦截，只能全局配置一个拦截
request.error = res => {
  // 对响应数据做点什么
  console.log('拦截，只能全局配置一个拦截，数据抛出异常前执行：', res);
};
request({
  url: '../data.json'
}).then(res => {
  console.log(res)
}, err => {
  console.log('请求失败', err)
})
```
## 配置

| 配置项 | 类型 |默认值 | 是否必填 | 说明 |
| :---: | :---: |:---: | :---: | :---: |
| url | String | 无 | 是 | 请求地址 |
| type | String | 'GET' | 否 | 请求方法`GET`或者`POST` 等XMLHttpRequest的type类型 |
| data | Object | 无 | 否 | 传输的数据 |
| withCredentials | Boolean | false | 否 | 跨域需携带cookie可设置为true |
| timeout | number | 15000毫秒 | 否 | 超时时间 |
| headers | headers | 无 | 否 | 设置headers |

## 全局默认配置

`request.defaults ` 建议通过Object.assign配置

## 拦截方法

### before

添加请求拦截器，使用请看示例

### after

添加响应拦截器，使用请看示例

### error

请求错误拦截，只能全局配置一个拦截，数据抛出异常前执行

## [查看demo](https://ncushujian.github.io/request/demo/dist/test.html)

