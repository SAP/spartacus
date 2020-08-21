
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { OrderHistoryList } from '../../../model/order.model';
import { StateUtils } from '../../../state/utils/index';
import { StateWithUser, UserState } from '../user-state';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { getUserState } from './feature.selector';

export const getReplenishmentOrdersState: MemoizedSelector<
    StateWithUser,
    LoaderState<OrderHistoryList>
> = createSelector(getUserState, (state: UserState) => state.orders);


export const getReplenishmentOrdersLoaded: MemoizedSelector<
    StateWithUser,
    boolean
    > = createSelector(getReplenishmentOrdersState, (state: LoaderState<OrderHistoryList>) =>
    StateUtils.loaderSuccessSelector(state)
);
