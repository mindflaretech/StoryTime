import { create } from 'apisauce';

import {
  API_LOG,
  BASE_URL,
  API_TIMEOUT,
  REQUEST_TYPE,
} from '../config/WebService';

import { Util, DataHandler } from '../utils';

const api = create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
});

async function callRequest(url, payload, headers = {}, parameter = '') {
  // get attributes from url

  // console.log('========== URL ========');
  // console.log(url);

  // console.log('========== Payload ========');
  // console.log(payload);

  // console.log('========== Headers ========');
  // console.log(headers);

  const { type, access_token_required } = url;
  // set X-API-TOKEN
  if (access_token_required) {
    //headers[X_API_TOKEN] = 'def36000-f034-48f5-bf38-cd3d7cef2a5e';
    /*  const storeRef = DataHandler.getStore().getState();
    headers[X_API_TOKEN] = token; */
  }

  const route =
    parameter && parameter !== '' ? url.route + '/' + parameter : url.route;

  headers['Content-Type'] = 'application/json';

  // init header object
  const headerObject = { headers };

  // init responseoc
  let response;

  // on type send request
  switch (type) {
    case REQUEST_TYPE.GET:
      response = await api.get(route, payload, headerObject);
      break;
    case REQUEST_TYPE.POST:
      response = await api.post(route, payload, headerObject);
      break;
    case REQUEST_TYPE.DELETE:
      response = await api.delete(
        route,
        {},
        { data: payload, ...headerObject },
      );
      //response = await api.delete(route, payload, headerObject);
      break;
    case REQUEST_TYPE.PUT:
      response = await api.put(route, payload, headerObject);
      break;
    case REQUEST_TYPE.PATCH:
      response = await api.patch(route, payload, headerObject);
      break;
    default:
      response = await api.get(route, payload, headerObject);
  }

  // log web service response
  if (__DEV__ && API_LOG) {
    // console.log('url', url);
    // console.log('response', response);
    // console.log('payload', payload);
    // console.log('headers', headers);
    // console.log('route', route);
  }

  return handleResponse(response, headers);
}

function handleResponse(response, headers) {
  return new Promise((resolve, reject) => {
    // console.log('====== response.status ======');
    // console.log(response.status);
    // network error  internet not working
    const isNetWorkError = response.problem === 'NETWORK_ERROR';
    // network error  internet not working
    const isClientError = response.problem === 'CLIENT_ERROR';
    // kick user from server
    const status = response?.status ?? 500;
    const isKickUser = status === 404;
    // if response is valid
    const isResponseValid =
      response.ok && Util.isNotEmpty(response.data) ? true : false;

    if (isResponseValid) {
      resolve(response.data);
    } else if (isNetWorkError) {
      if (DataHandler.getIsInternetConnected()) {
        reject({
          message:
            'We are unable to connect to our server, please try again later.',
          statusCode: status,
        });
      } else {
        reject({
          message:
            'No internet connection. Make sure Wi-Fi or cellular data is turned on, then try again.',
          statusCode: status,
        });
      }
    } else if (isKickUser) {
      Util.showMessage(
        'Your session has been expired! You are now a guest',
        'error',
        10000,
      );
      //NavigationService.reset('Main');
    } else if (isClientError) {
      reject({
        message:
          response.data &&
          response.data.msg &&
          typeof response.data.msg === 'string'
            ? response.data.msg
            : 'We are unable to connect to our server, please try again later.',
        statusCode: status,
      });
    } else {
      reject({
        message:
          'We are unable to connect to our server, please try again later.',
        statusCode: status,
      });
    }
  });
}

export { callRequest };
