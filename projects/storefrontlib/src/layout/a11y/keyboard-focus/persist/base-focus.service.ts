import { Injectable } from '@angular/core';
import { PersistFocusUtility } from '../services/persist-focus.utility';
import { SelectFocusUtility } from '../services/select-focus.utility';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseFocusService {
  constructor(
    protected selectFocusUtil: SelectFocusUtility,
    protected persistFocusUtil: PersistFocusUtility
  ) {}

  // tabindex
  protected setTabIndex(host: HTMLElement, tabIndex: string) {
    host.setAttribute('tabindex', tabIndex);
  }

  protected getTabIndex(host: HTMLElement) {
    return host.getAttribute('tabindex');
  }
}
