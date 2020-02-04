import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FocusTrapService {
  focusableSelectors = [
    `a[href]:not([tabindex='-1'])`,
    `area[href]:not([tabindex='-1'])`,
    `input:not([disabled]):not([tabindex='-1'])`,
    `select:not([disabled]):not([tabindex='-1'])`,
    `textarea:not([disabled]):not([tabindex='-1'])`,
    `button:not([disabled]):not([tabindex='-1'])`,
    `iframe:not([tabindex='-1'])`,
    `[tabindex]:not([tabindex='-1'])`,
    `[contentEditable=true]:not([tabindex='-1'])`,
  ];

  constructor() {}

  getTrapHandler(target: HTMLElement) {
    const root: Document = <Document>target.getRootNode();
    const focusableElements: HTMLElement[] = Array.from(<
      NodeListOf<HTMLElement>
    >target.querySelectorAll(this.focusableSelectors.join(','))).filter(
      element => element.offsetParent !== null
    );

    const first: HTMLElement = focusableElements[0];
    const last: HTMLElement = focusableElements[focusableElements.length - 1];

    const trapHandler = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Wrap first to last element on SHIFT+TAB keypress
          if (root.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          // Wrap last to first element on TAB keypress
          if (root.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };
    return trapHandler;
  }
}
