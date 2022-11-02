import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CartModification } from '@spartacus/cart/base/root';
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

const configuration: ConfiguratorTextfield.Configuration = {
  owner: ConfiguratorModelUtils.createInitialOwner(),
  configurationInfos: [],
};
const cartModification: CartModification = {};

class MockConfiguratorTextfieldAdapter implements ConfiguratorTextfieldAdapter {
  readConfiguration = createSpy().and.callFake(() => of(configuration));

  createConfiguration = createSpy().and.callFake(() => of(configuration));

  addToCart = createSpy().and.callFake(() => of(cartModification));

  updateConfigurationForCartEntry = createSpy().and.callFake(() =>
    of(cartModification)
  );

  readConfigurationForCartEntry = createSpy().and.callFake(() =>
    of(configuration)
  );
  readConfigurationForOrderEntry = createSpy().and.callFake(() =>
    of(configuration)
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

    const owner = ConfiguratorModelUtils.createInitialOwner();
    service.createConfiguration(PRODUCT_CODE, owner).subscribe((res) => {
      expect(res).toBe(configuration);
    });

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

    service
      .readConfigurationForCartEntry(params)
      .subscribe((res) => expect(res).toBe(configuration));

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

    service
      .readConfigurationForOrderEntry(params)
      .subscribe((res) => expect(res).toBe(configuration));

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

    service
      .addToCart(parameters)
      .subscribe((res) => expect(res).toBe(cartModification));
    expect(adapter.addToCart).toHaveBeenCalledWith(parameters);
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

    service
      .updateConfigurationForCartEntry(parameters)
      .subscribe((res) => expect(res).toBe(cartModification));
    expect(adapter.updateConfigurationForCartEntry).toHaveBeenCalledWith(
      parameters
    );
  });
});
