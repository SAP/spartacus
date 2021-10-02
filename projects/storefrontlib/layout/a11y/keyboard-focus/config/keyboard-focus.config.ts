import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { BREAKPOINT } from '../../../config';

/**
 * @deprecated since 4.2, refer to spartacus issues (#13762)
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class KeyboardFocusConfig {
  keyboardFocus?: {
    /**
     * Resets the focus back to the root `<cx-storefront>` element when a navigation is started.
     */
    enableResetFocusOnNavigate?: boolean | BREAKPOINT[];

    /**
     * Resets the view back to the root `<cx-storefront>` element when a navigation is started. This can also be set to a BREAKPOINT value to only reset the view up to the provided value.
     */
    enableResetViewOnNavigate?: boolean | BREAKPOINT[];
  };
}

declare module '@spartacus/core' {
  interface Config extends KeyboardFocusConfig {}
}
