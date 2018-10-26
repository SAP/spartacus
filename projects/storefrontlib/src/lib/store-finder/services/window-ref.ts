import { Injectable } from '@angular/core';

@Injectable()
export class WindowRef {
  get nativeWindow(): any {
    return window;
  }
}
