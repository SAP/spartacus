import { MemoizedSelector, createSelector } from '@ngrx/store';

import { CheckoutState, CheckoutStepsState } from '../checkout-state';
import * as fromReducer from './../reducers/checkout.reducer';
import * as fromFeature from './../reducers/index';
import {
  DeliveryMode,
  Address,
  Order,
  PaymentDetails
} from '../../../occ/occ-models/index';

export const getCheckoutStepsState: MemoizedSelector<
  CheckoutState,
  CheckoutStepsState
> = createSelector(
  fromFeature.getCheckoutState,
  (state: CheckoutState) => state.steps
);

export const getDeliveryAddress: MemoizedSelector<
  CheckoutState,
  Address
> = createSelector(
  getCheckoutStepsState,
  fromReducer.getDeliveryAddress
);

export const getDeliveryMode: MemoizedSelector<
  CheckoutState,
  {
    supported: { [code: string]: DeliveryMode };
    selected: string;
  }
> = createSelector(
  getCheckoutStepsState,
  fromReducer.getDeliveryMode
);

export const getSupportedDeliveryModes: MemoizedSelector<
  CheckoutState,
  DeliveryMode[]
> = createSelector(
  getDeliveryMode,
  deliveryMode => {
    return Object.keys(deliveryMode.supported).map(
      code => deliveryMode.supported[code]
    );
  }
);

export const getSelectedCode: MemoizedSelector<
  CheckoutState,
  string
> = createSelector(
  getDeliveryMode,
  deliveryMode => {
    return deliveryMode.selected;
  }
);

export const getSelectedDeliveryMode: MemoizedSelector<
  CheckoutState,
  DeliveryMode
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

export const getPaymentDetails: MemoizedSelector<
  CheckoutState,
  PaymentDetails
> = createSelector(
  getCheckoutStepsState,
  fromReducer.getPaymentDetails
);

export const getCheckoutOrderDetails: MemoizedSelector<
  CheckoutState,
  Order
> = createSelector(
  getCheckoutStepsState,
  fromReducer.getOrderDetails
);
