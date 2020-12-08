export enum HttpResponseStatus {
  UNKNOWN = -1,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  BAD_GATEWAY = 502,
  GATEWAY_TIMEOUT = 504,
  INTERNAL_SERVER_ERROR = 500,
}
export const OCC_ALREADY_EXISTS_ERROR = 'AlreadyExistsError';
export const OCC_CONSENT_WITHDRAWN_ERROR = 'ConsentWithdrawnError';
