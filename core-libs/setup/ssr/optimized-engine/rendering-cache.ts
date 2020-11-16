import { SsrOptimizationOptions } from './ssr-optimization-options';

export interface RenderingEntry {
  html?: any;
  err?: any;
  time?: number;
  rendering?: boolean;
}

export class RenderingCache {
  protected renderedUrls: {
    [filePath: string]: RenderingEntry;
  } = {};

  constructor(private options: SsrOptimizationOptions) {}

  setAsRendering(key: string) {
    this.renderedUrls[key] = { rendering: true };
  }

  isRendering(key: string): boolean {
    return this.renderedUrls[key]?.rendering;
  }

  store(key: string, err?: Error | null, html?: string) {
    this.renderedUrls[key] = { err, html };
    if (this.options.ttl) {
      this.renderedUrls[key].time = Date.now();
    }
  }

  get(key: string): RenderingEntry {
    return this.renderedUrls[key];
  }

  clear(key: string) {
    delete this.renderedUrls[key];
  }

  isReady(key: string): boolean {
    const isRenderPresent =
      this.renderedUrls[key]?.html || this.renderedUrls[key]?.err;
    return isRenderPresent && this.isFresh(key);
  }

  isFresh(key: string): boolean {
    if (!this.options.ttl) {
      return true;
    }

    return Date.now() - (this.renderedUrls[key]?.time ?? 0) < this.options.ttl;
  }
}
