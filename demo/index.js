import request from '../src/request.js'
var btnDom = document.getElementById('j_btn');

btnDom.addEventListener('click', function () {
  // 默认的全局请求配置
  Object.assign(request.defaults, {
    headers: {
      'X-Device': '123123123'
    }
  });
  // config 配置信息
  request.before = config => {
    console.log('before拦截，发送请求前执行：', config);
  };
  // res 请求返回的数据
  request.after = res => {
    console.log('after拦截，数据返回前执行：', res);
  };
  request({
    url: '../data.json'
  }).then(res => {
    console.log('请求成功')
    console.log(res)
  }, err => {
    console.log('请求失败, 详细信息', err)
  })
})