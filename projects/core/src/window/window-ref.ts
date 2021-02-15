import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WindowRef {
  readonly document: Document;

  // TODO(#11133): Make platformId required in 4.0
  /**
   * @deprecated since 3.2. Provide PLATFORM_ID as a second constructor parameter
   */
  constructor(
    @Inject(DOCUMENT) document,
    @Inject(PLATFORM_ID) protected platformId?: Object
  ) {
    // it's a workaround to have document property properly typed
    // see: https://github.com/angular/angular/issues/15640
    this.document = document;
  }

  /**
   * Returns true when invoked in browser context.
   * Use this method to check if you can access `window` and other browser globals.
   */
  isBrowser(): boolean {
    // TODO(#11133): Remove condition when platformId will be always provided
    return this.platformId
      ? isPlatformBrowser(this.platformId)
      : typeof window !== 'undefined';
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
