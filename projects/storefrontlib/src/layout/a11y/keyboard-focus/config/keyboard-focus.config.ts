import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class KeyboardFocusConfig {
  keyboardFocus?: {
    /**
     *  Resets the focus back to the root `<cx-storefront>` element when a navigation is started.
     */
    enableResetFocusOnNavigate?: boolean;
  };
}
