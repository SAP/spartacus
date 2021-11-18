import { PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import { CheckoutActions } from '../actions/index';
import { GET_PAYMENT_TYPES_PROCESS_ID } from '../checkout-state';

const userId = 'testUserId';
const cartId = 'testCartId';

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
        const action = new CheckoutActions.ResetLoadPaymentTypesProcess();

        expect({ ...action }).toEqual({
          type: CheckoutActions.RESET_LOAD_PAYMENT_TYPES_PROCESS_ID,
          meta: StateUtils.entityResetMeta(
            PROCESS_FEATURE,
            GET_PAYMENT_TYPES_PROCESS_ID
          ),
        });
      });
    });

    describe('Set payment type for Cart', () => {
      describe('SetPaymentType', () => {
        it('should create the action', () => {
          const payload = {
            userId,
            cartId,
            typeCode: 'typeCode',
            poNumber: 'poNumber',
          };

          const action = new CheckoutActions.SetPaymentType(payload);
          expect({ ...action }).toEqual({
            type: CheckoutActions.SET_PAYMENT_TYPE,
            payload,
          });
        });
      });

      describe('SetPaymentTypeFail', () => {
        it('should create the action', () => {
          const error = 'anError';
          const action = new CheckoutActions.SetPaymentTypeFail(error);

          expect({ ...action }).toEqual({
            type: CheckoutActions.SET_PAYMENT_TYPE_FAIL,
            payload: error,
          });
        });
      });

      describe('SetPaymentTypeSuccess', () => {
        it('should create the action', () => {
          const cart = { code: 'test' };
          const action = new CheckoutActions.SetPaymentTypeSuccess(cart);
          expect({ ...action }).toEqual({
            type: CheckoutActions.SET_PAYMENT_TYPE_SUCCESS,
            payload: cart,
          });
        });
      });
    });
  });
});
