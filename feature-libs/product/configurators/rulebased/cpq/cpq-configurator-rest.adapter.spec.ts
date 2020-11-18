import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CommonConfigurator } from '@spartacus/product/configurators/common';
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

describe('CpqConfiguratorRestAdapter', () => {
  let adapterUnderTest: CpqConfiguratorRestAdapter;
  const mockedRestService = {
    createConfiguration: jasmine.createSpy().and.callFake(() => {
      return of(productConfiguration);
    }),
  };

  beforeEach(() => {
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
});
