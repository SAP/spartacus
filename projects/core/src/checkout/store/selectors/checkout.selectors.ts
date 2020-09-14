import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Address } from '../../../model/address.model';
import { PaymentDetails } from '../../../model/cart.model';
import { DeliveryMode, Order } from '../../../model/order.model';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  CheckoutState,
  CheckoutStepsState,
  CHECKOUT_FEATURE,
  StateWithCheckout,
} from '../checkout-state';

const getDeliveryAddressSelector = (state: CheckoutStepsState) => state.address;
const getDeliveryModeSelector = (state: CheckoutStepsState) =>
  state.deliveryMode;
const getPaymentDetailsSelector = (state: CheckoutStepsState) =>
  state.paymentDetails;
const getOrderDetailsSelector = (state: CheckoutStepsState) =>
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
> = createSelector(getCheckoutStepsState, (state) =>
  StateUtils.loaderValueSelector(state)
);

export const getDeliveryAddress: MemoizedSelector<
  StateWithCheckout,
  Address
> = createSelector(getCheckoutSteps, getDeliveryAddressSelector);

export const getDeliveryMode: MemoizedSelector<
  StateWithCheckout,
  {
    supported: { [code: string]: DeliveryMode };
    selected: string;
  }
> = createSelector(getCheckoutSteps, getDeliveryModeSelector);

export const getSupportedDeliveryModes: MemoizedSelector<
  StateWithCheckout,
  DeliveryMode[]
> = createSelector(getDeliveryMode, (deliveryMode) => {
  return (
    deliveryMode &&
    Object.keys(deliveryMode.supported).map(
      (code) => deliveryMode.supported[code]
    )
  );
});

export const getSelectedDeliveryModeCode: MemoizedSelector<
  StateWithCheckout,
  string
> = createSelector(getDeliveryMode, (deliveryMode) => {
  return deliveryMode && deliveryMode.selected;
});

export const getSelectedDeliveryMode: MemoizedSelector<
  StateWithCheckout,
  DeliveryMode
> = createSelector(getDeliveryMode, (deliveryMode) => {
  if (deliveryMode.selected !== '') {
    if (Object.keys(deliveryMode.supported).length === 0) {
      return null;
    }
    return deliveryMode.supported[deliveryMode.selected];
  }
});

export const getPaymentDetails: MemoizedSelector<
  StateWithCheckout,
  PaymentDetails
> = createSelector(getCheckoutSteps, getPaymentDetailsSelector);

export const getCheckoutOrderDetails: MemoizedSelector<
  StateWithCheckout,
  Order
> = createSelector(getCheckoutSteps, getOrderDetailsSelector);

export const getCheckoutDetailsLoaded: MemoizedSelector<
  StateWithCheckout,
  boolean
> = createSelector(
  getCheckoutStepsState,
  (state) =>
    StateUtils.loaderSuccessSelector(state) &&
    !StateUtils.loaderLoadingSelector(state)
);

export const getCheckoutDetailsInProgress: MemoizedSelector<
  StateWithCheckout,
  boolean
> = createSelector(
  getCheckoutStepsState,
  (state) => !StateUtils.loaderLoadingSelector(state)
);

export const getPoNumer: MemoizedSelector<
  StateWithCheckout,
  string
> = createSelector(
  getCheckoutSteps,
  (state: CheckoutStepsState) => state.poNumber.po
);

export const getCostCenter: MemoizedSelector<
  StateWithCheckout,
  string
> = createSelector(
  getCheckoutSteps,
  (state: CheckoutStepsState) => state.poNumber.costCenter
);
