import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeReadOnlyComponent } from './configurator-attribute-read-only.component';

@Component({
  selector: 'cx-configurator-attribute-read-only',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

const priceDetails: Configurator.PriceDetails = {
  currencyIso: '$',
  formattedValue: '$3',
  value: 3,
};

const myValues: Configurator.Value[] = [
  {
    valueCode: 'val1',
    valueDisplay: 'val1',
    selected: false,
    quantity: 3,
    valuePrice: priceDetails,
    valuePriceTotal: priceDetails,
  },
  {
    valueCode: 'val2',
    valueDisplay: 'val2',
    selected: true,
  },
  {
    valueCode: 'val3',
    valueDisplay: 'val3',
    selected: false,
    quantity: 3,
    valuePrice: priceDetails,
  },
];

describe('ConfigAttributeReadOnlyComponent', () => {
  let component: ConfiguratorAttributeReadOnlyComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeReadOnlyComponent>;
  let htmlElem: HTMLElement;
  let configuratorPriceComponentOptions: ConfiguratorPriceComponentOptions = {
    quantity: myValues[0].quantity,
    price: myValues[0].valuePrice,
    priceTotal: myValues[0].valuePriceTotal,
    isLightedUp: myValues[0].selected,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeReadOnlyComponent,
          MockConfiguratorPriceComponent,
        ],
        imports: [ReactiveFormsModule, I18nTestingModule],
      })
        .overrideComponent(ConfiguratorAttributeReadOnlyComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorAttributeReadOnlyComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.attribute = {
      name: 'attributeName',
      label: 'attributeLabel',
      attrCode: 444,
      uiType: Configurator.UiType.READ_ONLY,
      selectedSingleValue: 'selectedValue',
      quantity: 1,
    };
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('extractValuePriceFormulaParameters', () => {
    it('should return corresponding value price formula parameters for a given price', () => {
      expect(component.extractValuePriceFormulaParameters(myValues[0])).toEqual(
        configuratorPriceComponentOptions
      );
    });
  });

  describe('with static Domain', () => {
    it('should display valueDisplay of selected value for attribute with domain', () => {
      component.attribute.values = myValues;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.form-check'
      );
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-read-only-label'
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-read-only-label',
        'val2'
      );
    });

    it('should display valueDisplay of all selected values for attribute with domain', () => {
      myValues[0].selected = true;
      component.attribute.values = myValues;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.form-check'
      );
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-read-only-label'
      );
      expect(htmlElem.querySelectorAll('.cx-read-only-label').length).toBe(2);
    });

    it('should display price component of selected value for attribute with domain', () => {
      component.attribute.values = myValues;
      fixture.detectChanges();
      console.log('html:  ' + htmlElem);
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.form-check'
      );
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-value-price'
      );
    });
  });

  describe('no static Domain', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ConfiguratorAttributeReadOnlyComponent);
      component = fixture.componentInstance;
      htmlElem = fixture.nativeElement;
      component.attribute = {
        name: 'attributeName',
        label: 'attributelabel',
        attrCode: 444,
        uiType: Configurator.UiType.READ_ONLY,
        selectedSingleValue: myValues[1].valueCode,
        values: undefined,
        quantity: 1,
      };
      fixture.detectChanges();
    });

    describe('should display selectedSingleValue', () => {
      it('should create component for selectedSingleValue', () => {
        expect(component).toBeTruthy();
      });
      it("should contain span element with class name 'cx-visually-hidden' that hides label content on the UI", () => {
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          'span'
        );
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-visually-hidden'
        );
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-read-only-label'
        );
        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-form-check'
        );
        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-value-price'
        );
      });
    });

    describe('should display userInput', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(
          ConfiguratorAttributeReadOnlyComponent
        );
        component = fixture.componentInstance;
        htmlElem = fixture.nativeElement;
        component.attribute = {
          name: 'attributeName',
          label: 'attributeName',
          attrCode: 444,
          uiType: Configurator.UiType.READ_ONLY,
          userInput: myValues[1].valueCode,
          values: undefined,
          quantity: 1,
        };
        fixture.detectChanges();
      });

      it('should create component for userInput', () => {
        expect(component).toBeTruthy();
      });

      it("should contain span element with class name 'cx-visually-hidden' that hides span content on the UI", () => {
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          'span'
        );
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-visually-hidden'
        );
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-read-only-label'
        );
        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-form-check'
        );
        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-value-price'
        );
      });
    });
  });

  describe('Accessibility', () => {
    describe('with staticDomain', () => {
      it('should create component for staticDomain', () => {
        expect(component).toBeTruthy();
      });

      it('should return aria label for valuePriceTotal', () => {
        myValues[0].selected = true;
        component.attribute.values = myValues;
        fixture.detectChanges();
        let attributeLabel = component.attribute.label;
        let valueName = myValues[0].valueCode;
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-visually-hidden'
        );
        expect(
          component.getAriaLabel(component.attribute, myValues[0])
        ).toEqual(
          'configurator.a11y.readOnlyValueOfAttributeFullWithPrice' +
            ' attribute:' +
            attributeLabel +
            ' price:' +
            myValues[0].valuePriceTotal?.formattedValue +
            ' value:' +
            valueName
        );
      });

      it('should return aria label for only valuePrice', () => {
        myValues[0].selected = false;
        myValues[1].selected = false;
        myValues[2].selected = true;
        component.attribute.values = myValues;
        fixture.detectChanges();
        let attributeLabel = component.attribute.label;
        let valueName = myValues[2].valueCode;
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-visually-hidden'
        );
        expect(
          component.getAriaLabel(component.attribute, myValues[2])
        ).toEqual(
          'configurator.a11y.readOnlyValueOfAttributeFullWithPrice' +
            ' attribute:' +
            attributeLabel +
            ' price:' +
            myValues[2].valuePrice?.formattedValue +
            ' value:' +
            valueName
        );
      });
    });

    describe('noStaticDomain', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(
          ConfiguratorAttributeReadOnlyComponent
        );
        component = fixture.componentInstance;
        htmlElem = fixture.nativeElement;
        component.attribute = {
          name: 'attributeName',
          label: 'attributelabel',
          attrCode: 444,
          uiType: Configurator.UiType.READ_ONLY,
          selectedSingleValue: myValues[1].valueCode,
          values: undefined,
          quantity: 1,
        };
        fixture.detectChanges();
      });

      describe('should display selectedSingleValue', () => {
        it('should create component for selectedSingleValue', () => {
          expect(component).toBeTruthy();
        });

        it('should return aria label for selectedSingleValue ', () => {
          let attributeLabel = component.attribute.label || '';
          let valueName = myValues[1].valueCode;
          CommonConfiguratorTestUtilsService.expectElementPresent(
            expect,
            htmlElem,
            '.cx-visually-hidden'
          );
          expect(component.getAriaLabel(component.attribute)).toEqual(
            'configurator.a11y.readOnlyValueOfAttributeFull attribute:' +
              attributeLabel +
              ' value:' +
              valueName
          );
        });
      });

      describe('should display userInput', () => {
        beforeEach(() => {
          fixture = TestBed.createComponent(
            ConfiguratorAttributeReadOnlyComponent
          );
          component = fixture.componentInstance;
          htmlElem = fixture.nativeElement;
          component.attribute = {
            name: 'attributeName',
            label: 'attributeName',
            attrCode: 444,
            uiType: Configurator.UiType.READ_ONLY,
            userInput: myValues[1].valueCode,
            values: undefined,
            quantity: 1,
          };
          fixture.detectChanges();
        });
        it('should create component for userInput', () => {
          expect(component).toBeTruthy();
        });
        it('should return aria label for userInput ', () => {
          let attributeLabel = component.attribute.label || '';
          let valueName = myValues[1].valueCode;
          CommonConfiguratorTestUtilsService.expectElementPresent(
            expect,
            htmlElem,
            '.cx-visually-hidden'
          );
          expect(component.getAriaLabel(component.attribute)).toEqual(
            'configurator.a11y.readOnlyValueOfAttributeFull attribute:' +
              attributeLabel +
              ' value:' +
              valueName
          );
        });
      });
    });
  });
});
