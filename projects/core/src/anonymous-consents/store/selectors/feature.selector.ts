import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import {
  ANONYMOUS_CONSENTS_STORE_FEATURE,
  AnonymousConsentsState,
  StateWithAnonymousConsents,
} from '../anonymous-consents-state';

export const getAnonymousConsentState: MemoizedSelector<
  StateWithAnonymousConsents,
  AnonymousConsentsState
> = createFeatureSelector<AnonymousConsentsState>(
  ANONYMOUS_CONSENTS_STORE_FEATURE
);
