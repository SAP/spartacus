/**
 * Generates requests for the `loadtest` tool.
 */
export abstract class LoadtestRequestGenerator {
  protected readonly baseSite: string;

  /**
   * Template method to be implemented by child class to generate specific URL.
   */
  protected abstract generateUrl(): string;

  /**
   * Function used by `loadtest` tool to generate a request.
   */
  generateRequest(_params: any, options: any, client: any, callback: any) {
    const path = this.generateUrl();

    options.path = path;
    options.pathname = path;

    const request = client(options, callback);
    return request;
  }
}
