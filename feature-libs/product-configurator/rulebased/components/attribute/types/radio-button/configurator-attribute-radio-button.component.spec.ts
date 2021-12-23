import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { ItemCounterComponent } from '@spartacus/storefront';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorGroupsService } from '../../../../core/facade/configurator-groups.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeRadioButtonComponent } from './configurator-attribute-radio-button.component';

function createValue(code: string, name: string, isSelected: boolean) {
  const value: Configurator.Value = {
    valueCode: code,
    valueDisplay: name,
    name: name,
    selected: isSelected,
  };
  return value;
}

class MockGroupService {}

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
}

@Component({
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

describe('ConfigAttributeRadioButtonComponent', () => {
  let component: ConfiguratorAttributeRadioButtonComponent;
  let htmlElem: HTMLElement;
  let fixture: ComponentFixture<ConfiguratorAttributeRadioButtonComponent>;
  const ownerKey = 'theOwnerKey';
  const name = 'attributeName';
  const groupId = 'theGroupId';
  const initialSelectedValue = 'initialSelectedValue';

  const value1 = createValue('1', 'val1', true);
  const value2 = createValue('2', 'val2', false);
  const value3 = createValue('3', 'val3', false);

  const values: Configurator.Value[] = [value1, value2, value3];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeRadioButtonComponent,
          ItemCounterComponent,
          MockFocusDirective,
          MockConfiguratorAttributeQuantityComponent,
          MockConfiguratorPriceComponent,
        ],
        imports: [I18nTestingModule, ReactiveFormsModule],
        providers: [
          ConfiguratorStorefrontUtilsService,
          {
            provide: ConfiguratorGroupsService,
            useClass: MockGroupService,
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeRadioButtonComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeRadioButtonComponent
    );
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;

    component.attribute = {
      name: name,
      label: name,
      attrCode: 444,
      uiType: Configurator.UiType.RADIOBUTTON,
      selectedSingleValue: initialSelectedValue,
      groupId: groupId,
      quantity: 1,
      dataType: Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
      values,
    };

    component.ownerKey = ownerKey;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedSingleValue on init', () => {
    expect(component.attributeRadioButtonForm.value).toEqual(
      initialSelectedValue
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

  describe('Accessibility', () => {
    it("should contain input element with class name 'form-check-input' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-check-input',
        1,
        'aria-label',
        'configurator.a11y.valueOfAttributeFull attribute:' +
          component.attribute.label +
          ' value:' +
          component.attribute.values[1].valueDisplay
      );
    });

    it("should contain input element with class name 'form-check-input' and 'aria-describedby' attribute that indicates the IDs of the elements that describe the elements", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-check-input',
        1,
        'aria-describedby',
        'cx-configurator--label--attributeName cx-configurator--attribute-msg--attributeName'
      );
    });

    it("should contain label element with class name 'form-check-label' and 'aria-hidden' attribute that removes label from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'label',
        'form-check-label',
        1,
        'aria-hidden',
        'true',
        component.attribute.values[1].valueDisplay
      );
    });
  });
});
