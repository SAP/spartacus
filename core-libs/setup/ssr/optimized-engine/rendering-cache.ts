import { SsrOptimizationOptions } from './ssr-optimization-options';

export class RenderingCache {
  protected renderedUrls: {
    [filePath: string]: {
      html?: any;
      err?: any;
      time?: number;
      rendering?: boolean;
    };
  } = {};

  constructor(private options: SsrOptimizationOptions) {}

  setAsRendering(key) {
    this.renderedUrls[key] = { rendering: true };
  }

  isRendering(key): boolean {
    return this.renderedUrls[key]?.rendering;
  }

  store(key, err, html) {
    this.renderedUrls[key] = { err, html };
    if (this.options.ttl) {
      this.renderedUrls[key].time = Date.now();
    }
  }

  get(key) {
    return this.renderedUrls[key];
  }

  clear(key) {
    delete this.renderedUrls[key];
  }

  isReady(key) {
    const isRenderPresent =
      this.renderedUrls[key]?.html || this.renderedUrls[key]?.err;
    return isRenderPresent && this.isFresh(key);
  }

  isFresh(key) {
    if (!this.options.ttl) {
      return true;
    }

    return Date.now() - this.renderedUrls[key]?.time ?? 0 < this.options.ttl;
  }
}
