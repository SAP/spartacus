import { AnonymousConsentsConfig } from './anonymous-consents-config';

export const defaultAnonymousConsentsConfig: AnonymousConsentsConfig = {
  anonymousConsents: {
    footerLink: true,
    showLegalDescriptionInDialog: true,
    consentManagementPage: {
      showAnonymousConsents: true,
      hideConsents: [],
    },
  },
};
