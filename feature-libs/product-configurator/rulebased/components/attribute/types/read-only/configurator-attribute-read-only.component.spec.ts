import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeReadOnlyComponent } from './configurator-attribute-read-only.component';

describe('ConfigAttributeReadOnlyComponent', () => {
  let component: ConfiguratorAttributeReadOnlyComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeReadOnlyComponent>;
  let htmlElem: HTMLElement;
  let configuratorPriceComponentOptions: ConfiguratorPriceComponentOptions;

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
  ];
  configuratorPriceComponentOptions = {
    quantity: myValues[0].quantity,
    price: myValues[0].valuePrice,
    priceTotal: myValues[0].valuePriceTotal,
    isLightedUp: myValues[0].selected,
  };
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguratorAttributeReadOnlyComponent],
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
      label: 'attributeName',
      attrCode: 444,
      uiType: Configurator.UiType.READ_ONLY,
      selectedSingleValue: 'selectedValue',
      quantity: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test return of extractValuePriceFormulaParameters() method', () => {
    expect(component.extractValuePriceFormulaParameters(myValues[0])).toEqual(
      configuratorPriceComponentOptions
    );
  });

  it('should display selectedSingleValue for attribute without domain', () => {
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-form-group-readonly-label'
    );
  });

  it('should display valueDisplay of selected value for attribute with domain', () => {
    component.attribute.values = myValues;
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-form-group-readonly-label'
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-form-group-readonly-label',
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
      '.cx-form-group-readonly-label'
    );
    expect(
      htmlElem.querySelectorAll('.cx-form-group-readonly-label').length
    ).toBe(2);
  });

  it('should display price component for attribute without domain', () => {
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-value-price'
    );
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      myValues[0].selected = true;
      component.attribute.selectedSingleValue = myValues[0].valueCode;
      component.attribute.values = myValues;
      fixture.detectChanges();
    });

    describe('Static domain', () => {
      it("should contain span element with class name 'cx-visually-hidden' that hides label content on the UI", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'span',
          'cx-visually-hidden',
          0,
          undefined,
          undefined,
          'configurator.a11y.readOnlyValueOfAttributeFull attribute:' +
            component.attribute.label +
            ' value:' +
            component.attribute.selectedSingleValue
        );
      });

      it("should contain label element with class name 'cx-form-group-readonly-label' and 'aria-hidden' attribute that removes an element from the accessibility tree", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'label',
          'cx-form-group-readonly-label',
          0,
          'aria-hidden',
          'true'
        );
      });

      it("should contain price element with class name 'cx-value-price' and 'aria-hidden' attribute that removes an element from the accessibility tree ", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'div',
          'cx-value-price',
          0,
          'aria-hidden',
          'true'
        );
      });
    });

    describe('No Static domain', () => {
      describe('Selected single value', () => {
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
            selectedSingleValue: myValues[1].valueCode,
            values: undefined,
            quantity: 1,
          };
          fixture.detectChanges();
        });

        it("should contain span element with class name 'cx-visually-hidden' that hides label content on the UI", () => {
          CommonConfiguratorTestUtilsService.expectElementContainsA11y(
            expect,
            htmlElem,
            'span',
            'cx-visually-hidden',
            0,
            undefined,
            undefined,
            ' configurator.a11y.readOnlyValueOfAttributeFull attribute:' +
              component.attribute.label +
              ' value:' +
              component.attribute.selectedSingleValue
          );
        });

        it("should contain div element with class name 'cx-read-only-label' and 'aria-hidden' attribute that removes div from the accessibility tree", () => {
          CommonConfiguratorTestUtilsService.expectElementContainsA11y(
            expect,
            htmlElem,
            'div',
            'cx-read-only-label',
            0,
            'aria-hidden',
            'true'
          );
        });

        it("should contain span element with 'aria-hidden' attribute attribute that removes span from the accessibility tree", () => {
          CommonConfiguratorTestUtilsService.expectElementContainsA11y(
            expect,
            htmlElem,
            'span',
            undefined,
            1,
            'aria-hidden',
            'true',
            component.attribute.selectedSingleValue
          );
        });
      });

      describe('User input', () => {
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

        it("should contain span element with class name 'cx-visually-hidden' that hides span content on the UI", () => {
          CommonConfiguratorTestUtilsService.expectElementContainsA11y(
            expect,
            htmlElem,
            'span',
            'cx-visually-hidden',
            1,
            undefined,
            undefined,
            'configurator.a11y.readOnlyValueOfAttributeFull attribute:' +
              component.attribute.label +
              ' value:' +
              component.attribute.userInput
          );
        });

        it("should contain span element with 'aria-hidden' attribute that removes span from the accessibility tree", () => {
          CommonConfiguratorTestUtilsService.expectElementContainsA11y(
            expect,
            htmlElem,
            'span',
            undefined,
            1,
            'aria-hidden',
            'true',
            component.attribute.userInput
          );
        });
      });
    });
  });
});
