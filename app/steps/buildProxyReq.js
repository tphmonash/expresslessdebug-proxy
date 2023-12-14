'use strict';

var requestOptions = require('../../lib/requestOptions');

function buildProxyReq(Container) {
  var req = Container.user.req;
  var res = Container.user.res;
  var options = Container.options;
  var host = Container.proxy.host;

  var parseBody = (!options.parseReqBody) ? Promise.resolve(null) : requestOptions.bodyContent(req, res, options);

  var createReqOptions = requestOptions.create(req, res, options, host);

  return Promise
    .all([parseBody, createReqOptions])
    .then(function (responseArray) {
      req.body = responseArray[0];
      Container.proxy.bodyContent = responseArray[0];
      Container.proxy.reqBuilder = responseArray[1];
      return Container;
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

module.exports = buildProxyReq;
