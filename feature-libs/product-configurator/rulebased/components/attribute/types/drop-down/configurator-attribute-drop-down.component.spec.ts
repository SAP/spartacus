import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeDropDownComponent } from './configurator-attribute-drop-down.component';

function createValue(code: string, name: string, isSelected: boolean) {
  const value: Configurator.Value = {
    valueCode: code,
    valueDisplay: name,
    name: name,
    selected: isSelected,
  };
  return value;
}

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}

@Component({
  selector: 'cx-configurator-attribute-quantity',
  template: '',
})
class MockConfiguratorAttributeQuantityComponent {
  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;
  @Output() changeQuantity = new EventEmitter<number>();
}

@Component({
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

describe('ConfigAttributeDropDownComponent', () => {
  let component: ConfiguratorAttributeDropDownComponent;
  let htmlElem: HTMLElement;
  let fixture: ComponentFixture<ConfiguratorAttributeDropDownComponent>;

  const ownerKey = 'theOwnerKey';
  const name = 'attributeName';
  const groupId = 'theGroupId';
  const selectedValue = 'selectedValue';

  const value1 = createValue('1', 'val1', true);
  const value2 = createValue('2', 'val2', false);
  const value3 = createValue('3', 'val3', false);

  const values: Configurator.Value[] = [value1, value2, value3];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeDropDownComponent,
          MockFocusDirective,
          MockConfiguratorAttributeQuantityComponent,
          MockConfiguratorPriceComponent,
        ],
        imports: [ReactiveFormsModule, NgSelectModule, I18nTestingModule],
      })
        .overrideComponent(ConfiguratorAttributeDropDownComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorAttributeDropDownComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    component.attribute = {
      name: name,
      label: name,
      attrCode: 444,
      dataType: Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
      uiType: Configurator.UiType.DROPDOWN,
      selectedSingleValue: selectedValue,
      quantity: 1,
      groupId: groupId,
      values,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedSingleValue on init', () => {
    expect(component.attributeDropDownForm.value).toEqual(selectedValue);
  });

  it('should call emit of selectionChange onSelect', () => {
    component.ownerKey = ownerKey;
    spyOn(component.selectionChange, 'emit').and.callThrough();
    component.onSelect(component.attributeDropDownForm.value);
    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        ownerKey: ownerKey,
        changedAttribute: jasmine.objectContaining({
          name: name,
          uiType: Configurator.UiType.DROPDOWN,
          groupId: groupId,
          selectedSingleValue: component.attributeDropDownForm.value,
        }),
      })
    );
  });

  describe('attribute level', () => {
    it('should not display quantity and no price', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_NO_QTY;
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-attribute-level-quantity-price'
      );
    });

    it('should display quantity and price', () => {
      component.attribute.quantity = 5;
      component.attribute.attributePriceTotal = {
        currencyIso: '$',
        formattedValue: '500.00$',
        value: 500,
      };

      let value = component.attribute.values
        ? component.attribute.values[0]
        : undefined;
      if (value) {
        value.valuePrice = {
          currencyIso: '$',
          formattedValue: '$100.00',
          value: 100,
        };
      } else {
        fail('Value not available');
      }

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });
  });

  describe('value level', () => {
    it('should not display quantity', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_NO_QTY;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });

    it('should display price formula', () => {
      let value = component.attribute.values
        ? component.attribute.values[0]
        : undefined;
      if (value) {
        value.valuePrice = {
          currencyIso: '$',
          formattedValue: '$100.00',
          value: 100,
        };
      } else {
        fail('Value not available');
      }

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });
  });

  describe('Rendering for additional value', () => {
    it('should provide input field for alpha numeric value ', () => {
      component.attribute.uiType =
        Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
      component.attribute.validationType = Configurator.ValidationType.NONE;
      fixture.detectChanges();
      htmlElem = fixture.nativeElement;
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-input-field'
      );
    });

    it('should provide input field for numeric value ', () => {
      component.attribute.uiType =
        Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
      component.attribute.validationType = Configurator.ValidationType.NUMERIC;
      fixture.detectChanges();
      htmlElem = fixture.nativeElement;
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-numeric-input-field'
      );
    });
  });

  describe('Accessibility', () => {
    it("should contain label element with class name 'cx-visually-hidden' that hides label content on the UI", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'label',
        'cx-visually-hidden',
        0,
        undefined,
        undefined,
        'configurator.a11y.listbox count:' +
          (component.attribute.values ? component.attribute.values.length : 0)
      );
    });

    it("should contain select element with class name 'form-control' and 'aria-describedby' attribute that indicates the ID of the element that describe the elements", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'select',
        'form-control',
        0,
        'aria-describedby',
        'cx-configurator--label--attributeName'
      );
    });

    it("should contain option elements with 'aria-label' attribute for value without price that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'option',
        undefined,
        1,
        'aria-label',
        'configurator.a11y.selectedValueOfAttributeFull attribute:' +
          component.attribute.label +
          ' value:' +
          value2.valueDisplay,
        value2.valueDisplay
      );
    });

    it("should contain option elements with 'aria-label' attribute for value with price that defines an accessible name to label the current element", () => {
      let value = component.attribute.values
        ? component.attribute.values[0]
        : undefined;
      if (value) {
        value.valuePrice = {
          currencyIso: '$',
          formattedValue: '$100.00',
          value: 100,
        };
      } else {
        fail('Value not available');
      }
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'option',
        undefined,
        0,
        'aria-label',
        'configurator.a11y.selectedValueOfAttributeFullWithPrice attribute:' +
          component.attribute.label +
          ' price:' +
          value1.valuePrice?.formattedValue +
          ' value:' +
          value1.valueDisplay,
        value1.valueDisplay
      );
    });

    it("should contain option elements with 'aria-label' attribute for value with total price that defines an accessible name to label the current element", () => {
      let value = component.attribute.values
        ? component.attribute.values[0]
        : undefined;
      if (value) {
        value.valuePriceTotal = {
          currencyIso: '$',
          formattedValue: '$100.00',
          value: 100,
        };
      } else {
        fail('Value not available');
      }
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'option',
        undefined,
        0,
        'aria-label',
        'configurator.a11y.selectedValueOfAttributeFullWithPrice attribute:' +
          component.attribute.label +
          ' price:' +
          value1.valuePrice?.formattedValue +
          ' value:' +
          value1.valueDisplay,
        value1.valueDisplay
      );
    });
  });
});
