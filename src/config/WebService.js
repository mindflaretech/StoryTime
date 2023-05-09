// BASE URL
export const BASE_URL = 'https://api.github.com';
export const X_API_TOKEN = 'X-Access-Token';

// REQUEST TYPES
export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
  PATCH: 'patch',
};

// CONSTANTS
export const LIMIT = 20;
export const API_TIMEOUT = 30000;
export const API = '/search/';
export const API_LOG = true;

// API'S
export const API_TEST_LISTING = {
  route: `${API}users`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const API_UPLOAD_FILE = {
  route: `${API}upload-file`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
