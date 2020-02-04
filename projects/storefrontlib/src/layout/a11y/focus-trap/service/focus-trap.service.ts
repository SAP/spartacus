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

  add(target: HTMLElement): void {
    const root: Document = <Document>target.getRootNode();
    const focusableElements = Array.from(<NodeListOf<HTMLElement>>(
      target.querySelectorAll(this.focusableSelectors.join(','))
    )).filter(element => element.offsetParent !== null);

    const firstFocusableEl: HTMLElement = focusableElements[0];
    const lastFocusableEl: HTMLElement =
      focusableElements[focusableElements.length - 1];

    root.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Wrap first to last element on SHIFT+TAB keypress
          if (root.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            e.preventDefault();
          }
        } else {
          // Wrap last to first element on TAB keypress
          if (root.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  remove(target: HTMLElement): void {
    console.log('removed');
  }
}
