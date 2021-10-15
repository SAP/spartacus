import { LoadtestResponse } from './loadtest-response-handler';

/**
 * Metrics for the test result.
 */
export class LoadtestResult {
  constructor(protected responses: LoadtestResponse[]) {}

  /**
   * Returns the number of all responses.
   */
  get responsesCount(): number {
    return this.responses.length;
  }

  /**
   * Returns the number of error responses.
   */
  get errorResponsesCount(): number {
    return this.responses.filter(({ error }) => !!error).length;
  }

  /**
   * Returns all raw data about responses
   */
  get rawResponses(): LoadtestResponse[] {
    return [...this.responses];
  }

  /**
   * Returns the number of responses that had a header 'cache-control' set to 'no-store'.
   */
  get getCacheNoStoreCount() {
    return this.responses.filter(
      ({ result }) => result?.headers?.['cache-control'] === 'no-store'
    ).length;
  }

  /**
   * Returns the times of the responses
   */
  get responseTimes(): number[] {
    return this.responses.map(({ result }) => result?.requestElapsed);
  }

  /**
   * Returns the maximum response time
   */
  get maxResponseTime(): number {
    return Math.round(Math.max(...this.responseTimes));
  }

  /**
   * Returns the average response time
   */
  get avgResponseTime(): number {
    const responseTimes = this.responseTimes;
    return Math.round(
      responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
    );
  }

  /**
   * Returns the minimum response time
   */
  get minResponseTime(): number {
    return Math.round(Math.min(...this.responseTimes));
  }
}
