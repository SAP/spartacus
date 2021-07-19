import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AnonymousConsent } from '@spartacus/user/anonymous-consents/root';
import { StateWithAnonymousConsents } from '../anonymous-consents-state';
import { getAnonymousConsentState } from './feature.selector';

export const getAnonymousConsents: MemoizedSelector<
  StateWithAnonymousConsents,
  AnonymousConsent[]
  // TODO:#anon - added due to the fact that the ngrx store is not yet initialized when invoked from the interceptor
> = createSelector(getAnonymousConsentState, (state) => state?.consents ?? []);

export const getAnonymousConsentByTemplateCode = (
  templateCode: string
): MemoizedSelector<StateWithAnonymousConsents, AnonymousConsent | undefined> =>
  createSelector(getAnonymousConsents, (consents) =>
    consents.find((consent) => consent.templateCode === templateCode)
  );
