import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { ConsentTemplate } from '@spartacus/user/anonymous-consents/root';
import { StateWithAnonymousConsents } from '../anonymous-consents-state';
import { getAnonymousConsentState } from './feature.selector';

export const getAnonymousConsentTemplatesState: MemoizedSelector<
  StateWithAnonymousConsents,
  StateUtils.LoaderState<ConsentTemplate[]>
> = createSelector(getAnonymousConsentState, (state) => state.templates);

export const getAnonymousConsentTemplatesValue: MemoizedSelector<
  StateWithAnonymousConsents,
  ConsentTemplate[]
> = createSelector(
  getAnonymousConsentTemplatesState,
  StateUtils.loaderValueSelector
);

export const getAnonymousConsentTemplatesLoading: MemoizedSelector<
  StateWithAnonymousConsents,
  boolean
> = createSelector(
  getAnonymousConsentTemplatesState,
  StateUtils.loaderLoadingSelector
);

export const getAnonymousConsentTemplatesSuccess: MemoizedSelector<
  StateWithAnonymousConsents,
  boolean
> = createSelector(
  getAnonymousConsentTemplatesState,
  StateUtils.loaderSuccessSelector
);

export const getAnonymousConsentTemplatesError: MemoizedSelector<
  StateWithAnonymousConsents,
  boolean
> = createSelector(
  getAnonymousConsentTemplatesState,
  StateUtils.loaderErrorSelector
);

export const getAnonymousConsentTemplate = (
  templateCode: string
): MemoizedSelector<
  StateWithAnonymousConsents,
  ConsentTemplate | undefined
> => {
  return createSelector(getAnonymousConsentTemplatesValue, (templates) =>
    templates.find((template) => template.id === templateCode)
  );
};
