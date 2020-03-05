import { Injectable } from '@angular/core';
import { EscapeFocusService } from '../escape/escape-focus.service';
import { AutoFocusConfig, PersistFocusConfig } from '../keyboard-focus.model';

@Injectable({
  providedIn: 'root',
})
export class AutoFocusService extends EscapeFocusService {
  findfirstFocusable(
    host: HTMLElement,
    config: AutoFocusConfig = { autofocus: true }
  ): HTMLElement {
    if (config?.autofocus === ':host') {
      return host;
    } else if (this.persistFocusUtil.hasPersistedFocus(host, config)) {
      return this.persistFocusUtil.getPersisted(
        host,
        this.persistFocusUtil.getPersistenceGroup(host, config)
      );
    } else {
      return this.selectFocusUtil.findfirstFocusable(host, config);
    }
  }

  hasPersistedFocus(host: HTMLElement, config: PersistFocusConfig) {
    return this.persistFocusUtil.hasPersistedFocus(host, config);
  }
}
