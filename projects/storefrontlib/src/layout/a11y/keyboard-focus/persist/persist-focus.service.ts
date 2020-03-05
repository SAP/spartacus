import { Injectable } from '@angular/core';
import { FOCUS_GROUP_ATTR, PersistFocusConfig } from '../keyboard-focus.model';
import { BaseFocusService } from './base-focus.service';

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
  get(group?: string): string {
    return this.persistFocusUtil.get(group);
  }

  set(value: string, group?: string) {
    this.persistFocusUtil.set(value, group);
  }

  getPersistenceGroup(host: HTMLElement, config?: PersistFocusConfig): string {
    return config.group ? config.group : host.getAttribute(FOCUS_GROUP_ATTR);
  }
}
