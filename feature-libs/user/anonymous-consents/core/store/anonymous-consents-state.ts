import { StateUtils } from '@spartacus/core';
import {
  AnonymousConsent,
  ConsentTemplate,
} from '@spartacus/user/anonymous-consents/root';

export const ANONYMOUS_CONSENTS_STORE_FEATURE = 'anonymous-consents';
export const ANONYMOUS_CONSENTS = '[Anonymous Consents] Anonymous Consents';

export interface StateWithAnonymousConsents {
  [ANONYMOUS_CONSENTS_STORE_FEATURE]: AnonymousConsentsState;
}

export interface AnonymousConsentsState {
  templates: StateUtils.LoaderState<ConsentTemplate[]> | undefined;
  consents: AnonymousConsent[];
  ui: {
    bannerDismissed: boolean;
    updated: boolean;
  };
}
