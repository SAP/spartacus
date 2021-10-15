import { LoadtestRequestGenerator } from './loadtest-request-generator';

/**
 * Generates requests by iterating (in a loop) over the given array of URLs.
 */
export class DefaultRequestGenerator extends LoadtestRequestGenerator {
  protected currentId = 0;
  protected readonly maxId;

  constructor(protected urls: string[]) {
    super();
    this.maxId = urls.length - 1;
  }

  protected generateUrl(): string {
    const result = this.urls[this.currentId];
    this.incrementCurrentId();
    return result;
  }

  protected incrementCurrentId(): void {
    this.currentId = (this.currentId + 1) % this.maxId;
  }
}
