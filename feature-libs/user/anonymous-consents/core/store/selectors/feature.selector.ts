import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  AnonymousConsentsState,
  ANONYMOUS_CONSENTS_STORE_FEATURE,
  StateWithAnonymousConsents,
} from '../anonymous-consents-state';

export const getAnonymousConsentState: MemoizedSelector<
  StateWithAnonymousConsents,
  AnonymousConsentsState
> = createFeatureSelector<AnonymousConsentsState>(
  ANONYMOUS_CONSENTS_STORE_FEATURE
);
