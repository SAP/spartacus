import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class WindowRef {
  readonly document: Document;

  constructor(@Inject(DOCUMENT) document) {
    this.document = document;
  }

  get nativeWindow(): Window {
    return this.document.defaultView;
  }
}
