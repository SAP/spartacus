import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WindowRef {
  readonly document: Document;

  constructor(@Inject(DOCUMENT) document) {
    // it's a workaround to have document property properly typed
    // see: https://github.com/angular/angular/issues/15640
    this.document = document;
  }

  /**
   * Exposes global `window` object. In SSR when `window` is not available it returns `undefined`.
   * To detect platform where the code is executed use `isPlatformBrowser` and `isPlatformServer` from `@angular/common`.
   */
  get nativeWindow(): Window | undefined {
    return typeof window !== 'undefined' ? window : undefined;
  }

  get sessionStorage(): Storage | undefined {
    return this.nativeWindow ? this.nativeWindow.sessionStorage : undefined;
  }

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
