import * as config from '../../config';


export function buildUrl(service, value, queryParams = false) {
  let resultUrl = config.server.url  + service + value;

  if (queryParams) {
    let params = [];
    Object.keys(queryParams).forEach(function(key) {
      if (typeof queryParams[key] === 'object') {
        params.push(key + "=" + encodeQuery(queryParams[key]))
      } else {
        params.push(key + '=' + queryParams[key]);
      }
    });

    resultUrl += '?' + params.join('&');
  }

  return resultUrl;
}

export function encodeQuery(data) {
  return encodeURI(JSON.stringify(data));
}

export function getConfig(auth) {
  return {
    headers: { Authorization: 'Bearer ' + auth.me.token }
  }
}
