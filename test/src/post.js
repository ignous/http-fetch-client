var assert = require('assert');

var getFakeXhr = require('./fake-xhr-creator').getFakeXhr;

module.exports = function (FetchClient) {
  describe('post', () => {
    let fetch = new FetchClient();
    let data = {'test': 'abc'};
    it('method is POST', () => {
      fetch.post('http://fake.com');

      let { xhr } = getFakeXhr();
      assert.equal(xhr.method, 'POST')
      xhr.respond(200, { 'Content-Type': 'text/plain' }, '');
    });

    it('request form body', () => {
      fetch
        .post('http://fake.com', {
          body: data
        });

      let { xhr } = getFakeXhr();
      assert.equal(xhr.requestBody.replace(/[\n\r]/g, ''), 'test=abc')
      xhr.respond(200, { 'Content-Type': 'text/plain' }, '');
    })

    it('request json body', () => {
      fetch
        .post('http://fake.com', {
          body: data,
          headers: {
            'Content-Type': 'application/json'
          }
        });

      let { xhr } = getFakeXhr();
      assert.equal(xhr.requestBody, JSON.stringify(data));
      xhr.respond(200, { 'Content-Type': 'text/plain' }, '');
    })
  })
}