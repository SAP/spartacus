import { TestBed } from '@angular/core/testing';
import { ConfiguratorDeltaRenderingService } from './configurator-delta-rendering.service';
import { Type } from '@angular/core';

describe('ConfiguratorDeltaRenderingService', () => {
  let classUnderTest: ConfiguratorDeltaRenderingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    classUnderTest = TestBed.inject(
      ConfiguratorDeltaRenderingService as Type<ConfiguratorDeltaRenderingService>
    );
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('mergePriceIntoValue', () => {
    it('should create a new object combining value and price if onPriceChanged was called for this value before', () => {
      const valuePrice = { value: 100, currencyIso: 'USD' };
      classUnderTest.storeValuePrice('valueKey', valuePrice);
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
      classUnderTest.storeValuePrice('anotherValueKey', valuePrice);
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
