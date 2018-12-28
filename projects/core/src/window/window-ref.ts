import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WindowRef {
  readonly document: Document;

  constructor(@Inject(DOCUMENT) document) {
    // it's a workaround to have document property properly typed
    // see: https://github.com/angular/angular/issues/15640
    this.document = document;
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
}
