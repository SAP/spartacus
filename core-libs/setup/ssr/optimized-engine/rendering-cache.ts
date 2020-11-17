import { SsrOptimizationOptions } from './ssr-optimization-options';

export interface RenderingEntry {
  html?: any;
  err?: any;
  time?: number;
  rendering?: boolean;
}

export class RenderingCache {
  protected renders: {
    [requestKey: string]: RenderingEntry;
  } = {};

  constructor(private options?: SsrOptimizationOptions) {}

  setAsRendering(key: string) {
    this.renders[key] = { rendering: true };
  }

  isRendering(key: string): boolean {
    return !!this.renders[key]?.rendering;
  }

  store(key: string, err?: Error | null, html?: string) {
    this.renders[key] = { err, html };
    if (this.options?.ttl) {
      this.renders[key].time = Date.now();
    }
  }

  get(key: string): RenderingEntry {
    return this.renders[key];
  }

  clear(key: string) {
    delete this.renders[key];
  }

  isReady(key: string): boolean {
    const isRenderPresent = this.renders[key]?.html || this.renders[key]?.err;
    return isRenderPresent && this.isFresh(key);
  }

  isFresh(key: string): boolean {
    if (!this.options?.ttl) {
      return true;
    }

    return Date.now() - (this.renders[key]?.time ?? 0) < this.options?.ttl;
  }
}
