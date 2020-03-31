import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateWithAnonymousConsents } from '../anonymous-consents-state';
import { getAnonymousConsentState } from './feature.selector';

export const getAnonymousConsentTemplatesUpdate: MemoizedSelector<
  StateWithAnonymousConsents,
  boolean
> = createSelector(getAnonymousConsentState, (state) => state.ui.updated);

export const getAnonymousConsentsBannerDismissed: MemoizedSelector<
  StateWithAnonymousConsents,
  boolean
> = createSelector(
  getAnonymousConsentState,
  (state) => state.ui.bannerDismissed
);
