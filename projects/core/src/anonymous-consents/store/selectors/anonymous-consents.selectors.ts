import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AnonymousConsent } from '../../../model/consent.model';
import { StateWithAnonymousConsents } from '../anonymous-consents-state';
import { getAnonymousConsentState } from './feature.selector';

export const getAnonymousConsents: MemoizedSelector<
  StateWithAnonymousConsents,
  AnonymousConsent[]
> = createSelector(getAnonymousConsentState, (state) => state.consents);

export const getAnonymousConsentByTemplateCode = (
  templateCode: string
): MemoizedSelector<StateWithAnonymousConsents, AnonymousConsent> =>
  createSelector(getAnonymousConsents, (consents) =>
    consents.find((consent) => consent.templateCode === templateCode)
  );
