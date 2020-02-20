import { PaymentType } from '../../../model/cart.model';
import { CheckoutActions } from '../actions/index';
import { PaymentTypesState } from '../checkout-state';

export const initialState: PaymentTypesState = {
  entities: {},
  selected: '',
};

export function reducer(
  state = initialState,
  action:
    | CheckoutActions.PaymentTypesAction
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

    case CheckoutActions.CHECKOUT_CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}

export const getPaymentTypesEntites = (state: PaymentTypesState) =>
  state.entities;
export const getSelectedPaymentType = (state: PaymentTypesState) =>
  state.selected;
