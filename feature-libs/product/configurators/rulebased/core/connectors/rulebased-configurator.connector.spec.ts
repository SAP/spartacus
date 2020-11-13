import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CartModification, GenericConfigurator } from '@spartacus/core';
import { GenericConfiguratorUtilsService } from '@spartacus/product/configurators/common';
import { of } from 'rxjs';
import { Configurator } from '../model/configurator.model';
import { RulebasedConfiguratorAdapter } from './rulebased-configurator.adapter';
import { RulebasedConfiguratorConnector } from './rulebased-configurator.connector';

import createSpy = jasmine.createSpy;

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '1234-56-7890';
const USER_ID = 'theUser';
const CART_ID = '98876';
const CONFIGURATOR_TYPE = 'cpqconfig';

const productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  owner: {
    id: PRODUCT_CODE,
    type: GenericConfigurator.OwnerType.PRODUCT,
    configuratorType: CONFIGURATOR_TYPE,
  },
};

const readFromCartEntryParameters: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {
  userId: USER_ID,
  cartId: CART_ID,
  owner: productConfiguration.owner,
};

const readFromOrderEntryParameters: GenericConfigurator.ReadConfigurationFromOrderEntryParameters = {
  userId: USER_ID,
  orderId: CART_ID,
  owner: productConfiguration.owner,
};

const updateFromCartEntryParameters: Configurator.UpdateConfigurationForCartEntryParameters = {
  userId: USER_ID,
  cartId: CART_ID,
  configuration: productConfiguration,
};

const cartModification: CartModification = {};

class MockRulebasedConfiguratorAdapter implements RulebasedConfiguratorAdapter {
  readConfigurationForCartEntry = createSpy().and.callFake(() =>
    of(productConfiguration)
  );
  readConfigurationForOrderEntry = createSpy().and.callFake(() =>
    of(productConfiguration)
  );
  updateConfigurationForCartEntry = createSpy().and.callFake(() =>
    of(cartModification)
  );
  getConfigurationOverview = createSpy().and.callFake((configId: string) =>
    of('getConfigurationOverview' + configId)
  );

  readPriceSummary = createSpy().and.callFake((configId) =>
    of('readPriceSummary' + configId)
  );

  readConfiguration = createSpy().and.callFake((configId) =>
    of('readConfiguration' + configId)
  );

  updateConfiguration = createSpy().and.callFake((configuration) =>
    of('updateConfiguration' + configuration.configId)
  );

  createConfiguration = createSpy().and.callFake((owner) =>
    of('createConfiguration' + owner)
  );

  addToCart = createSpy().and.callFake((configId) =>
    of('addToCart' + configId)
  );
  getConfiguratorType(): string {
    return CONFIGURATOR_TYPE;
  }
}

