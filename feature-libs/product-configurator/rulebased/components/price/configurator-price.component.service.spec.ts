import { TestBed } from '@angular/core/testing';
import { ConfiguratorPriceService } from './configurator-price.component.service';
import { DirectionMode, DirectionService } from '@spartacus/storefront';

let direction: DirectionMode;
class MockDirectionService {
  getDirection(): DirectionMode {
    return direction;
  }
}

describe('ConfiguratorPriceService', () => {
  let classUnderTest: ConfiguratorPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DirectionService,
          useClass: MockDirectionService,
        },
      ],
    });
    direction = DirectionMode.LTR;
    classUnderTest = TestBed.inject(ConfiguratorPriceService);
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });

  describe('compile formatted value', () => {
    it('should not add sign to zero value', () => {
      expect(classUnderTest.compileFormattedValue(0, '')).toBe('');
    });

    it('should return empty string if formatted value is undefined', () => {
      expect(classUnderTest.compileFormattedValue(0, undefined)).toBe('');
    });

    it('should add sign before positive formatted value when LTR direction', () => {
      direction = DirectionMode.LTR;
      expect(classUnderTest.compileFormattedValue(10, '$10')).toBe('+$10');
    });

    it('should add sign before negative formatted value when LTR direction', () => {
      direction = DirectionMode.LTR;
      expect(classUnderTest.compileFormattedValue(-10, '-$10')).toBe('-$10');
    });

    it('should add sign after positive formatted value when RTL direction', () => {
      direction = DirectionMode.RTL;
      expect(classUnderTest.compileFormattedValue(10, '$10')).toBe('$10+');
    });

    it('should add sign after negative formatted value when RTL direction', () => {
      direction = DirectionMode.RTL;
      expect(classUnderTest.compileFormattedValue(-10, '-$10')).toBe('$10-');
    });
  });
});
