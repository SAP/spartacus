import {
  LoadtestResponse,
  LoadtestResponseHandler,
  LoadtestSuccessResponse,
} from './loadtest-response-handler';

/**
 * Handler of the http responses used for logging.
 */
export class DefaultResponseHandler extends LoadtestResponseHandler {
  protected responsesCount = 0;

  /**
   * Function used by 'loadtest' tool to handle responses.
   */
  handleResponse(error: any, result: LoadtestSuccessResponse) {
    this.logResponse({ error, result });
  }

  protected logResponse({ error, result }: LoadtestResponse) {
    this.responsesCount++;
    if (error) {
      console.warn(this.responsesCount, result?.path);
      console.warn('ERROR:', error);
    } else {
      console.log(this.responsesCount, result?.path);
    }
  }
}
