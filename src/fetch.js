import adapter from './adapters';

export default function fetch (request) {
  var _resolve, _reject;
  var p = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });

  adapter(request, {
    onsuccess: function (response) {
      return _resolve(response);
    },

    onerror: function (response) {
      var { status } = response;
      if (status > 0) {
        return _resolve(response);
      } else {
        return _reject(response);
      }
    }
  })

  return p;
}
