import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { MULTI_CART_DATA, StateUtils } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
} from '@spartacus/product/configurators/common';
import { Configurator } from '../../model/configurator.model';
import { CONFIGURATOR_DATA } from '../configurator-state';
import * as ConfiguratorActions from './configurator-cart.action';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '15468-5464-9852-54682';

const CONFIGURATION: Configurator.Configuration = {
  productCode: PRODUCT_CODE,
  configId: CONFIG_ID,
  owner: { id: PRODUCT_CODE, type: CommonConfigurator.OwnerType.PRODUCT },
};

describe('ConfiguratorCartActions', () => {
  let configuratorUtils: CommonConfiguratorUtilsService;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({}).compileComponents();
      configuratorUtils = TestBed.inject(
        CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
      );
      configuratorUtils.setOwnerKey(CONFIGURATION.owner);
    })
  );

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
        meta: StateUtils.entitySuccessMeta(
          CONFIGURATOR_DATA,
          CONFIGURATION.owner.key
        ),
      });
    });
  });

  describe('UpdateCartEntry', () => {
    const params: Configurator.UpdateConfigurationForCartEntryParameters = {
      configuration: CONFIGURATION,
    };
    it('should carry expected meta data', () => {
      const action = new ConfiguratorActions.UpdateCartEntry(params);

      expect({ ...action }).toEqual({
        type: ConfiguratorActions.UPDATE_CART_ENTRY,
        payload: params,

        meta: StateUtils.entityProcessesIncrementMeta(
          MULTI_CART_DATA,
          params.cartId
        ),
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
      owner: CONFIGURATION.owner,
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
