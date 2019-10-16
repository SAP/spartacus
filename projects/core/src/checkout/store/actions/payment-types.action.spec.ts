import { CheckoutActions } from '../actions/index';
import {
  PROCESS_FEATURE,
  SET_SUPPORTED_PAYMENT_TYPES_PROCESS_ID,
  StateEntityLoaderActions,
} from '@spartacus/core';

const userId = 'testUserId';
const cartId = 'testCartId';
describe('Payment Types Actions', () => {
  describe('Load All Payment Types', () => {
    describe('LoadPaymentTypes', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.LoadPaymentTypes();
        expect({ ...action }).toEqual({
          type: CheckoutActions.LOAD_PAYMENT_TYPES,
          meta: StateEntityLoaderActions.entityLoadMeta(
            PROCESS_FEATURE,
            SET_SUPPORTED_PAYMENT_TYPES_PROCESS_ID
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
            SET_SUPPORTED_PAYMENT_TYPES_PROCESS_ID
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
            SET_SUPPORTED_PAYMENT_TYPES_PROCESS_ID
          ),
        });
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
        // implement when API is ready
      });
    });
  });
});
