import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { SERVER_REQUEST_ORIGIN, SERVER_REQUEST_URL } from '../util/ssr.tokens';
/**
 * Provides access to the window and document in a save way for both SSR and CRS.
 *
 * The document that is resolved during SSR will also be
 */
@Injectable({
  providedIn: 'root',
})
export class WindowRef {
  readonly document: Document;

  // TODO(#10467): make optional arguments mandatory with next major release
  constructor(
    @Inject(DOCUMENT) document,
    @Inject(SERVER_REQUEST_URL) protected serverRequestUrl?: string,
    @Inject(SERVER_REQUEST_ORIGIN) protected serverRequestOrigin?: string
  ) {
    // it's a workaround to have document property properly typed
    // see: https://github.com/angular/angular/issues/15640
    this.document = this.resolveDocument(document);
  }

  /**
   * Resolves the document and provides the href and origin in case they're undefined.
   * This is useful in SSR, where those values are lacking.
   */
  protected resolveDocument(document: Document): Document {
    if (!document.location) {
      document.location = {
        href: this.serverRequestUrl,
        origin: this.serverRequestOrigin,
      } as any;
    }
    return document;
  }

  get nativeWindow(): Window {
    return typeof window !== 'undefined' ? window : undefined;
  }

  get sessionStorage(): Storage {
    return this.nativeWindow ? this.nativeWindow.sessionStorage : undefined;
  }

  get localStorage(): Storage {
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
