import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeReadOnlyComponent } from './configurator-attribute-read-only.component';

@Component({
  selector: 'cx-configurator-price',
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
        providers: [
          {
            provide: ConfiguratorAttributeCompositionContext,
            useValue: ConfiguratorTestUtils.getAttributeContext(),
          },
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
        '.cx-read-only-attribute-label'
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-read-only-attribute-label',
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
        '.cx-read-only-attribute-label'
      );
      expect(
        htmlElem.querySelectorAll('.cx-read-only-attribute-label').length
      ).toBe(2);
    });

    it('should display price component of selected value for attribute with domain', () => {
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
        '.cx-value-price'
      );
    });
  });

  describe('no static Domain', () => {
    beforeEach(() => {
      component.attribute.selectedSingleValue = myValues[1].valueCode;
      fixture.detectChanges();
    });

    describe('should display selectedSingleValue', () => {
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
          '.cx-read-only-attribute-label'
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
        component.attribute.userInput = myValues[1].valueCode;
        component.attribute.selectedSingleValue = undefined;
        fixture.detectChanges();
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
          '.cx-read-only-attribute-label'
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

      it('should return aria label without valuePrice', () => {
        myValues[0].selected = false;
        myValues[1].selected = true;
        myValues[2].selected = false;
        component.attribute.values = myValues;
        fixture.detectChanges();
        let attributeLabel = component.attribute.label;
        let valueName = myValues[1].valueCode;
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-visually-hidden'
        );
        expect(
          component.getAriaLabel(component.attribute, myValues[1])
        ).toEqual(
          'configurator.a11y.readOnlyValueOfAttributeFull' +
            ' attribute:' +
            attributeLabel +
            ' value:' +
            valueName
        );
      });
    });

    describe('noStaticDomain', () => {
      describe('should display selectedSingleValue', () => {
        beforeEach(() => {
          component.attribute.selectedSingleValue = myValues[1].valueCode;
          fixture.detectChanges();
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
          component.attribute.userInput = myValues[1].valueCode;
          component.attribute.selectedSingleValue = undefined;
          fixture.detectChanges();
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
