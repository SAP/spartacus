import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CostCenter } from '../../../model/org-unit.model';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getCostCentersState: MemoizedSelector<
  StateWithUser,
  LoaderState<CostCenter[]>
> = createSelector(getUserState, (state: UserState) => state.costCenters);

export const getCostCenters: MemoizedSelector<StateWithUser, CostCenter[]> =
  createSelector(getCostCentersState, (state: LoaderState<CostCenter[]>) =>
    StateUtils.loaderValueSelector(state)
  );
