import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CartModification,
  GenericConfigurator,
  GenericConfiguratorUtilsService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { Configurator } from '../model/configurator.model';
import { RulebasedConfiguratorAdapter } from './rulebased-configurator.adapter';
import { RulebasedConfiguratorConnector } from './rulebased-configurator.connector';
import createSpy = jasmine.createSpy;

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '1234-56-7890';
const USER_ID = 'theUser';
const CART_ID = '98876';

const productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  owner: {
    id: PRODUCT_CODE,
    type: GenericConfigurator.OwnerType.PRODUCT,
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
}

describe('ConfiguratorCommonsConnector', () => {
  let service: RulebasedConfiguratorConnector;
  let configuratorUtils: GenericConfiguratorUtilsService;

  const GROUP_ID = 'GROUP1';

  const QUANTITY = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RulebasedConfiguratorAdapter,
          useClass: MockRulebasedConfiguratorAdapter,
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
    configuratorUtils.setOwnerKey(productConfiguration.owner);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call adapter on createConfiguration', () => {
    const adapter = TestBed.inject(
      RulebasedConfiguratorAdapter as Type<RulebasedConfiguratorAdapter>
    );

    let result;
    service
      .createConfiguration(PRODUCT_CODE)
      .subscribe((res) => (result = res));
    expect(result).toBe('createConfiguration' + productConfiguration.owner);
    expect(adapter.createConfiguration).toHaveBeenCalledWith(
      productConfiguration.owner
    );
  });

  it('should call adapter on readConfigurationForCartEntry', () => {
    const adapter = TestBed.inject(
      RulebasedConfiguratorAdapter as Type<RulebasedConfiguratorAdapter>
    );

    service
      .readConfigurationForCartEntry(readFromCartEntryParameters)
      .subscribe((configuration) =>
        expect(configuration).toBe(productConfiguration)
      );
    expect(adapter.readConfigurationForCartEntry).toHaveBeenCalledWith(
      readFromCartEntryParameters
    );
  });

  it('should call adapter on updateConfigurationForCartEntry', () => {
    const adapter = TestBed.inject(
      RulebasedConfiguratorAdapter as Type<RulebasedConfiguratorAdapter>
    );

    service
      .updateConfigurationForCartEntry(updateFromCartEntryParameters)
      .subscribe((result) => expect(result).toBe(cartModification));
    expect(adapter.updateConfigurationForCartEntry).toHaveBeenCalledWith(
      updateFromCartEntryParameters
    );
  });

  it('should call adapter on readConfigurationForOrderEntry', () => {
    const adapter = TestBed.inject(
      RulebasedConfiguratorAdapter as Type<RulebasedConfiguratorAdapter>
    );

    service
      .readConfigurationForOrderEntry(readFromOrderEntryParameters)
      .subscribe((configuration) =>
        expect(configuration).toBe(productConfiguration)
      );
    expect(adapter.readConfigurationForOrderEntry).toHaveBeenCalledWith(
      readFromOrderEntryParameters
    );
  });

  it('should call adapter on readConfiguration', () => {
    const adapter = TestBed.inject(
      RulebasedConfiguratorAdapter as Type<RulebasedConfiguratorAdapter>
    );

    let result;
    service
      .readConfiguration(CONFIG_ID, GROUP_ID, productConfiguration.owner)
      .subscribe((res) => (result = res));
    expect(result).toBe('readConfiguration' + CONFIG_ID);
    expect(adapter.readConfiguration).toHaveBeenCalledWith(
      CONFIG_ID,
      GROUP_ID,
      productConfiguration.owner
    );
  });

  it('should call adapter on updateConfiguration', () => {
    const adapter = TestBed.inject(
      RulebasedConfiguratorAdapter as Type<RulebasedConfiguratorAdapter>
    );

    let result;
    service
      .updateConfiguration(productConfiguration)
      .subscribe((res) => (result = res));
    expect(result).toBe('updateConfiguration' + CONFIG_ID);
    expect(adapter.updateConfiguration).toHaveBeenCalledWith(
      productConfiguration
    );
  });

  it('should call adapter on readConfigurationPrice', () => {
    const adapter = TestBed.inject(
      RulebasedConfiguratorAdapter as Type<RulebasedConfiguratorAdapter>
    );

    let result;
    service
      .readPriceSummary(productConfiguration)
      .subscribe((res) => (result = res));
    expect(result).toBe('readPriceSummary' + productConfiguration);
    expect(adapter.readPriceSummary).toHaveBeenCalledWith(productConfiguration);
  });

  it('should call adapter on getConfigurationOverview', () => {
    const adapter = TestBed.inject(
      RulebasedConfiguratorAdapter as Type<RulebasedConfiguratorAdapter>
    );

    let result;
    service
      .getConfigurationOverview(productConfiguration.configId)
      .subscribe((res) => (result = res));
    expect(result).toBe(
      'getConfigurationOverview' + productConfiguration.configId
    );
    expect(adapter.getConfigurationOverview).toHaveBeenCalledWith(
      productConfiguration.configId
    );
  });

  it('should call adapter on addToCart', () => {
    const adapter = TestBed.inject(
      RulebasedConfiguratorAdapter as Type<RulebasedConfiguratorAdapter>
    );

    const parameters: Configurator.AddToCartParameters = {
      userId: USER_ID,
      cartId: CART_ID,
      productCode: PRODUCT_CODE,
      quantity: QUANTITY,
      configId: CONFIG_ID,
      ownerKey: 'theKey',
    };
    let result;
    service.addToCart(parameters).subscribe((res) => (result = res));
    expect(adapter.addToCart).toHaveBeenCalledWith(parameters);
    expect(result).toBe('addToCart' + parameters);
  });
});
