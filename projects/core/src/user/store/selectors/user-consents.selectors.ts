import { createSelector, MemoizedSelector } from '@ngrx/store';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderErrorSelector,
  loaderLoadingSelector,
  loaderSuccessSelector,
  loaderValueSelector,
} from '../../../state/utils/loader/loader.selectors';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';
import { ConsentTemplate } from '../../../model/consent.model';

export const getConsentsState: MemoizedSelector<
  StateWithUser,
  LoaderState<ConsentTemplate[]>
> = createSelector(
  getUserState,
  (state: UserState) => state.consents
);

export const getConsentsValue: MemoizedSelector<
  StateWithUser,
  ConsentTemplate[]
> = createSelector(
  getConsentsState,
  loaderValueSelector
);

export const getConsentsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getConsentsState,
  loaderLoadingSelector
);

export const getConsentsSuccess: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getConsentsState,
  loaderSuccessSelector
);

export const getConsentsError: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getConsentsState,
  loaderErrorSelector
);
