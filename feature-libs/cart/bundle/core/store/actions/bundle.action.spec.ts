import { StateUtils } from '@spartacus/core';
import { BUNDLE_DATA } from '..';
import { BundleStarter } from '../../model';
import { BundleActions } from './index';

const mockUserId = 'test-user';
const mockCartId = 'test-cart';
const error = 'anError';
const bundleStarter: BundleStarter = {
  productCode: '5',
  templateId: 'test-bundle',
  quantity: 1,
};
const entryGroupNumber = 1;

describe('Bundle Actions', () => {
  describe('StartBundle Actions', () => {
    describe('StartBundle', () => {
      it('should create the action', () => {
        const action = new BundleActions.StartBundle({
          userId: mockUserId,
          cartId: mockCartId,
          bundleStarter,
        });

        expect({ ...action }).toEqual({
          type: BundleActions.START_BUNDLE,
          payload: { userId: mockUserId, cartId: mockCartId, bundleStarter },
          meta: StateUtils.loadMeta(BUNDLE_DATA),
        });
      });
    });

    describe('StartBundleSuccess', () => {
      it('should create the action', () => {
        const action = new BundleActions.StartBundleSuccess({
          userId: mockUserId,
          cartId: mockCartId,
        });

        expect({ ...action }).toEqual({
          type: BundleActions.START_BUNDLE_SUCCESS,
          payload: { userId: mockUserId, cartId: mockCartId },
          meta: StateUtils.successMeta(BUNDLE_DATA),
        });
      });
    });

    describe('StartBundleFail', () => {
      it('should create the action', () => {
        const payload = {
          userId: mockUserId,
          cartId: mockCartId,
          bundleStarter,
          error,
        };
        const action = new BundleActions.StartBundleFail(payload);

        expect({ ...action }).toEqual({
          type: BundleActions.START_BUNDLE_FAIL,
          payload,
          meta: StateUtils.failMeta(BUNDLE_DATA, payload),
        });
      });
    });
  });

  describe('GetBundleAllowedProducts Actions', () => {
    describe('GetBundleAllowedProducts', () => {
      it('should create the action', () => {
        const action = new BundleActions.GetBundleAllowedProducts({
          userId: mockUserId,
          cartId: mockCartId,
          entryGroupNumber,
        });

        expect({ ...action }).toEqual({
          type: BundleActions.GET_BUNDLE_ALLOWED_PRODUCTS,
          payload: { userId: mockUserId, cartId: mockCartId, entryGroupNumber },
          meta: StateUtils.loadMeta(BUNDLE_DATA),
        });
      });
    });

    describe('GetBundleAllowedProductsSuccess', () => {
      it('should create the action', () => {
        const action = new BundleActions.GetBundleAllowedProductsSuccess({
          userId: mockUserId,
          cartId: mockCartId,
        });

        expect({ ...action }).toEqual({
          type: BundleActions.GET_BUNDLE_ALLOWED_PRODUCTS_SUCCESS,
          payload: { userId: mockUserId, cartId: mockCartId },
          meta: StateUtils.successMeta(BUNDLE_DATA),
        });
      });
    });

    describe('GetBundleAllowedProductsFail', () => {
      it('should create the action', () => {
        const payload = {
          userId: mockUserId,
          cartId: mockCartId,
          entryGroupNumber,
          error,
        };
        const action = new BundleActions.GetBundleAllowedProductsFail(payload);

        expect({ ...action }).toEqual({
          type: BundleActions.GET_BUNDLE_ALLOWED_PRODUCTS_FAIL,
          payload,
          meta: StateUtils.failMeta(BUNDLE_DATA, payload),
        });
      });
    });
  });
});
