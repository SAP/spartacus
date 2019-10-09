import { ElementRef } from '@angular/core';

export function forceFocusElement(el: ElementRef, timeout: number = 0): void {
  setTimeout(() => {
    el.nativeElement.focus();
  }, timeout);
}
