import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorPriceComponent } from './configurator-price.component';
import { CommonConfiguratorTestUtilsService } from '@spartacus/product-configurator';

const createTestData = (
  quantity: number,
  valuePrice: number,
  valuePriceTotal: number,
  isLightedUp = false
): any => ({
  quantity: quantity,
  valuePrice: {
    currencyIso: '$',
    formattedValue: valuePrice ? '$' + valuePrice : '',
    value: valuePrice,
  },
  valuePriceTotal: {
    currencyIso: '$',
    formattedValue: valuePrice ? '$' + valuePrice : '',
    value: valuePriceTotal,
  },
  isLightedUp: isLightedUp,
});

describe('ConfiguratorPriceComponent', () => {
  let component: ConfiguratorPriceComponent;
  let fixture: ComponentFixture<ConfiguratorPriceComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguratorPriceComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorPriceComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('formula data is defined', () => {
    it('should not be defined', () => {
      component.formula = undefined;
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-price-calculation'
      );
    });

    it('should be defined: zero quantity', () => {
      component.formula = {
        quantity: 0,
        valuePrice: undefined,
        valuePriceTotal: undefined,
        isLightedUp: undefined,
      };
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-price-calculation'
      );
    });

    it('should be defined: quantity equal to or greater than 1', () => {
      component.formula = {
        quantity: 1,
        valuePrice: undefined,
        valuePriceTotal: undefined,
        isLightedUp: true,
      };
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-price-calculation'
      );
    });

    it('should be defined: zero value price', () => {
      component.formula = {
        quantity: undefined,
        valuePrice: {
          value: 0,
        },
        valuePriceTotal: undefined,
        isLightedUp: false,
      };
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-price-calculation'
      );
    });

    it('should be defined: value price greater than zero', () => {
      component.formula = {
        quantity: undefined,
        valuePrice: {
          value: 10,
        },
        valuePriceTotal: undefined,
        isLightedUp: true,
      };
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-price-calculation'
      );
    });

    it('should be defined: zero value price total', () => {
      component.formula = {
        quantity: undefined,
        valuePrice: undefined,
        valuePriceTotal: {
          value: 0,
        },
        isLightedUp: false,
      };
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-price-calculation'
      );
    });

    it('should be defined: value price total greater zero', () => {
      component.formula = {
        quantity: undefined,
        valuePrice: undefined,
        valuePriceTotal: {
          value: 20,
        },
        isLightedUp: true,
      };
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-price-calculation'
      );
    });

    it('should be defined: quantity, value price and value price total', () => {
      component.formula = createTestData(2, 10, 20);
      component.formula = {
        quantity: 2,
        valuePrice: {
          value: 10,
        },
        valuePriceTotal: {
          value: 20,
        },
        isLightedUp: true,
      };
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-price-calculation'
      );
    });
  });

  describe('price is lighted up or greyed out', () => {
    it('should not be greyed out', () => {
      component.formula = {
        quantity: undefined,
        valuePrice: undefined,
        valuePriceTotal: undefined,
        isLightedUp: undefined,
      };
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-greyed-out'
      );
    });

    it('should be greyed out', () => {
      component.formula = createTestData(0, 10, 10);
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-greyed-out'
      );
    });

    it('should be lighted up', () => {
      component.formula = createTestData(0, 10, 10, true);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-greyed-out'
      );
    });
  });

  describe('price calculation', () => {
    it('should only contain quantity in price formula', () => {
      component.formula = createTestData(5, 0, 0, true);
      fixture.detectChanges();

      const result = component.getPriceCalculation();
      expect(result).toEqual('5');
    });

    it('should only contain total value price in price formula', () => {
      component.formula = createTestData(0, 0, 100, true);
      fixture.detectChanges();

      const result = component.getPriceCalculation();
      expect(result).toEqual(component.formula.valuePriceTotal.formattedValue);
    });

    it('should only contain value price in price formula', () => {
      component.formula = createTestData(0, 10, 0, true);
      fixture.detectChanges();

      const result = component.getPriceCalculation();
      expect(result).toEqual(component.formula.valuePrice.formattedValue);
    });

    it('should contain complete price formula', () => {
      component.formula = createTestData(5, 10, 50, true);
      fixture.detectChanges();

      const result = component.getPriceCalculation();
      const priceFormula =
        component.formula.quantity +
        ' x ' +
        component.formula.valuePrice.formattedValue +
        ' = ' +
        component.formula.valuePriceTotal.formattedValue;
      expect(result).toEqual(priceFormula);
    });
  });
});
