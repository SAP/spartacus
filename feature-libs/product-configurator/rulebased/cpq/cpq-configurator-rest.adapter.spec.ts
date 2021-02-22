import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CartModification } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { of } from 'rxjs';
import { Configurator } from '../core/model/configurator.model';
import { CpqConfiguratorOccService } from '../occ/cpq/cpq-configurator-occ.service';
import { CpqConfiguratorRestAdapter } from './cpq-configurator-rest.adapter';
import { CpqConfiguratorRestService } from './cpq-configurator-rest.service';

const productCode = 'CONF_LAPTOP';
const configId = '1234-56-7890';
const userId = 'Anony';
const documentId = '82736353';

const productConfiguration: Configurator.Configuration = {
  configId: configId,
  productCode: productCode,
};

const owner: CommonConfigurator.Owner = {
  type: CommonConfigurator.OwnerType.PRODUCT,
  id: productCode,
};

const groupId = '123';

const inputForUpdateConfiguration: Configurator.Configuration = {
  configId: configId,
  productCode: productCode,
  owner: owner,
};

const addToCartParams: Configurator.AddToCartParameters = {
  productCode: productCode,
  quantity: 1,
  configId: configId,
  owner: productConfiguration.owner,
  userId: userId,
  cartId: documentId,
};

const addToCartResponse: CartModification = {
  quantityAdded: 1,
  entry: { entryNumber: 3 },
  statusCode: '201',
};

const readConfigCartParams: CommonConfigurator.ReadConfigurationFromCartEntryParameters = {
  userId: userId,
  cartId: documentId,
  cartEntryNumber: '3',
  owner: {
    type: CommonConfigurator.OwnerType.PRODUCT,
    id: productCode,
  },
};

const asSpy = (f) => <jasmine.Spy>f;

describe('CpqConfiguratorRestAdapter', () => {
  let adapterUnderTest: CpqConfiguratorRestAdapter;
  let mockedRestService: CpqConfiguratorRestService;
  let mockedOccService: CpqConfiguratorOccService;

  beforeEach(() => {
    mockedRestService = jasmine.createSpyObj('mockedRestService', [
      'createConfiguration',
      'readConfiguration',
      'updateAttribute',
      'updateValueQuantity',
      'readConfigurationOverview',
    ]);
    mockedOccService = jasmine.createSpyObj('mockedOccService', [
      'addToCart',
      'getConfigIdForCartEntry',
    ]);

    asSpy(mockedRestService.createConfiguration).and.callFake(() => {
      return of(productConfiguration);
    });

    asSpy(mockedRestService.readConfiguration).and.callFake(() => {
      return of(productConfiguration);
    });

    asSpy(mockedRestService.updateAttribute).and.callFake(() => {
      return of(productConfiguration);
    });
    asSpy(mockedRestService.updateValueQuantity).and.callFake(() => {
      return of(productConfiguration);
    });
    asSpy(mockedRestService.readConfigurationOverview).and.callFake(() => {
      return of(productConfiguration);
    });
    asSpy(mockedOccService.addToCart).and.callFake(() => {
      return of(addToCartResponse);
    });
    asSpy(mockedOccService.getConfigIdForCartEntry).and.callFake(() => {
      return of(productConfiguration.configId);
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CpqConfiguratorRestAdapter,
        {
          provide: CpqConfiguratorRestService,
          useValue: mockedRestService,
        },
        {
          provide: CpqConfiguratorOccService,
          useValue: mockedOccService,
        },
      ],
    });

    adapterUnderTest = TestBed.inject(
      CpqConfiguratorRestAdapter as Type<CpqConfiguratorRestAdapter>
    );

    inputForUpdateConfiguration.updateType = Configurator.UpdateType.ATTRIBUTE;
  });

  it('should return correct configurator type', () => {
    expect(adapterUnderTest.getConfiguratorType()).toEqual(
      'CLOUDCPQCONFIGURATOR'
    );
  });

  it('should delegate create configuration to rest service and map owner', () => {
    adapterUnderTest.createConfiguration(owner).subscribe((config) => {
      expect(config.owner).toEqual(owner);
      expect(mockedRestService.createConfiguration).toHaveBeenCalledWith(
        productCode
      );
    });
  });

  it('should delegate read configuration to rest service and map owner', () => {
    adapterUnderTest
      .readConfiguration(productConfiguration.configId, groupId, owner)
      .subscribe((config) => {
        expect(config.owner).toEqual(owner);
        expect(mockedRestService.readConfiguration).toHaveBeenCalledWith(
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

  it('should delegate update configuration to rest service and map owner', () => {
    adapterUnderTest
      .updateConfiguration(inputForUpdateConfiguration)
      .subscribe((config) => {
        expect(config.owner).toEqual(owner);
        expect(mockedRestService.updateAttribute).toHaveBeenCalledWith(
          inputForUpdateConfiguration
        );
      });
  });

  it('should delegate update quantity configuration to rest service and map owner', () => {
    inputForUpdateConfiguration.updateType =
      Configurator.UpdateType.VALUE_QUANTITY;
    adapterUnderTest
      .updateConfiguration(inputForUpdateConfiguration)
      .subscribe((config) => {
        expect(config.owner).toEqual(owner);
        expect(mockedRestService.updateValueQuantity).toHaveBeenCalledWith(
          inputForUpdateConfiguration
        );
      });
  });

  it('should delegate read configuration overview to rest service', () => {
    adapterUnderTest
      .getConfigurationOverview(productConfiguration.configId)
      .subscribe((config) => {
        expect(config.configId).toEqual(configId);
        expect(
          mockedRestService.readConfigurationOverview
        ).toHaveBeenCalledWith(productConfiguration.configId);
      });
  });

  it('should delegate addToCart to OCC service', () => {
    adapterUnderTest.addToCart(addToCartParams).subscribe((response) => {
      expect(response).toEqual(addToCartResponse);
      expect(mockedOccService.addToCart).toHaveBeenCalledWith(addToCartParams);
    });
  });

  it('should delegate readConfigurationForCartEntry to both OCC and Rest service', () => {
    adapterUnderTest
      .readConfigurationForCartEntry(readConfigCartParams)
      .subscribe((response) => {
        expect(response).toBe(productConfiguration);
        expect(response.owner).toBe(readConfigCartParams.owner);
        expect(mockedOccService.getConfigIdForCartEntry).toHaveBeenCalledWith(
          readConfigCartParams
        );
        expect(mockedRestService.readConfiguration).toHaveBeenCalledWith(
          configId
        );
      });
  });
});
