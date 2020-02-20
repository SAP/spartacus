import { CheckoutActions } from '../actions/index';
import {
  PROCESS_FEATURE,
  GET_PAYMENT_TYPES_PROCESS_ID,
  StateEntityLoaderActions,
} from '@spartacus/core';

describe('Payment Types Actions', () => {
  describe('Load All Payment Types', () => {
    describe('LoadPaymentTypes', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.LoadPaymentTypes();
        expect({ ...action }).toEqual({
          type: CheckoutActions.LOAD_PAYMENT_TYPES,
          meta: StateEntityLoaderActions.entityLoadMeta(
            PROCESS_FEATURE,
            GET_PAYMENT_TYPES_PROCESS_ID
          ),
        });
      });
    });

    describe('LoadPaymentTypesFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CheckoutActions.LoadPaymentTypesFail(error);

        expect({ ...action }).toEqual({
          type: CheckoutActions.LOAD_PAYMENT_TYPES_FAIL,
          payload: error,
          meta: StateEntityLoaderActions.entityFailMeta(
            PROCESS_FEATURE,
            GET_PAYMENT_TYPES_PROCESS_ID
          ),
        });
      });
    });

    describe('LoadPaymentTypesSuccess', () => {
      it('should create the action', () => {
        const paymentTypes = [{ code: 'card', displayName: 'card' }];
        const action = new CheckoutActions.LoadPaymentTypesSuccess(
          paymentTypes
        );
        expect({ ...action }).toEqual({
          type: CheckoutActions.LOAD_PAYMENT_TYPES_SUCCESS,
          payload: paymentTypes,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            PROCESS_FEATURE,
            GET_PAYMENT_TYPES_PROCESS_ID
          ),
        });
      });
    });
  });
});
