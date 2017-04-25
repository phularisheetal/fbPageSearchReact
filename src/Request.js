export  function request(obj) { // request function returns a promise
  return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', obj.url);
      if (obj.headers) {
          Object.keys(obj.headers).forEach(function (key) {
              xhr.setRequestHeader(key, obj.headers[key]);
          });
      }
      xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.response));
          } else {
              reject(xhr.statusText);
          }
      };
      xhr.onerror = function () {
          return reject(xhr.statusText);
      };
      xhr.send(obj.body);
  });
};
