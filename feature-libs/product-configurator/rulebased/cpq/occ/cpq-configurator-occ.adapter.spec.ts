import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CartModification } from '@spartacus/cart/base/root';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { of } from 'rxjs';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { CpqConfiguratorOccAdapter } from './cpq-configurator-occ.adapter';
import { CpqConfiguratorOccService } from './cpq-configurator-occ.service';

const productCode = 'CONF_LAPTOP';
const configId = '1234-56-7890';
const userId = 'Anony';
const documentId = '82736353';

const owner: CommonConfigurator.Owner = {
  type: CommonConfigurator.OwnerType.PRODUCT,
  id: productCode,
  key: ConfiguratorModelUtils.getOwnerKey(
    CommonConfigurator.OwnerType.PRODUCT,
    productCode
  ),
  configuratorType: ConfiguratorType.CPQ,
};

const productConfiguration: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(configId, owner),
  productCode: productCode,
};

const groupId = '123';

const inputForUpdateConfiguration: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(configId, owner),
  productCode: productCode,
};

const addToCartParams: Configurator.AddToCartParameters = {
  productCode: productCode,
  quantity: 1,
  configId: configId,
  owner: owner,
  userId: userId,
  cartId: documentId,
};

const updateCartParams: Configurator.UpdateConfigurationForCartEntryParameters =
  {
    userId: userId,
    cartId: documentId,
    cartEntryNumber: '3',
    configuration: ConfiguratorTestUtils.createConfiguration(configId, owner),
  };

const cartResponse: CartModification = {
  quantityAdded: 1,
  entry: { entryNumber: 3 },
  statusCode: '201',
};

const readConfigCartParams: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
  {
    userId: userId,
    cartId: documentId,
    cartEntryNumber: '3',
    owner: owner,
  };

const readConfigOrderEntryParams: CommonConfigurator.ReadConfigurationFromOrderEntryParameters =
  {
    userId: userId,
    orderId: documentId,
    orderEntryNumber: '3',
    owner: owner,
  };

const asSpy = (f: any) => <jasmine.Spy>f;

