import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { SERVER_REQUEST_ORIGIN, SERVER_REQUEST_URL } from '../util/ssr.tokens';

@Injectable({
  providedIn: 'root',
})
export class WindowRef {
  readonly document: Document;

  constructor(
    // https://github.com/angular/angular/issues/20351
    @Inject(DOCUMENT) document: any,
    @Inject(PLATFORM_ID) protected platformId: Object,
    @Optional() @Inject(SERVER_REQUEST_URL) protected serverUrl?: string,
    @Optional() @Inject(SERVER_REQUEST_ORIGIN) protected serverOrigin?: string
  ) {
    this.document = document as Document;
  }

  /**
   * Returns true when invoked in browser context.
   * Use this method to check if you can access `window` and other browser globals.
   */
  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * Exposes global `window` object. In SSR when `window` is not available it returns `undefined`.
   * To detect if you can safely use `nativeWindow` use `isBrowser` to check execution platform.
   */
  get nativeWindow(): Window | undefined {
    // TODO(#11133): Consider throwing in SSR
    return this.isBrowser() ? window : undefined;
  }

  /**
   * Exposes global `sessionStorage` object. In SSR when `sessionStorage` is not available it returns `undefined`.
   * To detect if you can safely use `sessionStorage` use `isBrowser` to check execution platform.
   */
  get sessionStorage(): Storage | undefined {
    return this.nativeWindow ? this.nativeWindow.sessionStorage : undefined;
  }

  /**
   * Exposes global `localStorage` object. In SSR when `localStorage` is not available it returns `undefined`.
   * To detect if you can safely use `localStorage` use `isBrowser` to check execution platform.
   */
  get localStorage(): Storage | undefined {
    return this.nativeWindow ? this.nativeWindow.localStorage : undefined;
  }

  /**
   * Returns the window/document location, unless it's not available (i.e. SSR).
   *
   * When there's no access to the location object, we mimic the location partially, by resolving
   * the request url (`SERVER_REQUEST_URL`) and origin (`SERVER_REQUEST_ORIGIN`) from the injector.
   * These values are injected in the server implementation so that we can resolve some of the location
   * values when we do server side rendering.
   */
  get location(): Partial<Location> {
    if (this.isBrowser()) {
      return this.document.location;
    } else {
      if (!this.serverUrl) {
        throw new Error(
          'Cannot resolve the href as the SERVER_REQUEST_URL is undefined'
        );
      }
      if (!this.serverOrigin) {
        throw new Error(
          'Cannot resolve the origin as the SERVER_REQUEST_ORIGIN is undefined'
        );
      }
      return {
        href: this.serverUrl,
        origin: this.serverOrigin,
      };
    }
  }

  /**
   * Returns an observable for the window resize event and emits an event
   * every 300ms in case of resizing. An event is simulated initially.
   *
   * If there's no window object available (i.e. in SSR), a null value is emitted.
   */
  get resize$(): Observable<any> {
    if (!this.nativeWindow) {
      return of(null);
    } else {
      return fromEvent(this.nativeWindow, 'resize').pipe(
        debounceTime(300),
        startWith({ target: this.nativeWindow }),
        distinctUntilChanged()
      );
    }
  }
}
