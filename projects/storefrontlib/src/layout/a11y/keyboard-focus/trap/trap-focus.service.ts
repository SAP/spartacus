import { Injectable } from '@angular/core';
import { MOVE_FOCUS } from '../keyboard-focus.model';
import { TabFocusService } from '../tab/tab-focus.service';

@Injectable({
  providedIn: 'root',
})
export class TrapFocusService extends TabFocusService {
  /**
   * Indiccates whether any of the child elements of the host are focusable.
   *
   * @param host `HTMLElement` that is used to query the focusable elements.
   */
  isFocussed(host: HTMLElement): boolean {
    return this.findFocusable(host).length > 0;
  }

  /**
   * Focus the next or previous element of all available focussable elments.
   * The focus is _trapped_ in case there's no next or previous available element.
   * The focus will automatically move the start or end of the list.
   *
   * @param host the `HTMLElement` that is used to get all focusable elements for
   * @param target the current `HTMLElement` that indicates the index
   * @param increment a number, expects either 1 (down) or -1 (up)
   */
  moveFocus(
    host: HTMLElement,
    target: HTMLElement,
    increment: MOVE_FOCUS
  ): void {
    const focusable: HTMLElement[] = this.findFocusable(host);

    let index = focusable.findIndex(v => v === target) + increment;

    if (index >= focusable.length) {
      index = 0;
    }
    if (index < 0) {
      index = focusable.length - 1;
    }

    const el = focusable[index];
    if (el.getAttribute('tabindex') !== '-1') {
      el.focus();
    }
  }
}
