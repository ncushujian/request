/**
 * http请求
 * before 拦截，只能全局配置一个拦截
 * after 拦截，只能全局配置一个拦截
 * error 拦截，只能全局配置一个拦截
 * @param url {String} url
 * @param type {String} GET | POST 等XMLHttpRequest的type类型
 * @param data {Object} 传输的数据
 * @param headers {Object} 设置headers
 * @param withCredentials {Boolean} 跨域参数
 * @param timeout {Number} ms 默认15秒
 *
 * @return {Prommise}
 */

var serializeParam = function serializeParam(param) {
  if (!param) return '';
  var s = [];
  for (var key in param) {
    s.push(encodeURIComponent(key) + '=' + encodeURIComponent(param[key]));
  }
  return s.join('&');
};
function merge(obj1, obj2) {
  var newObj = JSON.parse(JSON.stringify(obj1));
  for(var i in obj2) {
    if(typeof obj2[i] === 'object' && newObj[i]) {
      newObj[i] = merge(newObj[i], obj2[i]);
    } else {
      newObj[i] = obj2[i];
    }
  }
  return newObj;
}

var request = function request(opt) {
  return new Promise((resolve, reject) => {
    var option = merge(request.defaults, opt);
    request.before && request.before(option);
    var type = option.type ? option.type.toLocaleUpperCase() : 'GET';
    var isPost = 'POST' === type;
    var isComplete = false;
    var timeout = option.timeout || 15000;
    var xhr = new XMLHttpRequest();
    var qstr = serializeParam(option.data);
    var url = option.url;
    !isPost && (url += (url.indexOf('?') > -1 ? '&' : '?') + qstr);

    xhr.open(type, url, true);
    var headers = option.headers;
    var isJson = false;
    if (headers) {
      isJson = headers['Content-Type'] && headers['Content-Type'].indexOf('application/json') !== -1;
      for (var key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
    isPost && !isJson && xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (option.withCredentials) xhr.withCredentials = true;
    var timer = 0;

    xhr.onreadystatechange = function () {
      if (4 == xhr.readyState) {
        var status = xhr.status;
        if (status >= 200 && status < 300 || status == 304) {
          var response = xhr.responseText;
          var json = JSON.parse(response);
          try {
            request.after && request.after(json);
          } catch (e) {
            reject(e);
          }
          resolve(json);
        } else {
          reject(new Error('request error:' + status + ' ' + xhr.statusText));
        }
        isComplete = true;
        if (timer) {
          clearTimeout(timer);
        }
      }
    };
    xhr.send(isPost ? ( isJson ? JSON.stringify(option.data) : qstr) : null);
    if (timeout) {
      timer = setTimeout(function () {
        if (!isComplete) {
          xhr.onreadystatechange = function () {};
          xhr.abort();
          reject(new Error('request timeout'));
        }
      }, timeout);
    }
  }).catch(e => {
    request.error && request.error(e);
    throw e;
  });
};
request.defaults = {}

export default request;