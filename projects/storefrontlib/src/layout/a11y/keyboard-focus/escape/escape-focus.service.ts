import { Injectable } from '@angular/core';
import { EscapeFocusConfig } from '../keyboard-focus.model';
import { PersistFocusService } from '../persist/persist-focus.service';

@Injectable({
  providedIn: 'root',
})
export class EscapeFocusService extends PersistFocusService {
  handleEscape(
    host: HTMLElement,
    config: EscapeFocusConfig,
    event: KeyboardEvent
  ) {
    if (config?.focusOnEscape) {
      const currentTabIndex = this.getTabIndex(host);
      if (!currentTabIndex || currentTabIndex === '-1') {
        host.setAttribute('tabindex', '0');
      }

      if (host !== event.target) {
        if (host.getAttribute('tabindex') !== '-1') {
          host.focus({ preventScroll: true });
          event.preventDefault();
          event.stopPropagation();
        }
      } else {
        if (config?.focusOnDoubleEscape) {
          this.selectFocusUtil
            .findfirstFocusable(host, { autofocus: true })
            ?.focus();
        }
      }

      this.setTabIndex(host, currentTabIndex || '-1');
    }
  }
}
