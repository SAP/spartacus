import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { of } from 'rxjs';
import { Configurator } from '../core/model/configurator.model';
import { CpqConfiguratorRestAdapter } from './cpq-configurator-rest.adapter';
import { CpqConfiguratorRestService } from './cpq-configurator-rest.service';

const productCode = 'CONF_LAPTOP';
const configId = '1234-56-7890';

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

const asSpy = (f) => <jasmine.Spy>f;

describe('CpqConfiguratorRestAdapter', () => {
  let adapterUnderTest: CpqConfiguratorRestAdapter;
  let mockedRestService: CpqConfiguratorRestService;

  beforeEach(() => {
    mockedRestService = jasmine.createSpyObj('mockedRestService', [
      'createConfiguration',
      'readConfiguration',
      'updateAttribute',
      'updateValueQuantity',
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

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CpqConfiguratorRestAdapter,
        {
          provide: CpqConfiguratorRestService,
          useValue: mockedRestService,
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
});
