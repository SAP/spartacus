import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import {
  CheckoutState,
  CheckoutStepsState,
  CHECKOUT_FEATURE,
  StateWithCheckout,
} from '../checkout-state';

export const getCheckoutState: MemoizedSelector<
  StateWithCheckout,
  CheckoutState
> = createFeatureSelector<CheckoutState>(CHECKOUT_FEATURE);

export const getCheckoutStepsState: MemoizedSelector<
  StateWithCheckout,
  StateUtils.LoaderState<CheckoutStepsState>
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

export const getCheckoutDetailsLoaded: MemoizedSelector<
  StateWithCheckout,
  boolean
> = createSelector(
  getCheckoutStepsState,
  (state) =>
    StateUtils.loaderSuccessSelector(state) &&
    !StateUtils.loaderLoadingSelector(state)
);

export const getCheckoutLoading: MemoizedSelector<StateWithCheckout, boolean> =
  createSelector(getCheckoutStepsState, (state) =>
    StateUtils.loaderLoadingSelector(state)
  );

export const getPoNumer: MemoizedSelector<
  StateWithCheckout,
  string | undefined
> = createSelector(
  getCheckoutSteps,
  (state: CheckoutStepsState) => state.poNumber.po
);
