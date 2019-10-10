import { OccConfig } from '../../occ/config/occ-config';

export abstract class AnonymousConsentsConfig extends OccConfig {
  anonymousConsents?: {
    footerLink?: boolean;
    registerConsent?: string;
    showLegalDescriptionInDialog?: boolean;
    requiredConsents?: string[];
    consentManagementPage?: {
      showAnonymousConsents?: boolean;
      hideConsents?: string[];
    };
  };
}
