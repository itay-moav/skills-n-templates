import axios from 'axios';
import log from './log';

/**
 * Global error response handler registry.
 * Maps HTTP status codes to handler functions for centralized error handling.
 */
export const errorResponseHandler = {};

/**
 * Registers an error handler for a specific HTTP status code.
 * @param {number} httpCode - HTTP status code (e.g., 401, 403, 500)
 * @param {Function} handler - Handler function to call for this status code
 */
export const setErrorHandler = (httpCode, handler) =>
  (errorResponseHandler[httpCode] = handler);

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response.status <= 500;

  if (!expectedError) {
    if (error.code === 'ERR_NETWORK') {
      log.fatal('Network connection error - please check your internet connection');
      throw new Error('ERR_NETWORK');
    } else {
      log.error('Axios response error', error);
      throw new Error(error);
    }
  }

  if (error && error.response && error.response.status) {
    console.error('HTTP module error:', error.response);
    const errorResponseStatus = error.response.status;
    if (errorResponseHandler[errorResponseStatus]) {
      errorResponseHandler[errorResponseStatus]();
    }
  }
  return Promise.reject(error);
});

/**
 * Sets an authentication header for all future HTTP requests.
 * @param {string} headerName - Header name (e.g., 'Authorization', 'x-auth-token')
 * @param {string} value - Header value (e.g., 'Bearer <token>')
 */
function setAuthHeader(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
}

/**
 * Sets the base URL for all API requests.
 * @param {string} appUrl - The backend API root URL
 */
export function setAppApiRootUrl(appUrl) {
  axios.defaults.baseURL = appUrl;
  log.debug('APP api root url: ', axios.defaults.baseURL);
}

/**
 * Returns the currently configured API root URL.
 */
export function getApiRootUrl() {
  return axios.defaults.baseURL;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setAuthHeader,
};

export default http;

/**
 * Validates API response status and passes to callback on success.
 */
export function fastApiWrapper(response, callback) {
  log.debug('Response:', response);

  if (!response.status || response.status > 299 || response.status < 200) {
    console.error('fastApiWrapper error', response);
    throw new Error(response);
  }

  return callback(response);
}

/**
 * Wraps API promises with error handling and response validation.
 */
export function responsePromiseChainHandler(
  myPromise,
  successCallback,
  errorCallback,
  finallyCallback = null,
) {
  if (finallyCallback) {
    myPromise
      .then((response) => fastApiWrapper(response, successCallback))
      .catch(errorCallback)
      .finally(finallyCallback);
  } else {
    myPromise.then((response) => fastApiWrapper(response, successCallback)).catch(errorCallback);
  }
}
