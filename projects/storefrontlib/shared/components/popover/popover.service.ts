import { ElementRef, Injectable } from '@angular/core';
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/keyboard-focus.model';
import { PopoverEvent } from './popover.model';

@Injectable({
  providedIn: 'root',
})
export class PopoverService {
  /**
   * For a11y improvements method returns different `FocusConfig`
   * based on which event popover was triggered.
   */
  getFocusConfig(event: PopoverEvent, appendToBody: boolean): FocusConfig {
    let config = {};

    if (event === PopoverEvent.OPEN_BY_KEYBOARD && appendToBody) {
      config = {
        trap: true,
        block: true,
        focusOnEscape: false,
        autofocus: true,
      };
    }

    return config;
  }

  setFocusOnElement(
    element: ElementRef,
    focusConfig: FocusConfig,
    appendToBody?: boolean
  ) {
    if (focusConfig && appendToBody) {
      element.nativeElement.focus();
    }
  }
}
