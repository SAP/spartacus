import { Injectable } from '@angular/core';
import { WindowRef } from '../../../window/window-ref';
import {
  CanonicalUrlOptions,
  PageMetaConfig,
} from '../config/page-meta.config';

@Injectable({ providedIn: 'root' })
export class PageLinkFactory {
  constructor(
    protected pageMetaConfig: PageMetaConfig,
    protected winRef: WindowRef
  ) {}

  /**
   * Resolves the canonical for the page.
   *
   * The canonical url is created by the help of the default `CanonicalUrlOptions` from
   * the pageMeta options. The options can be further adjusted by the options argument.
   */
  resolveCanonicalUrl(options?: CanonicalUrlOptions, url?: string): string {
    const config: CanonicalUrlOptions = {
      ...this.pageMetaConfig?.pageMeta?.canonicalUrl,
      ...options,
    };
    return this.buildCanonicalUrl(
      url ?? this.winRef.location.href ?? '',
      config
    );
  }

  protected buildCanonicalUrl(
    url: string,
    config: CanonicalUrlOptions
  ): string {
    if (config.forceHttps) {
      url = url.replace(/^http(?!s):/i, 'https:');
    }

    if (config.forceWww) {
      // TODO: can we avoid subdomains to avoid www.subdomain.shop.com ?
      url = url.replace(/^(https?:\/\/)(?!www\.)(.*)/i, '$1www.$2');
    }

    if (config.removeQueryParams) {
      url = this.removeQueryParams(url, config);
    }

    if (config.forceTrailingSlash) {
      url = url.replace(/^([^\?]+[^\/\?]$)$/i, '$1/');
    }

    return url;
  }

  protected removeQueryParams(
    url: string,
    config: CanonicalUrlOptions
  ): string {
    const queryPos = url.indexOf('?');
    if (queryPos > -1) {
      const urlBeforeQueryParam = url.substr(0, queryPos);
      const params = new URLSearchParams(url.substr(queryPos));

      url = urlBeforeQueryParam;

      if (Array.isArray(config.removeQueryParams)) {
        config.removeQueryParams.forEach((param) => {
          params.delete(param);
        });
        if (params.toString().length > 0) {
          url = `${urlBeforeQueryParam}?${params.toString()}`;
        }
      }
    }
    return url;
  }
}
