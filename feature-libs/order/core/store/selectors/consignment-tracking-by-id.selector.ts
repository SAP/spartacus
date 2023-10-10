import { MemoizedSelector, createSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { StateWithOrder, OrderState } from '../order-state';
import { getOrderState } from './feature.selector';

export const getConsignmentTrackingByIDState: MemoizedSelector<
  StateWithOrder,
  StateUtils.EntityLoaderState<ConsignmentTracking>
> = createSelector(
  getOrderState,
  (state: OrderState) => state.consignmentTrackingByID
);

export const getConsignmentTrackingByIdState = (
  orderCode: string,
  consignmentCode: string
): MemoizedSelector<
  StateWithOrder,
  StateUtils.LoaderState<ConsignmentTracking>
> =>
  createSelector(
    getConsignmentTrackingByIDState,
    (state: StateUtils.EntityLoaderState<ConsignmentTracking>) =>
      StateUtils.entityLoaderStateSelector(
        state,
        `${orderCode},${consignmentCode}`
      )
  );
export const getConsignmentTrackingById = (
  orderCode: string,
  consignmentCode: string
): MemoizedSelector<StateWithOrder, ConsignmentTracking> => {
  return createSelector(
    getConsignmentTrackingByIdState(orderCode, consignmentCode),
    (consignmentTrackingByIDState) =>
      StateUtils.loaderValueSelector(consignmentTrackingByIDState)
  );
};

export const getConsignmentTrackingByIdLoading = (
  orderCode: string,
  consignmentCode: string
): MemoizedSelector<StateWithOrder, boolean> => {
  return createSelector(
    getConsignmentTrackingByIdState(orderCode, consignmentCode),
    (loaderState) => StateUtils.loaderLoadingSelector(loaderState)
  );
};

export const getConsignmentTrackingByIdSuccess = (
  orderCode: string,
  consignmentCode: string
): MemoizedSelector<StateWithOrder, boolean> => {
  return createSelector(
    getConsignmentTrackingByIdState(orderCode, consignmentCode),
    (loaderState) => StateUtils.loaderSuccessSelector(loaderState)
  );
};
