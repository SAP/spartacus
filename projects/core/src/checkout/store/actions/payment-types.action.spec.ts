import { CheckoutActions } from '../actions/index';
import { PROCESS_FEATURE, GET_PAYMENT_TYPES_PROCESS_ID } from '@spartacus/core';
import { StateUtils } from '../../../state/utils/index';

describe('Payment Types Actions', () => {
  describe('Load All Payment Types', () => {
    describe('LoadPaymentTypes', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.LoadPaymentTypes();
        expect({ ...action }).toEqual({
          type: CheckoutActions.LOAD_PAYMENT_TYPES,
          meta: StateUtils.entityLoadMeta(
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
          meta: StateUtils.entityFailMeta(
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
          meta: StateUtils.entitySuccessMeta(
            PROCESS_FEATURE,
            GET_PAYMENT_TYPES_PROCESS_ID
          ),
        });
      });
    });

    describe('ResetLoadPaymentTypeProcess Action', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.ResetLoadPaymentTypeProcess();

        expect({ ...action }).toEqual({
          type: CheckoutActions.RESET_LOAD_PAYMENT_TYPES_PROCESS_ID,
          meta: StateUtils.entityResetMeta(
            PROCESS_FEATURE,
            GET_PAYMENT_TYPES_PROCESS_ID
          ),
        });
      });
    });
  });
});
