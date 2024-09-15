import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EMPTY, Observable, Subject, of, skip } from 'rxjs';
import { ConfiguratorAttributePriceChangeService } from './configurator-attribute-price-change.service';

import {
  CommonConfigurator,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { ConfiguratorCommonsService } from '../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';

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

describe('ConfiguratorAttributePriceChangeService', () => {
  let classUnderTest: ConfiguratorAttributePriceChangeService;
  let mockConfig: Configurator.Configuration;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfiguratorAttributePriceChangeService,
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
      ConfiguratorAttributePriceChangeService as Type<ConfiguratorAttributePriceChangeService>
    );

    mockConfig = structuredClone(mockConfigTemplate);
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('getChangedPrices', () => {
    it('should emit always true for the initial rendering/call', () => {
      let emitCounter = 0;
      classUnderTest.getChangedPrices(undefined).subscribe((priceChanged) => {
        expect(priceChanged).toEqual({});
        emitCounter++;
      });
      mockConfig.priceSupplements = undefined;
      configSubject.next(mockConfig);
      expect(emitCounter).toBe(1);
    });

    // happens when navigating from overview back to config page
    it('should detect price changes during initial rendering/call if supplements are present', () => {
      let emitCounter = 0;
      classUnderTest
        .getChangedPrices('group1@attribute_1_1')
        .subscribe((priceChanged) => {
          expect(priceChanged['value_1_1']).toBeDefined();
          expect(priceChanged['value_1_2']).toBeDefined();
          expect(priceChanged['value_1_3']).toBeDefined();
          emitCounter++;
        });
      configSubject.next(mockConfig);
      expect(emitCounter).toBe(1);
    });

    describe('after initial rendering/call', () => {
      function simulateFirstCall() {
        // simulating initial call without price supplements
        const configOnly = structuredClone(mockConfig);
        configOnly.priceSupplements = undefined;
        configSubject.next(configOnly);
      }

      it('should not emit, if config has no price supplements', () => {
        classUnderTest
          .getChangedPrices(undefined)
          .pipe(skip(1))
          .subscribe(() => {
            fail('priceChanged observable should not emit!');
          });
        simulateFirstCall();
        mockConfig.priceSupplements = undefined;
        configSubject.next(mockConfig);
      });

      it('should not emit, if config has no matching price supplements', () => {
        classUnderTest
          .getChangedPrices('otherAttrKey')
          .pipe(skip(1))
          .subscribe(() => {
            fail('priceChanged observable should not emit!');
          });
        simulateFirstCall();
        configSubject.next(mockConfig);
      });

      it('should emit true and store matching value prices, if config has matching price supplements', () => {
        let emitCounter = 0;
        classUnderTest
          .getChangedPrices('group1@attribute_1_1')
          .pipe(skip(1))
          .subscribe((priceChanged) => {
            expect(priceChanged['value_1_1']).toBeDefined();
            expect(priceChanged['value_1_2']).toBeDefined();
            expect(priceChanged['value_1_3']).toBeDefined();
            emitCounter++;
          });
        simulateFirstCall();
        configSubject.next(mockConfig);
        expect(emitCounter).toBe(1);
      });

      it('should not emit again if prices are not changed', () => {
        classUnderTest['lastAttributeSupplement'] =
          mockConfig.priceSupplements?.[0];
        classUnderTest
          .getChangedPrices('group1@attribute_1_1')
          .pipe(skip(1))
          .subscribe(() => {
            fail('priceChanged observable should not emit!');
          });
        simulateFirstCall();
        configSubject.next(mockConfig);
      });
    });
  });
});
