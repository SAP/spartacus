import { Injectable } from '@angular/core';
import { EscapeFocusService } from '../escape/escape-focus.service';
import {
  AutoFocusConfig,
  FOCUS_ATTR,
  PersistFocusConfig,
} from '../keyboard-focus.model';

@Injectable({
  providedIn: 'root',
})
export class AutoFocusService extends EscapeFocusService {
  /**
   * Returns the first focusable child element of the host element.
   */
  findFirstFocusable(
    host: HTMLElement,
    config: AutoFocusConfig = { autofocus: true }
  ): HTMLElement {
    if (config?.autofocus === ':host') {
      return host;
    } else if (this.hasPersistedFocus(host, config)) {
      return this.getPersisted(host, this.getPersistenceGroup(host, config));
    } else {
      return this.selectFocusUtil.findFirstFocusable(host, config) || host;
    }
  }

  /**
   * Indicates whether any of the focusable child elements is focused.
   */
  hasPersistedFocus(host: HTMLElement, config: PersistFocusConfig): boolean {
    return !!this.getPersisted(host, this.getPersistenceGroup(host, config));
  }

  /**
   * Returns the element that has a persisted focus state.
   *
   * @param host the `HTMLElement` used to query for focusable children
   * @param group the optional group for the persistent state, to separate different focus
   *   groups and remain the persistence
   */
  protected getPersisted(host: HTMLElement, group?: string): HTMLElement {
    if (!this.get(group)) {
      return;
    }
    const focussed = Array.from(
      host.querySelectorAll(
        `[${FOCUS_ATTR}='${this.get(group)}']`
      ) as NodeListOf<HTMLElement>
    );
    return focussed.length > 0 ? focussed[0] : null;
  }
}
