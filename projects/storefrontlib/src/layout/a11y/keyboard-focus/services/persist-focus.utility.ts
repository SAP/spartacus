import { Inject, Injectable } from '@angular/core';
import {
  FOCUS_ATTR,
  FOCUS_GROUP_ATTR,
  PersistFocusConfig,
} from '../keyboard-focus.model';
import { KEYBOARD_FOCUS_TOKEN } from '../keyboard-focus.token';

const GLOBAL_GROUP = '_g_';

/**
 * Shared service to persist the focus for an element or a group
 * of elements. The persisted element focus can be used to persist
 * the focus for a DOM tree, so that the focus remains after a repaint
 * or reoccurs when a DOM tree is "unlocked".
 */
@Injectable({
  providedIn: 'root',
})
export class PersistFocusUtility {
  protected focus = new Map<string, string>();

  constructor(
    @Inject(KEYBOARD_FOCUS_TOKEN) protected persistToken: PersistFocusConfig
  ) {}

  get(group?: string): string {
    return this.focus.get(group || GLOBAL_GROUP);
  }

  set(value: string, group?: string) {
    this.focus.set(group || GLOBAL_GROUP, value);
  }

  /**
   * Indicates whether any of the focusable child elements is focused.
   */
  hasPersistedFocus(host: HTMLElement, config: PersistFocusConfig): boolean {
    return !!this.getPersisted(host, this.getPersistenceGroup(host, config));
  }

  /**
   * returns the persistence group (if any) for the focusable elements.
   */
  getPersistenceGroup(host: HTMLElement, config?: PersistFocusConfig): string {
    return config.group ? config.group : host.getAttribute(FOCUS_GROUP_ATTR);
  }

  /**
   * Returns the element that has a persisted focus state.
   *
   * @param host the `HTMLElement` used to query for focusable children
   * @param group the optional group for the persistent state, to separate different focus
   *   groups and remain the persistance
   */
  getPersisted(host: HTMLElement, group?: string): HTMLElement {
    const focussed = Array.from(
      host.querySelectorAll(
        `[${FOCUS_ATTR}='${this.get(group)}']`
      ) as NodeListOf<HTMLElement>
    );
    return focussed.length > 0 ? focussed[0] : null;
  }
}
