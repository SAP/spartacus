import { Injectable } from '@angular/core';
import { FocusConfig } from '../../../layout';

@Injectable({
  providedIn: 'root',
})
export class PopoverService {
  /**
   * For a11y improvements method returns different `FocusConfig`
   * based on which event popover was triggered.
   */
  getFocusConfig(event: Event, appendToBody: boolean): any | null {
    let config: FocusConfig = null;

    if (event instanceof KeyboardEvent) {
      if ((event.code === 'Enter' || event.code === 'Space') && appendToBody) {
        config = {
          trap: true,
          block: true,
          focusOnEscape: false,
          autofocus: true,
        };
      }
    }

    return config;
  }
}
