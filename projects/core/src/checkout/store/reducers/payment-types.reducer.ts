import { PaymentType } from '../../../model/cart.model';
import { CheckoutActions } from '../actions/index';
import { PaymentTypesState } from '../checkout-state';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const initialState: PaymentTypesState = {
  entities: {},
  selected: undefined,
};

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export function reducer(
  state = initialState,
  action:
    | CheckoutActions.PaymentTypesAction
    | CheckoutActions.ClearCheckoutData
    | CheckoutActions.CheckoutClearMiscsData
): PaymentTypesState {
  switch (action.type) {
    case CheckoutActions.LOAD_PAYMENT_TYPES_SUCCESS: {
      const paymentTypes: PaymentType[] = action.payload;
      const entities = paymentTypes.reduce(
        (
          paymentTypesEntities: { [code: string]: PaymentType },
          name: PaymentType
        ) => {
          return {
            ...paymentTypesEntities,
            [name.code]: name,
          };
        },
        {
          ...state.entities,
        }
      );

      return {
        ...state,
        entities,
      };
    }

    case CheckoutActions.SET_PAYMENT_TYPE_SUCCESS: {
      return {
        ...state,
        selected: action.payload.paymentType.code,
      };
    }

    case CheckoutActions.CLEAR_CHECKOUT_DATA: {
      return {
        ...state,
        selected: undefined,
      };
    }

    case CheckoutActions.CHECKOUT_CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getPaymentTypesEntites = (state: PaymentTypesState) =>
  state.entities;
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getSelectedPaymentType = (state: PaymentTypesState) =>
  state.selected;
