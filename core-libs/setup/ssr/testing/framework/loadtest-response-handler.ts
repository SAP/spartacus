/**
 * Data related to the http response
 */
export interface LoadtestResponse {
  error: any;
  result: LoadtestSuccessResponse;
}

/**
 * Data related to the http success response.
 */
export interface LoadtestSuccessResponse {
  /**
   * Time in milliseconds it took to complete this individual request.
   */
  requestElapsed: number;

  /**
   * 0-based index of this particular request in the sequence of all requests to be made.
   */
  requestIndex: number;

  /**
   * The loadtest(...) instance index. This is useful if you call loadtest() more than once.
   */
  instanceIndex: number;

  /**
   * Path of the request
   */
  path: string;

  /** other keys */
  [key: string]: any;
}

/**
 * Handler of the http responses.
 */
export abstract class LoadtestResponseHandler {
  /**
   * Function used by 'loadtest' tool to handle responses.
   */
  abstract handleResponse(error: any, result: LoadtestSuccessResponse): void;
}
