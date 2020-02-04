import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FocusTrapService {
  observers = [];

  constructor() {}

  add(target: HTMLElement): void {
    // const observer = new MutationObserver(mutations => {
    //   console.log(mutations);
    // });
    // observer.observe(target);
    // this.observers.push({ target: target, observer: observer });
    // const root = target.getRootNode();
    // const focusableEls: NodeListOf<HTMLElement> = root.querySelectorAll(
    //   'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    // );
    // focusableEls.forEach(el => el.setAttribute('tabindex', '-1'));
    console.log('added');

    const focusableEls = target.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    const KEYCODE_TAB = 9;

    target.addEventListener('keydown', function(e) {
      const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        /* shift + tab */ if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } /* tab */ else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    });
  }

  remove(target: HTMLElement): void {
    // const root = target.getRootNode();
    // const focusableEls: NodeListOf<HTMLElement> = root.querySelectorAll(
    //   'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    // );
    // focusableEls.forEach(el => el.removeAttribute('tabindex'));
    this.observers = this.observers.filter(
      observer => observer.target === target
    );
    console.log('removed');
  }
}
