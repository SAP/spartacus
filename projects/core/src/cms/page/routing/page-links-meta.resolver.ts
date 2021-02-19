import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {
  CanonicalUrlOptions,
  PageMetaConfig,
  WindowRef,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PageLinksMetaResolver {
  constructor(
    protected pageMetaConfig: PageMetaConfig,
    protected winRef: WindowRef,
    protected router: Router
  ) {}

  /**
   * Resolves the canonical for the page.
   *
   * The canonical url is created by the help of the default `CanonicalUrlOptions` from
   * the pageMeta options. The options can be further adjusted by the options argument.
   */
  resolveCanonicalUrl(
    url?: string,
    options?: CanonicalUrlOptions
  ): Observable<string> {
    return this.router.events.pipe(
      filter((ev) => ev instanceof NavigationStart),
      map(() =>
        this.buildCanonicalUrl(
          url ?? this.winRef.document.location.href,
          options
        )
      )
    );
  }

  protected buildCanonicalUrl(
    url: string,
    options?: CanonicalUrlOptions
  ): string {
    const config = {
      ...this.pageMetaConfig?.pageMeta?.options?.canonicalUrl,
      ...options,
    };

    // ensure that we always use https
    if (config.forceHttps && url.indexOf('http://') > -1) {
      url = url.replace('http://', 'https://');
    }
    // ensure that we always use www.
    if (config.forceWww && url.indexOf('www.') === -1) {
      url = url.replace('https://', 'https://www.');
    }
    if (config.removeQueryParams && url.indexOf('?') > -1) {
      const urlBeforeQueryParam = url.substr(0, url.indexOf('?'));
      const params = new URLSearchParams(url.substr(url.indexOf('?')));

      url = urlBeforeQueryParam;

      if (Array.isArray(config.removeQueryParams)) {
        config.removeQueryParams.forEach((param) => {
          params.delete(param);
        });
        if (params.toString().length > 0) {
          url = urlBeforeQueryParam + '?' + params.toString();
        }
      }
    }
    if (
      config.forceTrailingSlash &&
      !url.endsWith('/') &&
      url.indexOf('?') === -1
    ) {
      url = url + '/';
    }
    return url;
  }
}
