import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorPriceComponent } from './configurator-price.component';

@Pipe({
  name: 'cxNumeric',
})
class MockNumericPipe implements PipeTransform {
  transform(): any {}
}

const createTestData = (
  quantity: number,
  price: number,
  priceTotal: number,
  isLightedUp = false,
  isOverview = false
): any => ({
  quantity: quantity,
  price: {
    currencyIso: '$',
    formattedValue: price ? '$' + price : '',
    value: price,
  },
  priceTotal: {
    currencyIso: '$',
    formattedValue: priceTotal ? '$' + priceTotal : '',
    value: priceTotal,
  },
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
    it('should be defined: quantity equal to or greater than 1', () => {
      component.formula = createTestData(5, 0, 0, true, true);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-price'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-quantity-price'
      );
    });
    it('should be defined: value price greater than zero', () => {
      component.formula = {
        quantity: 0,
        price: {
          currencyIso: '$',
          formattedValue: '$10',
          value: 10,
        },
        priceTotal: undefined,
        isLightedUp: true,
      };
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

      expect(component.price).toEqual('+ $10');
    });

    it('should be defined: value price greater than zero and value is selected', () => {
      component.formula = createTestData(0, 10, 10, true);
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

      expect(component.price).toEqual('+ $10');
    });

    it('should be defined: value price greater than zero and value is not selected', () => {
      component.formula = createTestData(0, 10, 10);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-price'
      );

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-greyed-out'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-quantity-price'
      );
      expect(component.price).toEqual('+ $10');
    });

    it('should be defined: value price total greater than zero', () => {
      component.formula = createTestData(0, 0, 150, true);
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
      expect(component.priceTotal).toEqual('+ $150');
    });

    it('should be defined: complete price formula', () => {
      component.formula = createTestData(2, 10, 20);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-price'
      );
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
        expect(component.quantityWithPrice(qty.toString())).toEqual('2x($10)');
      } else {
        fail();
      }
      expect(component.priceTotal).toEqual('+ $20');
    });
  });

  describe('price is lighted up or greyed out', () => {
    it('should be greyed out', () => {
      component.formula = createTestData(0, 10, 10);
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-greyed-out'
      );
      expect(component.priceTotal).toEqual('+ $10');
    });

    it('should be lighted up', () => {
      component.formula = createTestData(0, 10, 10, true);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-greyed-out'
      );
      expect(component.priceTotal).toEqual('+ $10');
    });
  });

  describe('Accessibility', () => {
    it("should contain div element with 'aria-label' attribute that defines an accessible name to label the current element", () => {
      component.formula = createTestData(0, 0, 150, true);
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
      component.formula = createTestData(2, 10, 20);
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
