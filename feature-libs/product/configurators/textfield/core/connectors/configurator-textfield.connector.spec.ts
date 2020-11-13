import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GenericConfigurator } from '@spartacus/product/configurators/common';
import { of } from 'rxjs';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';
import { ConfiguratorTextfieldAdapter } from './configurator-textfield.adapter';
import { ConfiguratorTextfieldConnector } from './configurator-textfield.connector';

import createSpy = jasmine.createSpy;

const USER_ID = 'theUser';
const CART_ID = '98876';

class MockConfiguratorTextfieldAdapter implements ConfiguratorTextfieldAdapter {
  readConfiguration = createSpy().and.callFake((configId) =>
    of('readConfiguration' + configId)
  );

  updateConfiguration = createSpy().and.callFake((configuration) =>
    of('updateConfiguration' + configuration.configId)
  );

  createConfiguration = createSpy().and.callFake((productCode) =>
    of('createConfiguration' + productCode)
  );

  addToCart = createSpy().and.callFake((params) => of('addToCart' + params));

  updateConfigurationForCartEntry = createSpy().and.callFake((params) =>
    of('updateConfigurationForCartEntry' + params)
  );

  readConfigurationForCartEntry = createSpy().and.callFake((params) =>
    of('readConfigurationForCartEntry' + params)
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
    service
      .createConfiguration(PRODUCT_CODE, null)
      .subscribe((res) => (result = res));
    expect(result).toBe('createConfiguration' + PRODUCT_CODE);
    expect(adapter.createConfiguration).toHaveBeenCalledWith(
      PRODUCT_CODE,
      null
    );
  });

  it('should call adapter on readConfigurationForCartEntry', () => {
    const adapter = TestBed.inject(
      ConfiguratorTextfieldAdapter as Type<ConfiguratorTextfieldAdapter>
    );

    const params: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {};
    let result;
    service
      .readConfigurationForCartEntry(params)
      .subscribe((res) => (result = res));
    expect(result).toBe('readConfigurationForCartEntry' + params);
    expect(adapter.readConfigurationForCartEntry).toHaveBeenCalledWith(params);
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
