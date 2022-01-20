import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { of } from 'rxjs';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';
import { ConfiguratorTextfieldAdapter } from './configurator-textfield.adapter';
import { ConfiguratorTextfieldConnector } from './configurator-textfield.connector';

import createSpy = jasmine.createSpy;

const USER_ID = 'theUser';
const CART_ID = '98876';

class MockConfiguratorTextfieldAdapter implements ConfiguratorTextfieldAdapter {
  readConfiguration = createSpy().and.callFake((configId: string) =>
    of('readConfiguration' + configId)
  );

  createConfiguration = createSpy().and.callFake((productCode: string) =>
    of('createConfiguration' + productCode)
  );

  addToCart = createSpy().and.callFake(
    (params: ConfiguratorTextfield.AddToCartParameters) =>
      of('addToCart' + params)
  );

  updateConfigurationForCartEntry = createSpy().and.callFake(
    (params: ConfiguratorTextfield.UpdateCartEntryParameters) =>
      of('updateConfigurationForCartEntry' + params)
  );

  readConfigurationForCartEntry = createSpy().and.callFake(
    (params: CommonConfigurator.ReadConfigurationFromCartEntryParameters) =>
      of('readConfigurationForCartEntry' + params)
  );
  readConfigurationForOrderEntry = createSpy().and.callFake(
    (params: CommonConfigurator.ReadConfigurationFromOrderEntryParameters) =>
      of('readConfigurationForOrderEntry' + params)
  );
}

describe('ConfiguratorTextfieldConnector', () => {
  let service: ConfiguratorTextfieldConnector;
  const PRODUCT_CODE = 'CONF_LAPTOP';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfiguratorTextfieldAdapter,
          useClass: MockConfiguratorTextfieldAdapter,
        },
        {
          provide: ConfiguratorTextfieldConnector,
          useClass: ConfiguratorTextfieldConnector,
        },
      ],
    });

    service = TestBed.inject(
      ConfiguratorTextfieldConnector as Type<ConfiguratorTextfieldConnector>
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call adapter on createConfiguration', () => {
    const adapter = TestBed.inject(
      ConfiguratorTextfieldAdapter as Type<ConfiguratorTextfieldAdapter>
    );

    let result;
    const owner = ConfiguratorModelUtils.createInitialOwner();
    service
      .createConfiguration(PRODUCT_CODE, owner)
      .subscribe((res) => (result = res));
    expect(result).toBe('createConfiguration' + PRODUCT_CODE);
    expect(adapter.createConfiguration).toHaveBeenCalledWith(
      PRODUCT_CODE,
      owner
    );
  });

  it('should call adapter on readConfigurationForCartEntry', () => {
    const adapter = TestBed.inject(
      ConfiguratorTextfieldAdapter as Type<ConfiguratorTextfieldAdapter>
    );

    const params: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
      {
        owner: ConfiguratorModelUtils.createInitialOwner(),
      };
    let result;
    service
      .readConfigurationForCartEntry(params)
      .subscribe((res) => (result = res));
    expect(result).toBe('readConfigurationForCartEntry' + params);
    expect(adapter.readConfigurationForCartEntry).toHaveBeenCalledWith(params);
  });

  it('should call adapter on readConfigurationForOrderEntry', () => {
    const adapter = TestBed.inject(
      ConfiguratorTextfieldAdapter as Type<ConfiguratorTextfieldAdapter>
    );

    const params: CommonConfigurator.ReadConfigurationFromOrderEntryParameters =
      {
        owner: ConfiguratorModelUtils.createInitialOwner(),
      };
    let result;
    service
      .readConfigurationForOrderEntry(params)
      .subscribe((res) => (result = res));
    expect(result).toBe('readConfigurationForOrderEntry' + params);
    expect(adapter.readConfigurationForOrderEntry).toHaveBeenCalledWith(params);
  });

  it('should call adapter on addToCart', () => {
    const adapter = TestBed.inject(
      ConfiguratorTextfieldAdapter as Type<ConfiguratorTextfieldAdapter>
    );

    const parameters: ConfiguratorTextfield.AddToCartParameters = {
      userId: USER_ID,
      cartId: CART_ID,
      productCode: PRODUCT_CODE,
      quantity: 1,
    };
    let result;
    service.addToCart(parameters).subscribe((res) => (result = res));
    expect(adapter.addToCart).toHaveBeenCalledWith(parameters);
    expect(result).toBe('addToCart' + parameters);
  });

  it('should call adapter on updateCartEntry', () => {
    const adapter = TestBed.inject(
      ConfiguratorTextfieldAdapter as Type<ConfiguratorTextfieldAdapter>
    );

    const parameters: ConfiguratorTextfield.UpdateCartEntryParameters = {
      userId: USER_ID,
      cartId: CART_ID,
      cartEntryNumber: '1',
    };
    let result;
    service
      .updateConfigurationForCartEntry(parameters)
      .subscribe((res) => (result = res));
    expect(adapter.updateConfigurationForCartEntry).toHaveBeenCalledWith(
      parameters
    );
    expect(result).toBe('updateConfigurationForCartEntry' + parameters);
  });
});
