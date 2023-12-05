import { OccConfig } from '../../occ/config/occ-config';
import * as i0 from "@angular/core";
export declare abstract class AnonymousConsentsConfig extends OccConfig {
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AnonymousConsentsConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AnonymousConsentsConfig>;
}
declare module '../../config/config-tokens' {
    interface Config extends AnonymousConsentsConfig {
    }
}
