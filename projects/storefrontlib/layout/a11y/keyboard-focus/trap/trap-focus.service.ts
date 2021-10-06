import { Injectable } from '@angular/core';
import {
  MOVE_FOCUS,
  TrapFocus,
  TrapFocusConfig,
  TrapFocusType,
} from '../keyboard-focus.model';
import { TabFocusService } from '../tab/tab-focus.service';

@Injectable({
  providedIn: 'root',
})
export class TrapFocusService extends TabFocusService {
  /**
   * Indicates whether any of the child elements of the host are focusable.
   *
   * @param host `HTMLElement` that is used to query the focusable elements.
   */
  hasFocusableChildren(host: HTMLElement): boolean {
    return this.findFocusable(host).length > 0;
  }

  /**
   * Focus the next or previous element of all available focusable elements.
   * The focus is _trapped_ in case there's no next or previous available element.
   * The focus will automatically move the start or end of the list.
   */
  moveFocus(
    host: HTMLElement,
    config: TrapFocusConfig,
    increment: MOVE_FOCUS,
    event: UIEvent
  ): void {
    const focusable: HTMLElement[] = this.findFocusable(host);

    let index = focusable.findIndex((v) => v === event.target) + increment;

    const shouldMoveFocus =
      (index >= 0 && index < focusable.length) ||
      (index < 0 && this.getTrapStart(config.trap)) ||
      (index >= focusable.length && this.getTrapEnd(config.trap));

    if (shouldMoveFocus) {
      if (index >= focusable.length) {
        index = 0;
      }
      if (index < 0) {
        index = focusable.length - 1;
      }

      event.preventDefault();
      event.stopPropagation();

      const el = focusable[index];

      el.focus();
    }
  }

  protected getTrapStart(trap: TrapFocusType): boolean {
    return trap === true || trap === TrapFocus.start;
  }

  protected getTrapEnd(trap: TrapFocusType): boolean {
    return trap === true || trap === TrapFocus.end;
  }
}
