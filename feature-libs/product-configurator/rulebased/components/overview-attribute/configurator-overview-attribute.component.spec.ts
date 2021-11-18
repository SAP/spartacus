import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Component, Input, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BreakpointService } from '@spartacus/storefront';
import { ConfiguratorOverviewAttributeComponent } from './configurator-overview-attribute.component';
import { ConfiguratorPriceComponentOptions } from '../price/configurator-price.component';

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
        imports: [ReactiveFormsModule, NgSelectModule],
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
});
