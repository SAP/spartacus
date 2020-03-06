import { Injectable } from '@angular/core';
import { MOVE_FOCUS, TrapFocusConfig } from '../keyboard-focus.model';
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
   */
  moveFocus(
    host: HTMLElement,
    event: UIEvent,
    increment: MOVE_FOCUS,
    config: TrapFocusConfig
  ): void {
    const focusable: HTMLElement[] = this.findFocusable(host);

    let index = focusable.findIndex(v => v === event.target) + increment;

    const shouldFocus =
      (index >= 0 && index <= focusable.length) ||
      (index < 0 && this.getTrapStart(config.trap)) ||
      (index > focusable.length && this.getTrapEnd(config.trap));

    // focus
    if (shouldFocus) {
      if (index >= focusable.length) {
        index = 0;
      }
      if (index < 0) {
        index = focusable.length - 1;
      }

      event.preventDefault();
      event.stopPropagation();

      const el = focusable[index];
      if (el.getAttribute('tabindex') !== '-1') {
        el.focus();
      }
    }
  }

  protected getTrapStart(trap: boolean | 'start' | 'end'): boolean {
    return trap === true || trap === 'start';
  }

  protected getTrapEnd(trap: boolean | 'start' | 'end'): boolean {
    return trap === true || trap === 'end';
  }
}
