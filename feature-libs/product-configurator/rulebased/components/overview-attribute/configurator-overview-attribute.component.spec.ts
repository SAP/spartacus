import { Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { BreakpointService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorPriceComponentOptions } from '../price/configurator-price.component';
import { ConfiguratorOverviewAttributeComponent } from './configurator-overview-attribute.component';

@Component({
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

describe('ConfigurationOverviewAttributeComponent', () => {
  let component: ConfiguratorOverviewAttributeComponent;
  let fixture: ComponentFixture<ConfiguratorOverviewAttributeComponent>;
  let htmlElem: HTMLElement;
  let breakpointService: BreakpointService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, NgSelectModule, I18nTestingModule],
        declarations: [
          ConfiguratorOverviewAttributeComponent,
          MockConfiguratorPriceComponent,
        ],
        providers: [],
      });
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorOverviewAttributeComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.attributeOverview = {
      attribute: 'Test Attribute Name',
      value: 'Test Attribute Value',
    };
    fixture.detectChanges();

    breakpointService = TestBed.inject(
      BreakpointService as Type<BreakpointService>
    );
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should show attribute value', () => {
    expect(htmlElem.querySelectorAll('.cx-attribute-value').length).toBe(1);

    expect(htmlElem.querySelectorAll('.cx-attribute-label').length).toBe(1);
  });

  describe('extractPriceFormulaParameters', () => {
    it('should return ConfiguratorPriceComponentOptions object', () => {
      component.attributeOverview.quantity = 100;
      component.attributeOverview.valuePrice = {
        currencyIso: '$',
        formattedValue: '$10',
        value: 10,
      };
      component.attributeOverview.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$1000',
        value: 1000,
      };
      fixture.detectChanges();
      const priceFormulaParameters = component.extractPriceFormulaParameters();
      expect(priceFormulaParameters.quantity).toBe(
        component.attributeOverview.quantity
      );
      expect(priceFormulaParameters.price).toBe(
        component.attributeOverview.valuePrice
      );
      expect(priceFormulaParameters.priceTotal).toBe(
        component.attributeOverview.valuePriceTotal
      );
      expect(priceFormulaParameters.isLightedUp).toBe(true);
    });
  });

  describe('isDesktop', () => {
    it('should return `false` because we deal with mobile widget', () => {
      spyOn(breakpointService, 'isUp').and.returnValue(of(false));
      let result: boolean;
      component
        .isDesktop()
        .subscribe((br) => {
          result = br;
          expect(result).toBe(false);
        })
        .unsubscribe();
    });

    it('should return `true` because we deal with desktop widget', () => {
      spyOn(breakpointService, 'isUp').and.returnValue(of(true));
      let result: boolean;
      component
        .isDesktop()
        .subscribe((br) => {
          result = br;
          expect(result).toBe(true);
        })
        .unsubscribe();
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ConfiguratorOverviewAttributeComponent);
      component = fixture.componentInstance;
      htmlElem = fixture.nativeElement;
      component.attributeOverview = {
        attribute: 'Color',
        value: 'Blue',
        quantity: 100,
        valuePrice: {
          currencyIso: '$',
          formattedValue: '$10',
          value: 10,
        },
      };
      fixture.detectChanges();

      breakpointService = TestBed.inject(
        BreakpointService as Type<BreakpointService>
      );
      spyOn(breakpointService, 'isUp').and.returnValue(of(true));
    });

    it("should contain span element with class name 'cx-visually-hidden' without price that hides span element content on the UI", () => {
      fixture = TestBed.createComponent(ConfiguratorOverviewAttributeComponent);
      component = fixture.componentInstance;
      htmlElem = fixture.nativeElement;
      component.attributeOverview = {
        attribute: 'Color',
        value: 'Blue',
      };
      fixture.detectChanges();

      breakpointService = TestBed.inject(
        BreakpointService as Type<BreakpointService>
      );
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-visually-hidden',
        0,
        undefined,
        undefined,
        'configurator.a11y.valueOfAttributeFull attribute:' +
          component.attributeOverview.attribute +
          ' value:' +
          component.attributeOverview.value
      );
    });

    it("should contain span element with class name 'cx-visually-hidden' with price that hides span element content on the UI", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-visually-hidden',
        0,
        undefined,
        undefined,
        'configurator.a11y.valueOfAttributeFullWithPrice attribute:' +
          component.attributeOverview.attribute +
          ' price:' +
          component.attributeOverview.valuePrice.formattedValue +
          ' value:' +
          component.attributeOverview.value
      );
    });

    it("should contain div element with class name 'cx-attribute-value' and 'aria-hidden' attribute that removes div element from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-attribute-value',
        0,
        'aria-hidden',
        'true'
      );
    });

    it("should contain div element with class name 'cx-attribute-label' and 'aria-hidden' attribute that removes div element from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-attribute-label',
        0,
        'aria-hidden',
        'true'
      );
    });
  });
});
