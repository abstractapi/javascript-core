"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildUrl = exports.makeApiCall = void 0;

var makeApiCall = function makeApiCall(service, apiKey, params, path) {
  var url = buildUrl(service, apiKey, params, path);
  var xmlHttp = new XMLHttpRequest();
  return new Promise(function (resolve, reject) {
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState !== 4) {
        return;
      }

      if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
        resolve(JSON.parse(xmlHttp.responseText));
      } else {
        reject(xmlHttp);
      }
    };

    xmlHttp.open('GET', url, true);
    xmlHttp.send();
  });
};

exports.makeApiCall = makeApiCall;

var buildUrl = function buildUrl(service, apiKey, params, path) {
  if (!apiKey) {
    throw new Error('No api key is set.');
  }

  var paramString = '';

  if (typeof params === 'string') {
    paramString = "&".concat(params);
  } else if (Array.isArray(params)) {
    params.forEach(function (param) {
      paramString += "&".concat(param);
    });
  }

  var pathString = '';

  if (typeof path === 'string') {
    pathString = "/".concat(path);
  }

  return "https://".concat(service, ".abstractapi.com/v1").concat(pathString, "?api_key=").concat(apiKey).concat(paramString, "&lang=js");
};

exports.buildUrl = buildUrl;