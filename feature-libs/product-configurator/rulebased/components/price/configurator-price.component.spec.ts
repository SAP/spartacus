import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorPriceComponent } from './configurator-price.component';
import { Configurator } from '@spartacus/product-configurator/rulebased';

@Pipe({
  name: 'cxNumeric',
})
class MockNumericPipe implements PipeTransform {
  transform(): any {}
}

function getFormattedValue(value: number | undefined): string {
  if (value !== undefined) {
    if (value > 0) {
      return '$' + value;
    } else if (value < 0) {
      return '-$' + Math.abs(value);
    }
  }
  return undefined;
}

function createPrice(price: number | undefined): Configurator.PriceDetails {
  if (price !== undefined) {
    return {
      currencyIso: '$',
      formattedValue: getFormattedValue(price),
      value: price,
    };
  }
  return undefined;
}

const createFormula = (
  quantity: number | undefined,
  price: number | undefined,
  priceTotal: number | undefined,
  isLightedUp = false,
  isOverview = false
): any => ({
  quantity: quantity,
  price: createPrice(price),
  priceTotal: createPrice(priceTotal),
  isLightedUp: isLightedUp,
  isOverview: isOverview,
});

describe('ConfiguratorPriceComponent', () => {
  let component: ConfiguratorPriceComponent;
  let fixture: ComponentFixture<ConfiguratorPriceComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguratorPriceComponent, MockNumericPipe],
        imports: [I18nTestingModule],
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
    describe('Display quantity', () => {
      it('should be defined: quantity equal to or greater than 1', () => {
        component.formula = createFormula(5, 0, 0, true, true);
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-greyed-out'
        );
        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-quantity-price'
        );
      });
    });

    describe('Display value price', () => {
      it('should return empty string', () => {
        component.formula = createFormula(0, undefined, undefined);
        expect(component.price).toEqual('');
      });

      it('should return empty string when value price is negative and formatted value is undefined', () => {
        component.formula = createFormula(0, -10, undefined);
        component.formula.price.formattedValue = undefined;
        expect(component.price).toEqual('');
      });

      it('should return total price', () => {
        component.formula = createFormula(0, 0, 10);
        expect(component.price).toEqual('+$10');
      });

      it('should not display value price', () => {
        component.formula = createFormula(0, 0, 0);
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-price.cx-greyed-out'
        );
      });

      it("should display 'Selected' when value price equals 'zero' and isLightedUp equals 'true'", () => {
        component.formula = createFormula(0, 0, 0, true);
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-price'
        );

        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-price',
          'configurator.price.selectedItem'
        );
      });

      it('should display greyed out value price when it is greater than zero', () => {
        component.formula = createFormula(0, 10, undefined);
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-price.cx-greyed-out'
        );
        expect(component.price).toEqual('+$10');
      });

      it('should display value price when it is greater than zero', () => {
        component.formula = createFormula(0, 10, undefined, true);
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-price'
        );
        expect(component.price).toEqual('+$10');
      });

      it('should display selected negative value price', () => {
        component.formula = createFormula(0, -10, undefined, true);
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-price'
        );

        expect(component.price).toEqual('-$10');
      });

      it('should display selected positive value price', () => {
        component.formula = createFormula(0, -10, undefined);
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-price.cx-greyed-out'
        );

        expect(component.price).toEqual('-$10');
      });
    });

    describe('Display total price', () => {
      it('should be defined: a positive total value price is given', () => {
        component.formula = createFormula(0, 0, 150, true);
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-price'
        );
        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-quantity-price'
        );
        expect(component.priceTotal).toEqual('+$150');
      });

      it('should be defined: a negative total value price is given', () => {
        component.formula = createFormula(0, undefined, -150, true);
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-price'
        );
        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-quantity-price'
        );
        expect(component.priceTotal).toEqual('-$150');
      });
      it('should be defined: no total value price is given and a String of length 0 should be returned', () => {
        component.formula = createFormula(0, undefined, undefined, true);
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-price'
        );
        expect(component.priceTotal).toEqual('');
      });
    });

    describe('Component rendering', () => {
      it('should be defined: complete price formula', () => {
        component.formula = createFormula(2, 10, 20);
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-quantity-price'
        );

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-price-total'
        );
        const qty = component.formula.quantity;
        if (qty) {
          expect(component.quantityWithPrice(qty.toString())).toEqual(
            '2x($10)'
          );
        } else {
          fail();
        }
        expect(component.priceTotal).toEqual('+$20');
      });

      it('should be defined: value is greyed out selected', () => {
        component.formula = createFormula(0, 0, 0, true);
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-price'
        );
        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-price',
          'configurator.price.selectedItem'
        );
      });

      it('should be defined: value is not lightedUp since lightedUp is undefined', () => {
        component.formula = createFormula(0, 0, 0, undefined);
        expect(component.isPriceLightedUp()).toEqual(false);
      });

      it('should be defined: price is greyed out', () => {
        component.formula = createFormula(0, 10, 10);
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-greyed-out'
        );
        expect(component.priceTotal).toEqual('+$10');
      });
    });
  });

  describe('isPriceLightedUp', () => {
    it('should return false when undefined', () => {
      component.formula = createFormula(0, 0, 150);
      component.formula.isLightedUp = undefined;
      expect(component.isPriceLightedUp()).toBe(false);
    });

    it('should return false', () => {
      component.formula = createFormula(0, 0, 150);
      expect(component.isPriceLightedUp()).toBe(false);
    });

    it('should return true', () => {
      component.formula = createFormula(0, 0, 150, true);
      expect(component.isPriceLightedUp()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it("should contain div element with 'aria-label' attribute that defines an accessible name to label the current element", () => {
      component.formula = createFormula(0, 0, 150, true);
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        undefined,
        0,
        'aria-label',
        'configurator.a11y.valueSurcharge'
      );
    });

    it("should contain div element with class name 'cx-quantity-price' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      component.formula = createFormula(2, 10, 20);
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-quantity-price',
        0,
        'aria-label',
        'configurator.a11y.valueSurcharge'
      );
    });
  });
});
