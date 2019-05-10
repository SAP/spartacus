import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';

import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  CHECKOUT_FEATURE,
  CheckoutState,
  CheckoutStepsState,
  StateWithCheckout,
} from '../checkout-state';
import {
  loaderLoadingSelector,
  loaderSuccessSelector,
  loaderValueSelector,
} from '../../../state/utils/loader/loader.selectors';
import { DeliveryMode, Order } from '../../../model/order.model';
import { PaymentDetails } from '../../../model/cart.model';
import { Address } from '../../../model/address.model';

export const getDeliveryAddressSelector = (state: CheckoutStepsState) =>
  state.address;
export const getDeliveryModeSelector = (state: CheckoutStepsState) =>
  state.deliveryMode;
export const getPaymentDetailsSelector = (state: CheckoutStepsState) =>
  state.paymentDetails;
export const getOrderDetailsSelector = (state: CheckoutStepsState) =>
  state.orderDetails;

export const getCheckoutState: MemoizedSelector<
  StateWithCheckout,
  CheckoutState
> = createFeatureSelector<CheckoutState>(CHECKOUT_FEATURE);

export const getCheckoutStepsState: MemoizedSelector<
  StateWithCheckout,
  LoaderState<CheckoutStepsState>
> = createSelector(
  getCheckoutState,
  (checkoutState: CheckoutState) => checkoutState.steps
);

export const getCheckoutSteps: MemoizedSelector<
  StateWithCheckout,
  CheckoutStepsState
> = createSelector(
  getCheckoutStepsState,
  state => loaderValueSelector(state)
);

export const getDeliveryAddress: MemoizedSelector<
  StateWithCheckout,
  Address
> = createSelector(
  getCheckoutSteps,
  getDeliveryAddressSelector
);

export const getDeliveryMode: MemoizedSelector<
  StateWithCheckout,
  {
    supported: { [code: string]: DeliveryMode };
    selected: string;
  }
> = createSelector(
  getCheckoutSteps,
  getDeliveryModeSelector
);

export const getSupportedDeliveryModes: MemoizedSelector<
  StateWithCheckout,
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
  StateWithCheckout,
  string
> = createSelector(
  getDeliveryMode,
  deliveryMode => {
    return deliveryMode.selected;
  }
);

export const getSelectedDeliveryMode: MemoizedSelector<
  StateWithCheckout,
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
  StateWithCheckout,
  PaymentDetails
> = createSelector(
  getCheckoutSteps,
  getPaymentDetailsSelector
);

export const getCheckoutOrderDetails: MemoizedSelector<
  StateWithCheckout,
  Order
> = createSelector(
  getCheckoutSteps,
  getOrderDetailsSelector
);

export const getCheckoutDetailsLoaded: MemoizedSelector<
  StateWithCheckout,
  boolean
> = createSelector(
  getCheckoutStepsState,
  state => loaderSuccessSelector(state) && !loaderLoadingSelector(state)
);
