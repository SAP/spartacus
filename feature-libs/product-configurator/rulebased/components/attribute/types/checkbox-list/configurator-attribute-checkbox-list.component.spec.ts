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
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../../../core/facade/configurator-groups.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeCheckBoxListComponent } from './configurator-attribute-checkbox-list.component';

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
  @Output() changeQuantity = new EventEmitter<number>();
}

@Component({
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

@Component({
  selector: 'cx-configurator-show-more',
  template: '',
})
class MockConfiguratorShowMoreComponent {
  @Input() text: string;
  @Input() textSize = 60;
  @Input() productName: string;
}

const VALUE_1 = 'val1';
const VALUE_2 = 'val2';

class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
}

describe('ConfigAttributeCheckBoxListComponent', () => {
  let component: ConfiguratorAttributeCheckBoxListComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeCheckBoxListComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeCheckBoxListComponent,
          MockFocusDirective,
          MockConfiguratorAttributeQuantityComponent,
          MockConfiguratorPriceComponent,
          MockConfiguratorShowMoreComponent,
        ],
        imports: [ReactiveFormsModule, NgSelectModule, I18nTestingModule],
        providers: [
          ConfiguratorStorefrontUtilsService,
          {
            provide: ConfiguratorGroupsService,
            useClass: MockGroupService,
          },
          ConfiguratorAttributeQuantityService,
          {
            provide: ConfiguratorAttributeCompositionContext,
            useValue: ConfiguratorTestUtils.getAttributeContext(),
          },
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeCheckBoxListComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  function createValue(code: string, name: string, isSelected: boolean) {
    const value: Configurator.Value = {
      valueCode: code,
      valueDisplay: name,
      name: name,
      selected: isSelected,
    };
    return value;
  }
  let values: Configurator.Value[];
  beforeEach(() => {
    const value1 = createValue('1', VALUE_1, true);
    const value2 = createValue('2', VALUE_2, false);
    const value3 = createValue('3', 'val3', true);
    values = [value1, value2, value3];

    fixture = TestBed.createComponent(
      ConfiguratorAttributeCheckBoxListComponent
    );

    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;

    component.ownerKey = 'theOwnerKey';
    component.attribute = {
      dataType: Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL,
      name: 'attributeName',
      label: 'attributeName',
      attrCode: 444,
      uiType: Configurator.UiType.CHECKBOXLIST,
      values: values,
      required: true,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cope with no attribute values in onInit', () => {
    component.attributeCheckBoxForms = [];
    component.attribute.values = undefined;
    component.ngOnInit();
    expect(component.attributeCheckBoxForms.length).toBe(0);
  });

  it('should have 3 entries after init with first and last value filled', () => {
    expect(component.attributeCheckBoxForms.length).toBe(3);
    expect(component.attributeCheckBoxForms[0].value).toBe(true);
    expect(component.attributeCheckBoxForms[1].value).toBe(false);
    expect(component.attributeCheckBoxForms[2].value).toBe(true);
  });

  it('should select and deselect a checkbox value', () => {
    const checkboxId =
      '#cx-configurator--checkBoxList--' +
      component.attribute.name +
      '--' +
      values[1].valueCode;
    const valueToSelect = fixture.debugElement.query(
      By.css(checkboxId)
    ).nativeElement;
    expect(valueToSelect.checked).toBeFalsy();
    // select value
    valueToSelect.click();
    fixture.detectChanges();
    expect(valueToSelect.checked).toBeTruthy();
    // deselect value
    valueToSelect.click();
    fixture.detectChanges();
    expect(valueToSelect.checked).toBeFalsy();
  });

  it('should deselect values onChangeValueQuantity if quantity is set to zero', () => {
    spyOn(
      component['configuratorCommonsService'],
      'updateConfiguration'
    ).and.callThrough();

    component.onChangeValueQuantity(0, '1', 0);

    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalledWith(
      component.ownerKey,
      {
        ...component.attribute,
        values: [
          {
            name: VALUE_1,
            quantity: undefined,
            selected: false,
            valueCode: '1',
          },
          {
            name: VALUE_2,
            quantity: undefined,
            selected: false,
            valueCode: '2',
          },
          {
            name: 'val3',
            quantity: undefined,
            selected: true,
            valueCode: '3',
          },
        ],
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  });

  it('should call emit of selectionChange onChangeValueQuantity if quantity is set to 1', () => {
    spyOn(
      component['configuratorCommonsService'],
      'updateConfiguration'
    ).and.callThrough();

    component.onChangeValueQuantity(1, '1', 0);

    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalledWith(
      component.ownerKey,
      {
        ...component.attribute,
        values: [
          {
            name: VALUE_1,
            quantity: 1,
            selected: true,
            valueCode: '1',
          },
        ],
      },
      Configurator.UpdateType.VALUE_QUANTITY
    );
  });

  it('should not call facade update onChangeValueQuantity if value does not exist', () => {
    spyOn(
      component['configuratorCommonsService'],
      'updateConfiguration'
    ).and.callThrough();

    component.onChangeValueQuantity(1, 'NOT_EXISTING', 0);

    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalledTimes(0);
  });

  it('should call facade update onChangeQuantity', () => {
    spyOn(
      component['configuratorCommonsService'],
      'updateConfiguration'
    ).and.callThrough();
    component.onChangeQuantity(2);
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalled();
  });

  it('should call onSelect of event onChangeQuantity', () => {
    spyOn(component, 'onSelect');
    component.onChangeQuantity(0);
    expect(component.onSelect).toHaveBeenCalled();
  });

  // HTML
  it('should not display attribute quantity when dataType is no quantity', () => {
    component.attribute.dataType = Configurator.DataType.USER_SELECTION_NO_QTY;

    fixture.detectChanges();

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-configurator-attribute-quantity'
    );
  });

  it('should not display value quantity when dataType is no quantity', () => {
    component.attribute.dataType = Configurator.DataType.USER_SELECTION_NO_QTY;

    fixture.detectChanges();

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-configurator-attribute-quantity'
    );
  });

  it('should allow zero value quantity', () => {
    expect(component.allowZeroValueQuantity).toBe(true);
  });

  describe('attribute level', () => {
    it('should display attribute quantity when dataType is with attribute quantity', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL;

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });

    it('should display price formula', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL;
      component.attribute.attributePriceTotal = {
        currencyIso: '$',
        formattedValue: '250.00$',
        value: 250,
      };

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });
  });

  describe('value level', () => {
    it('should display value quantity when dataType is with value quantity', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL;

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });

    it('should display price formula', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL;

      let value = component.attribute.values
        ? component.attribute.values[0]
        : undefined;

      if (value) {
        value = {
          valueCode: 'a',
          selected: true,
          quantity: 5,
          valuePrice: {
            currencyIso: '$',
            formattedValue: '100.00$',
            value: 250,
          },
          valuePriceTotal: {
            currencyIso: '$',
            formattedValue: '$500.0',
            value: 500,
          },
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

    it('should not render description in case description not present on model', () => {
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-show-more'
      );
    });

    it('should render description in case description present on model', () => {
      (component.attribute.values ?? [{ description: '' }])[0].description =
        'Here is a description at value level';
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-show-more'
      );
    });
  });

  describe('Accessibility', () => {
    it("should contain input element with class name 'form-check-input' and 'aria-label' attribute for value without price that defines an accessible name to label the current element", () => {
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
          VALUE_2
      );
    });

    it("should contain input element with class name 'form-check-input' and 'aria-label' attribute for value with price that defines an accessible name to label the current element", () => {
      let value = component.attribute.values
        ? component.attribute.values[0]
        : undefined;
      const formattedValue = '$100.00';
      if (value) {
        value.valuePrice = {
          currencyIso: '$',
          formattedValue: formattedValue,
          value: 100,
        };
      } else {
        fail('Value not available');
      }
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-check-input',
        0,
        'aria-label',
        'configurator.a11y.valueOfAttributeFullWithPrice attribute:' +
          component.attribute.label +
          ' price:' +
          formattedValue +
          ' value:' +
          VALUE_1
      );
    });

    it("should contain input element with class name 'form-check-input' and 'aria-describedby' attribute that indicates the ID of the element that describe the elements", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-check-input',
        0,
        'aria-describedby',
        'cx-configurator--label--attributeName'
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
        VALUE_2
      );
    });
  });
});