describe('CpqConfiguratorOccAdapter', () => {
  let adapterUnderTest: CpqConfiguratorOccAdapter;
  let mockedOccService: CpqConfiguratorOccService;

  beforeEach(() => {
    mockedOccService = jasmine.createSpyObj('mockedOccService', [
      'addToCart',
      'getConfigIdForCartEntry',
      'getConfigIdForOrderEntry',
      'updateCartEntry',
      'createConfiguration',
      'readConfiguration',
      'updateAttribute',
      'updateValueQuantity',
      'readConfigurationOverview',
      'readConfigurationForCartEntry',
      'readConfigurationForOrderEntry',
      'readConfigurationForQuoteEntry',
    ]);

    asSpy(mockedOccService.createConfiguration).and.callFake(() => {
      return of(productConfiguration);
    });

    asSpy(mockedOccService.readConfiguration).and.callFake(() => {
      return of(productConfiguration);
    });

    asSpy(mockedOccService.updateAttribute).and.callFake(() => {
      return of(productConfiguration);
    });
    asSpy(mockedOccService.updateValueQuantity).and.callFake(() => {
      return of(productConfiguration);
    });
    asSpy(mockedOccService.readConfigurationOverview).and.callFake(() => {
      return of(productConfiguration);
    });
    asSpy(mockedOccService.addToCart).and.callFake(() => {
      return of(cartResponse);
    });
    asSpy(mockedOccService.getConfigIdForCartEntry).and.callFake(() => {
      return of(productConfiguration.configId);
    });
    asSpy(mockedOccService.getConfigIdForOrderEntry).and.callFake(() => {
      return of(productConfiguration.configId);
    });
    asSpy(mockedOccService.updateCartEntry).and.callFake(() => {
      return of(cartResponse);
    });
    asSpy(mockedOccService.getConfigIdForCartEntry).and.callFake(() => {
      return of(productConfiguration.configId);
    });
    asSpy(mockedOccService.readConfigurationForCartEntry).and.callFake(() => {
      return of(productConfiguration);
    });
    asSpy(mockedOccService.readConfigurationForOrderEntry).and.callFake(() => {
      return of(productConfiguration);
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CpqConfiguratorOccAdapter,
        {
          provide: CpqConfiguratorOccService,
          useValue: mockedOccService,
        },
      ],
    });

    adapterUnderTest = TestBed.inject(
      CpqConfiguratorOccAdapter as Type<CpqConfiguratorOccAdapter>
    );

    inputForUpdateConfiguration.updateType = Configurator.UpdateType.ATTRIBUTE;
  });

  it('should return correct configurator type', () => {
    expect(adapterUnderTest.getConfiguratorType()).toEqual(
      ConfiguratorType.CPQ
    );
  });

  it('should state that this adapter supports CPQ API calls over OCC', () => {
    expect(adapterUnderTest.supportsCpqOverOcc()).toBe(true);
  });

  it('should delegate create configuration to OCC service and map owner', () => {
    adapterUnderTest.createConfiguration(owner).subscribe((config) => {
      expect(config.owner).toEqual(owner);
      expect(mockedOccService.createConfiguration).toHaveBeenCalledWith(
        productCode
      );
    });
  });

  it('should delegate read configuration to OCC service and map owner', () => {
    adapterUnderTest
      .readConfiguration(productConfiguration.configId, groupId, owner)
      .subscribe((config) => {
        expect(config.owner).toEqual(owner);
        expect(mockedOccService.readConfiguration).toHaveBeenCalledWith(
          productConfiguration.configId,
          groupId
        );
      });
  });

  // this ensures that there is a dummy response until the API is implemented,
  // otherwise this leads to an NPE on the UI
  it('should always return same configuration for price summary', () => {
    adapterUnderTest
      .readPriceSummary(productConfiguration)
      .subscribe((config) => {
        expect(config).toBe(productConfiguration);
      });
  });

  it('should delegate update attribute to OCC service and map owner', () => {
    adapterUnderTest
      .updateConfiguration(inputForUpdateConfiguration)
      .subscribe((config) => {
        expect(config.owner).toEqual(owner);
        expect(mockedOccService.updateAttribute).toHaveBeenCalledWith(
          inputForUpdateConfiguration
        );
      });
  });

  it('should throw error in case overview is to be updated', () => {
    expect(() => adapterUnderTest.updateConfigurationOverview()).toThrowError();
  });

  it('should delegate update value quantity to OCC service and map owner', () => {
    inputForUpdateConfiguration.updateType =
      Configurator.UpdateType.VALUE_QUANTITY;
    adapterUnderTest
      .updateConfiguration(inputForUpdateConfiguration)
      .subscribe((config) => {
        expect(config.owner).toEqual(owner);
        expect(mockedOccService.updateValueQuantity).toHaveBeenCalledWith(
          inputForUpdateConfiguration
        );
      });
  });

  it('should delegate read configuration overview to OCC service', () => {
    adapterUnderTest
      .getConfigurationOverview(productConfiguration.configId)
      .subscribe((config) => {
        expect(config.configId).toEqual(configId);
        expect(mockedOccService.readConfigurationOverview).toHaveBeenCalledWith(
          productConfiguration.configId
        );
      });
  });

  it('should throw exception if variant search is attempted', () => {
    expect(() => adapterUnderTest.searchVariants()).toThrowError();
  });

  it('should delegate addToCart to OCC service', () => {
    adapterUnderTest.addToCart(addToCartParams).subscribe((response) => {
      expect(response).toEqual(cartResponse);
      expect(mockedOccService.addToCart).toHaveBeenCalledWith(addToCartParams);
    });
  });

  it('should delegate readConfigurationForCartEntry to OCC service', () => {
    adapterUnderTest
      .readConfigurationForCartEntry(readConfigCartParams)
      .subscribe((response) => {
        expect(response).toBe(productConfiguration);
        expect(response.owner).toBe(readConfigCartParams.owner);
        expect(
          mockedOccService.readConfigurationForCartEntry
        ).toHaveBeenCalledWith(readConfigCartParams);
      });
  });

  it('should delegate readConfigurationForOrderEntry to OCC service', () => {
    adapterUnderTest
      .readConfigurationForOrderEntry(readConfigOrderEntryParams)
      .subscribe((response) => {
        expect(response).toBe(productConfiguration);
        expect(response.owner).toBe(readConfigOrderEntryParams.owner);
        expect(
          mockedOccService.readConfigurationForOrderEntry
        ).toHaveBeenCalledWith(readConfigOrderEntryParams);
      });
  });

  it('should delegate updateCart to OCC service', () => {
    adapterUnderTest
      .updateConfigurationForCartEntry(updateCartParams)
      .subscribe((response) => {
        expect(response).toEqual(cartResponse);
        expect(mockedOccService.updateCartEntry).toHaveBeenCalledWith(
          updateCartParams
        );
      });
  });
});
