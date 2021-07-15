import { Injectable } from '@angular/core';
import { Config, OccConfig } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class AnonymousConsentsConfig extends OccConfig {
  anonymousConsents?: {
    /**
     * Specify the consent template ID to be show on the registration page.
     */
    registerConsent?: string;
    /**
     * Show the legal description at the top of the anonymous consents dialog.
     */
    showLegalDescriptionInDialog?: boolean;
    /**
     * Specify the list of consent template IDs that are required and which can't be toggled off.
     */
    requiredConsents?: string[];
    /**
     * Consent management page configuration.
     */
    consentManagementPage?: {
      /**
       * Show all anonymous consents on the consent management page.
       */
      showAnonymousConsents?: boolean;
      /**
       * A list of consent template IDs that should be hidden on the consent management page.
       */
      hideConsents?: string[];
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends AnonymousConsentsConfig {}
}
