import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers/index';
import * as fromReducer from './../reducers/checkout.reducer';
import { CheckoutState, CheckoutStepsState } from '../checkout-state';
import { DeliveryMode } from '../../../occ/occ-models/index';

export const getCheckoutStepsState: MemoizedSelector<
  any,
  CheckoutStepsState
> = createSelector(
  fromFeature.getCheckoutState,
  (state: CheckoutState) => state.steps
);

export const getDeliveryAddress: MemoizedSelector<any, any> = createSelector(
  getCheckoutStepsState,
  fromReducer.getDeliveryAddress
);

export const getDeliveryMode: MemoizedSelector<any, any> = createSelector(
  getCheckoutStepsState,
  fromReducer.getDeliveryMode
);

export const getSupportedDeliveryModes: MemoizedSelector<
  any,
  DeliveryMode[]
> = createSelector(
  getDeliveryMode,
  deliveryMode => {
    return Object.keys(deliveryMode.supported).map(
      code => deliveryMode.supported[code]
    );
  }
);

export const getSelectedCode: MemoizedSelector<any, any> = createSelector(
  getDeliveryMode,
  deliveryMode => {
    return deliveryMode.selected;
  }
);

export const getSelectedDeliveryMode: MemoizedSelector<
  any,
  any
> = createSelector(
  getDeliveryMode,
  deliveryMode => {
    if (deliveryMode.selected !== '') {
      if (Object.keys(deliveryMode.supported).length === 0) {
        return null;
      }
      return deliveryMode.supported[deliveryMode.selected];
    }
  }
);

export const getPaymentDetails: MemoizedSelector<any, any> = createSelector(
  getCheckoutStepsState,
  fromReducer.getPaymentDetails
);

export const getCheckoutOrderDetails: MemoizedSelector<
  any,
  any
> = createSelector(
  getCheckoutStepsState,
  fromReducer.getOrderDetails
);
