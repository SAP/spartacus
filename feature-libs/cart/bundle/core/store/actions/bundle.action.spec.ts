import { BundleActions } from './index';
import { SearchConfig, StateUtils } from '@spartacus/core';
import { BUNDLE_DATA } from '../bundle-state';

describe('Bundle Actions', () => {
  const userId = 'anonymous';
  const cartId = 'xxxxx';
  const entryGroupNumber = 5;
  const searchConfig: SearchConfig = { pageSize: 10 };
  const params = {
    userId,
    cartId,
    entryGroupNumber,
    searchConfig,
  };
  const bundleStarter = {};

  describe('GetBundleAllowedProducts', () => {
    it('should create GetBundleAllowedProducts action', () => {
      const payload = params;
      const action = new BundleActions.GetBundleAllowedProducts(params);

      expect({ ...action }).toEqual({
        type: BundleActions.GET_BUNDLE_ALLOWED_PRODUCTS,
        meta: StateUtils.loadMeta(BUNDLE_DATA),
        payload,
      });
    });
  });

  describe('GetBundleAllowedProductsFail', () => {
    it('should create GetBundleAllowedProductsFail action', () => {
      const payload = { ...params, error: 'Error' };
      const action = new BundleActions.GetBundleAllowedProductsFail(payload);

      expect({ ...action }).toEqual({
        type: BundleActions.GET_BUNDLE_ALLOWED_PRODUCTS_FAIL,
        payload,
        meta: StateUtils.failMeta(BUNDLE_DATA, payload),
      });
    });
  });

  describe('GetBundleAllowedProductsSuccess', () => {
    it('should create GetBundleAllowedProductsSuccess action', () => {
      const payload = { ...params };
      const action = new BundleActions.GetBundleAllowedProductsSuccess(
        <any>payload
      );

      expect({ ...action }).toEqual(<any>{
        type: BundleActions.GET_BUNDLE_ALLOWED_PRODUCTS_SUCCESS,
        payload,
        meta: StateUtils.successMeta(BUNDLE_DATA),
      });
    });
  });

  describe('StartBundle', () => {
    it('should create StartBundle action', () => {
      const payload = { userId, cartId, bundleStarter };
      const action = new BundleActions.StartBundle(payload);

      expect({ ...action }).toEqual({
        type: BundleActions.START_BUNDLE,
        meta: StateUtils.loadMeta(BUNDLE_DATA),
        payload,
      });
    });
  });

  describe('StartBundleFail', () => {
    it('should create StartBundleFail action', () => {
      const payload = { userId, cartId, bundleStarter, error: 'Error' };
      const action = new BundleActions.StartBundleFail(payload);

      expect({ ...action }).toEqual({
        type: BundleActions.START_BUNDLE_FAIL,
        payload,
        meta: StateUtils.failMeta(BUNDLE_DATA, payload),
      });
    });
  });

  describe('StartBundleSuccess', () => {
    it('should create StartBundleSuccess action', () => {
      const payload = { userId, cartId, bundleStarter };
      const action = new BundleActions.StartBundleSuccess(<any>payload);

      expect({ ...action }).toEqual(<any>{
        type: BundleActions.START_BUNDLE_SUCCESS,
        payload,
        meta: StateUtils.successMeta(BUNDLE_DATA),
      });
    });
  });
});
