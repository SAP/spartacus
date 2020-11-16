import { SsrOptimizationOptions } from './ssr-optimization-options';

export interface RenderingEntry {
  html?: any;
  err?: any;
  time?: number;
  rendering?: boolean;
}

export class RenderingCache {
  protected renderings: {
    [requestKey: string]: RenderingEntry;
  } = {};

  constructor(private options?: SsrOptimizationOptions) {}

  setAsRendering(key: string) {
    this.renderings[key] = { rendering: true };
  }

  isRendering(key: string): boolean {
    return !!this.renderings[key]?.rendering;
  }

  store(key: string, err?: Error | null, html?: string) {
    this.renderings[key] = { err, html };
    if (this.options?.ttl) {
      this.renderings[key].time = Date.now();
    }
  }

  get(key: string): RenderingEntry {
    return this.renderings[key];
  }

  clear(key: string) {
    delete this.renderings[key];
  }

  isReady(key: string): boolean {
    const isRenderPresent =
      this.renderings[key]?.html || this.renderings[key]?.err;
    return isRenderPresent && this.isFresh(key);
  }

  isFresh(key: string): boolean {
    if (!this.options?.ttl) {
      return true;
    }

    return Date.now() - (this.renderings[key]?.time ?? 0) < this.options?.ttl;
  }
}