describe('RulebasedConfiguratorConnector', () => {
  let service: RulebasedConfiguratorConnector;
  let configuratorUtils: GenericConfiguratorUtilsService;
  let adapter: RulebasedConfiguratorAdapter[];

  const GROUP_ID = 'GROUP1';

  const QUANTITY = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
          useClass: MockRulebasedConfiguratorAdapter,
          multi: true,
        },
        {
          provide: RulebasedConfiguratorConnector,
          useClass: RulebasedConfiguratorConnector,
        },
      ],
    });
    service = TestBed.inject(
      RulebasedConfiguratorConnector as Type<RulebasedConfiguratorConnector>
    );
    configuratorUtils = TestBed.inject(
      GenericConfiguratorUtilsService as Type<GenericConfiguratorUtilsService>
    );
    adapter = TestBed.inject(
      RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST
    );
    configuratorUtils.setOwnerKey(productConfiguration.owner);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call adapter on createConfiguration', () => {
    let result;
    service
      .createConfiguration(productConfiguration.owner)
      .subscribe((res) => (result = res));
    expect(result).toBe('createConfiguration' + productConfiguration.owner);

    expect(adapter[0].createConfiguration).toHaveBeenCalledWith(
      productConfiguration.owner
    );
  });

  it('should throw an error in case no adapter present for configurator type', () => {
    expect(function () {
      const ownerForUnknownConfigurator: GenericConfigurator.Owner = {
        configuratorType: 'unknown',
        type: GenericConfigurator.OwnerType.PRODUCT,
        id: PRODUCT_CODE,
      };
      service.createConfiguration(ownerForUnknownConfigurator);
    }).toThrow();
  });

  it('should not throw an error in case an adapter is present for owners configurator type', () => {
    expect(function () {
      const ownerForUnknownConfigurator: GenericConfigurator.Owner = {
        configuratorType: CONFIGURATOR_TYPE,
        type: GenericConfigurator.OwnerType.PRODUCT,
        id: PRODUCT_CODE,
      };
      service.createConfiguration(ownerForUnknownConfigurator);
    }).toBeDefined();
  });

  it('should call adapter on readConfigurationForCartEntry', () => {
    service
      .readConfigurationForCartEntry(readFromCartEntryParameters)
      .subscribe((configuration) =>
        expect(configuration).toBe(productConfiguration)
      );
    expect(adapter[0].readConfigurationForCartEntry).toHaveBeenCalledWith(
      readFromCartEntryParameters
    );
  });

  it('should call adapter on updateConfigurationForCartEntry', () => {
    service
      .updateConfigurationForCartEntry(updateFromCartEntryParameters)
      .subscribe((result) => expect(result).toBe(cartModification));
    expect(adapter[0].updateConfigurationForCartEntry).toHaveBeenCalledWith(
      updateFromCartEntryParameters
    );
  });

  it('should call adapter on readConfigurationForOrderEntry', () => {
    service
      .readConfigurationForOrderEntry(readFromOrderEntryParameters)
      .subscribe((configuration) =>
        expect(configuration).toBe(productConfiguration)
      );
    expect(adapter[0].readConfigurationForOrderEntry).toHaveBeenCalledWith(
      readFromOrderEntryParameters
    );
  });

  it('should call adapter on readConfiguration', () => {
    let result;
    service
      .readConfiguration(CONFIG_ID, GROUP_ID, productConfiguration.owner)
      .subscribe((res) => (result = res));
    expect(result).toBe('readConfiguration' + CONFIG_ID);
    expect(adapter[0].readConfiguration).toHaveBeenCalledWith(
      CONFIG_ID,
      GROUP_ID,
      productConfiguration.owner
    );
  });

  it('should call adapter on updateConfiguration', () => {
    let result;
    service
      .updateConfiguration(productConfiguration)
      .subscribe((res) => (result = res));
    expect(result).toBe('updateConfiguration' + CONFIG_ID);
    expect(adapter[0].updateConfiguration).toHaveBeenCalledWith(
      productConfiguration
    );
  });

  it('should call adapter on readConfigurationPrice', () => {
    let result;
    service
      .readPriceSummary(productConfiguration)
      .subscribe((res) => (result = res));
    expect(result).toBe('readPriceSummary' + productConfiguration);
    expect(adapter[0].readPriceSummary).toHaveBeenCalledWith(
      productConfiguration
    );
  });

  it('should call adapter on getConfigurationOverview', () => {
    let result;
    service
      .getConfigurationOverview(productConfiguration)
      .subscribe((res) => (result = res));
    expect(result).toBe(
      'getConfigurationOverview' + productConfiguration.configId
    );
    expect(adapter[0].getConfigurationOverview).toHaveBeenCalledWith(
      productConfiguration.configId
    );
  });

  it('should call adapter on addToCart', () => {
    const parameters: Configurator.AddToCartParameters = {
      userId: USER_ID,
      cartId: CART_ID,
      productCode: PRODUCT_CODE,
      quantity: QUANTITY,
      configId: CONFIG_ID,
      owner: productConfiguration.owner,
    };
    let result;
    service.addToCart(parameters).subscribe((res) => (result = res));
    expect(adapter[0].addToCart).toHaveBeenCalledWith(parameters);
    expect(result).toBe('addToCart' + parameters);
  });
});
