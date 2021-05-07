import { MULTI_CART_DATA, StateUtils } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Configurator } from '../../model/configurator.model';
import { CONFIGURATOR_DATA } from '../configurator-state';
import * as ConfiguratorActions from './configurator-cart.action';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '15468-5464-9852-54682';
const OWNER_KEY = 'product/' + PRODUCT_CODE;
const CART_ID = '00000001';
const OWNER: CommonConfigurator.Owner = {
  id: PRODUCT_CODE,
  type: CommonConfigurator.OwnerType.PRODUCT,
  key: OWNER_KEY,
};

const CONFIGURATION: Configurator.Configuration = {
  productCode: PRODUCT_CODE,
  configId: CONFIG_ID,
  owner: OWNER,
};

describe('ConfiguratorCartActions', () => {
  describe('SetNextOwnerCartEntry', () => {
    const cartEntryNo = '3';
    it('should carry expected meta data', () => {
      const action = new ConfiguratorActions.SetNextOwnerCartEntry({
        configuration: CONFIGURATION,
        cartEntryNo: cartEntryNo,
      });

      expect({ ...action }).toEqual({
        type: ConfiguratorActions.SET_NEXT_OWNER_CART_ENTRY,
        payload: { configuration: CONFIGURATION, cartEntryNo: cartEntryNo },
        meta: StateUtils.entitySuccessMeta(CONFIGURATOR_DATA, OWNER_KEY),
      });
    });
  });

  describe('UpdateCartEntry', () => {
    const params: Configurator.UpdateConfigurationForCartEntryParameters = {
      configuration: CONFIGURATION,
      cartId: CART_ID,
    };
    it('should carry expected meta data', () => {
      const action = new ConfiguratorActions.UpdateCartEntry(params);

      expect({ ...action }).toEqual({
        type: ConfiguratorActions.UPDATE_CART_ENTRY,
        payload: params,

        meta: StateUtils.entityProcessesIncrementMeta(MULTI_CART_DATA, CART_ID),
      });
    });
  });

  describe('AddToCart', () => {
    const params: Configurator.AddToCartParameters = {
      userId: 'U',
      cartId: '123',
      productCode: PRODUCT_CODE,
      quantity: 1,
      configId: CONFIGURATION.configId,
      owner: OWNER,
    };
    it('should carry expected meta data', () => {
      const action = new ConfiguratorActions.AddToCart(params);

      expect({ ...action }).toEqual({
        type: ConfiguratorActions.ADD_TO_CART,
        payload: params,

        meta: StateUtils.entityProcessesIncrementMeta(
          MULTI_CART_DATA,
          params.cartId
        ),
      });
    });
  });
});
