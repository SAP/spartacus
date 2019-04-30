import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ConsentTemplateList } from '../../../occ/occ-models/additional-occ.models';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderErrorSelector,
  loaderLoadingSelector,
  loaderSuccessSelector,
  loaderValueSelector,
} from '../../../state/utils/loader/loader.selectors';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

// TODO:#1184 - test

export const getConsentsState: MemoizedSelector<
  StateWithUser,
  LoaderState<ConsentTemplateList>
> = createSelector(
  getUserState,
  (state: UserState) => state.consents
);

export const getConsentsValue: MemoizedSelector<
  StateWithUser,
  ConsentTemplateList
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
