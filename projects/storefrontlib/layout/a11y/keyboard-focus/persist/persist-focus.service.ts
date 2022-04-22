import { Injectable } from '@angular/core';
import { BaseFocusService } from '../base/base-focus.service';
import { FOCUS_GROUP_ATTR, PersistFocusConfig } from '../keyboard-focus.model';

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
export class PersistFocusService extends BaseFocusService {
  // this is going to fail as we have sub services. They will al have their own map.
  // We must bring this to a singleton map.
  protected focus = new Map<string, string>();

  get(group?: string): string {
    return this.focus.get(group || GLOBAL_GROUP);
  }

  /**
   * Persist the keyboard focus state for the given key. The focus is stored globally
   * or for the given group.
   */
  set(key: string, group?: string) {
    if (key) {
      this.focus.set(group || GLOBAL_GROUP, key);
    }
  }

  /**
   * Clears the persisted keyboard focus state globally or for the given group.
   */
  clear(group?: string) {
    this.focus.delete(group || GLOBAL_GROUP);
  }

  /**
   * Returns the group for the host element based on the configured group or
   * by the `data-cx-focus-group` attribute stored on the host.
   */
  getPersistenceGroup(host: HTMLElement, config?: PersistFocusConfig): string {
    return config?.group ? config.group : host.getAttribute(FOCUS_GROUP_ATTR);
  }
}
