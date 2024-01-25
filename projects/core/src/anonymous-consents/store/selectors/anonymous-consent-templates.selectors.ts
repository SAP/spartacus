/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ConsentTemplate } from '../../../model/consent.model';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithAnonymousConsents } from '../anonymous-consents-state';
import { getAnonymousConsentState } from './feature.selector';

export const getAnonymousConsentTemplatesState: MemoizedSelector<
  StateWithAnonymousConsents,
  LoaderState<ConsentTemplate[]>
> = createSelector(getAnonymousConsentState, (state) => state.templates);

export const getAnonymousConsentTemplatesValue: MemoizedSelector<
  StateWithAnonymousConsents,
  ConsentTemplate[]
> = createSelector(
  getAnonymousConsentTemplatesState,
  (state: StateUtils.LoaderState<ConsentTemplate[]>) =>
    StateUtils.loaderValueSelector(state)
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
  return createSelector(getAnonymousConsentTemplatesValue, (templates) => {
    return templates
      ? templates.find((template) => template.id === templateCode)
      : undefined;
  });
};
