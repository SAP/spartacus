import { Injectable } from '@angular/core';
import { EscapeFocusConfig } from '../keyboard-focus.model';
import { PersistFocusService } from '../persist/persist-focus.service';
import { SelectFocusUtility } from '../services/select-focus.util';

@Injectable({
  providedIn: 'root',
})
export class EscapeFocusService extends PersistFocusService {
  constructor(protected selectFocusUtil: SelectFocusUtility) {
    super();
  }

  shouldFocus(config: EscapeFocusConfig): boolean {
    return !!config?.focusOnEscape;
  }

  handleEscape(
    host: HTMLElement,
    config: EscapeFocusConfig,
    event: KeyboardEvent
  ): void {
    if (this.shouldFocus(config)) {
      if (host !== event.target) {
        host.focus({ preventScroll: true });
        event.preventDefault();
        event.stopPropagation();
      } else {
        if (config?.focusOnDoubleEscape) {
          this.selectFocusUtil
            .findFirstFocusable(host, { autofocus: true })
            ?.focus();
        }
      }
    }
  }
}
