import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class NavigationUiConfig {
  /**
   * Flag indicates whether to reset the state of menu navigation (ie. Collapse all submenus) when the menu is closed.
   */
  resetMenuOnClose?: boolean;
}

declare module '@spartacus/core' {
  interface Config extends NavigationUiConfig {}
}
