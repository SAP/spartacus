import { Pipe, PipeTransform, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { DirectionMode, DirectionService } from '@spartacus/storefront';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorPriceComponent } from './configurator-price.component';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';

@Pipe({
  name: 'cxNumeric',
})
class MockNumericPipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

class MockDirectionService {
  getDirection(): void {}
}

const createFormula = (
  quantity: number | undefined,
  price: number | undefined,
  priceTotal: number | undefined,
  isLightedUp = false,
  isOverview = false
): any => ({
  quantity: quantity,
  price: ConfiguratorTestUtils.createPrice(price),
  priceTotal: ConfiguratorTestUtils.createPrice(priceTotal),
  isLightedUp: isLightedUp,
  isOverview: isOverview,
});

describe('ConfiguratorPriceComponent', () => {
  let component: ConfiguratorPriceComponent;
  let fixture: ComponentFixture<ConfiguratorPriceComponent>;
  let htmlElem: HTMLElement;
  let directionService: DirectionService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguratorPriceComponent, MockNumericPipe],
        imports: [I18nTestingModule],
        providers: [
          {
            provide: DirectionService,
            useClass: MockDirectionService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorPriceComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    directionService = TestBed.inject(
      DirectionService as Type<DirectionService>
    );
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Display quantity', () => {
    beforeEach(() => {
      spyOn(directionService, 'getDirection').and.returnValue(
        DirectionMode.LTR
      );
    });

    it('should display a complete price formula', () => {
      component.formula = createFormula(2, 10, 20);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-quantity-price',
        '2x($10)'
      );

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-price-total',
        '+$20'
      );

      const qty = component.formula.quantity;
      expect(qty).toBeDefined();
      expect(component.quantityWithPrice(String(qty))).toEqual('2x($10)');
      expect(component.priceTotal).toEqual('+$20');
    });
  });

  describe('Display value price', () => {
    beforeEach(() => {
      spyOn(directionService, 'getDirection').and.returnValue(
        DirectionMode.LTR
      );
    });

    it('should return empty string', () => {
      component.formula = createFormula(0, undefined, undefined);
      expect(component.price).toEqual('');
    });

    it('should return empty string when value price is negative and formatted value is undefined', () => {
      component.formula = createFormula(0, -10, undefined);
      if (component.formula.price) {
        component.formula.price.formattedValue = undefined;
      }
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

    it('should display lighted up value price when it is greater than zero', () => {
      component.formula = createFormula(0, 10, undefined, true);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-price',
        '+$10'
      );
      expect(component.price).toEqual('+$10');
    });

    it('should display selected negative value price', () => {
      component.formula = createFormula(0, -10, undefined, true);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-price',
        '-$10'
      );
      expect(component.price).toEqual('-$10');
    });

    it('should display selected positive value price', () => {
      component.formula = createFormula(0, -10, undefined);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-price',
        '-$10'
      );

      expect(component.price).toEqual('-$10');
    });
  });

  describe('Display total price', () => {
    beforeEach(() => {
      spyOn(directionService, 'getDirection').and.returnValue(
        DirectionMode.LTR
      );
    });

    it('should display zero total value price', () => {
      component.formula = createFormula(0, undefined, 0, true);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-quantity-price'
      );

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-price-total'
      );

      expect(component.priceTotal).toEqual('');
    });

    it('should display a positive total value price', () => {
      component.formula = createFormula(0, undefined, 150, true);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-price',
        '+$150'
      );
      expect(component.priceTotal).toEqual('+$150');
    });

    it('should display a negative total value price', () => {
      component.formula = createFormula(0, undefined, -150, true);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-price',
        '-$150'
      );
      expect(component.priceTotal).toEqual('-$150');
    });

    it('should not display total value price', () => {
      component.formula = createFormula(0, undefined, undefined, true);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-price'
      );
      expect(component.priceTotal).toEqual('');
    });
  });

  describe('isPriceLightedUp', () => {
    beforeEach(() => {
      spyOn(directionService, 'getDirection').and.returnValue(
        DirectionMode.LTR
      );
    });

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

  describe('LTR direction', () => {
    beforeEach(() => {
      spyOn(directionService, 'getDirection').and.returnValue(
        DirectionMode.LTR
      );
    });

    it("should return 'false' for isRTLDirection", () => {
      expect(component['isRTLDirection']()).toBe(false);
    });

    it('should positive price', () => {
      component.formula = createFormula(0, 10, undefined);
      fixture.detectChanges();
      expect(component.price).toEqual('+$10');
    });

    it('should negative price', () => {
      component.formula = createFormula(0, -10, undefined);
      fixture.detectChanges();
      expect(component.price).toEqual('-$10');
    });

    it('should positive total price', () => {
      component.formula = createFormula(0, undefined, 100);
      fixture.detectChanges();
      expect(component.priceTotal).toEqual('+$100');
    });

    it('should negative total price', () => {
      component.formula = createFormula(0, undefined, -100);
      fixture.detectChanges();
      expect(component.priceTotal).toEqual('-$100');
    });
  });

  describe('RTL direction', () => {
    beforeEach(() => {
      spyOn(directionService, 'getDirection').and.returnValue(
        DirectionMode.RTL
      );
    });

    it("should return 'true' for isRTLDirection", () => {
      expect(component['isRTLDirection']()).toBe(true);
    });

    it('should return empty string when value price is negative and formatted value is undefined', () => {
      component.formula = createFormula(0, -10, undefined);
      if (component.formula.price) {
        component.formula.price.formattedValue = undefined;
      }
      expect(component.price).toEqual('');
    });

    it('should positive price', () => {
      component.formula = createFormula(0, 10, undefined);
      fixture.detectChanges();
      expect(component.price).toEqual('$10+');
    });

    it('should negative price', () => {
      component.formula = createFormula(0, -10, undefined);
      fixture.detectChanges();
      expect(component.price).toEqual('$10-');
    });

    it('should return empty string when total price is negative and formatted value is undefined', () => {
      component.formula = createFormula(0, undefined, -100);
      if (component.formula.priceTotal) {
        component.formula.priceTotal.formattedValue = undefined;
      }
      expect(component.priceTotal).toEqual('');
    });

    it('should positive total price', () => {
      component.formula = createFormula(0, undefined, 100);
      fixture.detectChanges();
      expect(component.priceTotal).toEqual('$100+');
    });

    it('should negative total price', () => {
      component.formula = createFormula(0, undefined, -100);
      fixture.detectChanges();
      expect(component.priceTotal).toEqual('$100-');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      spyOn(directionService, 'getDirection').and.returnValue(
        DirectionMode.LTR
      );
    });

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
