function request(url, data, callback, options){
  wx.request({
    url: url,
    data,
    success: (res) => {
      if(res.statusCode - 400 >= 0){
        wx.showToast({
          title: res.data.detail,
          icon: 'none',
          duration: 2000
        })
        return;
      }
      callback(res);
    },
    ...options
  })
}

function get(url, param, callback, options){
  return request(url, param, callback, {
    method: 'GET',
    ...options,
  })
}

function post(url, body, callback, options) {
  return request(url, body, callback, {
    method: 'POST',
    ...options,
  })
}


module.exports = {
  request,
  get,
  post,
}