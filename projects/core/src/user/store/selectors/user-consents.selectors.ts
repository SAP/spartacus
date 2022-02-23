import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ConsentTemplate } from '../../../model/consent.model';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getConsentsState: MemoizedSelector<
  StateWithUser,
  LoaderState<ConsentTemplate[]>
> = createSelector(getUserState, (state: UserState) => state.consents);

export const getConsentsValue: MemoizedSelector<
  StateWithUser,
  ConsentTemplate[]
> = createSelector(getConsentsState, StateUtils.loaderValueSelector);

export const getConsentByTemplateId = (
  templateId: string
): MemoizedSelector<StateWithUser, ConsentTemplate> =>
  createSelector(getConsentsValue, (templates) =>
    templates.find((template) => template.id === templateId)
  );

export const getConsentsLoading: MemoizedSelector<StateWithUser, boolean> =
  createSelector(getConsentsState, StateUtils.loaderLoadingSelector);

export const getConsentsSuccess: MemoizedSelector<StateWithUser, boolean> =
  createSelector(getConsentsState, StateUtils.loaderSuccessSelector);

export const getConsentsError: MemoizedSelector<StateWithUser, boolean> =
  createSelector(getConsentsState, StateUtils.loaderErrorSelector);
