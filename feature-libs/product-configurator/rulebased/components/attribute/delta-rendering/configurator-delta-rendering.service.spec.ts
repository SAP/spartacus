import { TestBed } from '@angular/core/testing';
import { ConfiguratorDeltaRenderingService } from './configurator-delta-rendering.service';
import { Type } from '@angular/core';
import { EMPTY, Observable, Subject, of } from 'rxjs';
import {
  Configurator,
  ConfiguratorCommonsService,
} from '@spartacus/product-configurator/rulebased';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import {
  CommonConfigurator,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';

const mockConfigTemplate: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration('c123'),
  pricingEnabled: true,
  priceSupplements: ConfiguratorTestUtils.createListOfAttributeSupplements(
    false,
    1,
    0,
    2,
    3
  ),
};

class MockConfiguratorRouterExtractorService {
  extractRouterData() {
    return of({ owner: mockConfigTemplate.owner });
  }
}

const configSubject = new Subject<Configurator.Configuration>();
class MockConfiguratorCommonsService {
  getConfiguration(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return owner === mockConfigTemplate.owner ? configSubject : EMPTY;
  }
}

describe('ConfiguratorDeltaRenderingService', () => {
  let classUnderTest: ConfiguratorDeltaRenderingService;
  // let mockConfig: Configurator.Configuration;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfiguratorDeltaRenderingService,
        {
          provide: ConfiguratorRouterExtractorService,
          useClass: MockConfiguratorRouterExtractorService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
      ],
    });

    classUnderTest = TestBed.inject(
      ConfiguratorDeltaRenderingService as Type<ConfiguratorDeltaRenderingService>
    );

    //mockConfig = mockConfigTemplate;
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('mergePriceIntoValue', () => {
    it('should create a new object combining value and price if onPriceChanged was called for this value before', () => {
      const valuePrice = { value: 100, currencyIso: 'USD' };
      classUnderTest['storeValuePrice']('valueKey', valuePrice);
      expect(
        classUnderTest['mergePriceIntoValue']({
          valueCode: '1223',
          name: 'valueKey',
        })
      ).toEqual({
        valueCode: '1223',
        name: 'valueKey',
        valuePrice: valuePrice,
      });
    });

    it('should return just the value if onPriceChanged was NOT called for this value before', () => {
      const valuePrice = { value: 100, currencyIso: 'USD' };
      classUnderTest['storeValuePrice']('anotherValueKey', valuePrice);
      expect(
        classUnderTest['mergePriceIntoValue']({
          valueCode: '1223',
          name: 'valueKey',
        })
      ).toEqual({
        valueCode: '1223',
        name: 'valueKey',
      });
    });
  });
});
