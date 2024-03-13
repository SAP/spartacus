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
import { StoreModule } from '@ngrx/store';
import { Config, I18nTestingModule } from '@spartacus/core';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { CONFIGURATOR_FEATURE } from '../../../../core/state/configurator-state';
import { getConfiguratorReducers } from '../../../../core/state/reducers';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeInputFieldComponent } from '../input-field/configurator-attribute-input-field.component';
import { ConfiguratorAttributeNumericInputFieldComponent } from '../numeric-input-field/configurator-attribute-numeric-input-field.component';
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

@Component({
  selector: 'cx-configurator-show-more',
  template: '',
})
class MockConfiguratorShowMoreComponent {
  @Input() text: string;
  @Input() textSize = 60;
  @Input() productName: string;
}

class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
}

let showRequiredErrorMessage: boolean;
class MockConfigUtilsService {
  isCartEntryOrGroupVisited(): Observable<boolean> {
    return of(showRequiredErrorMessage);
  }
}

class MockConfig {
  features = [{ attributeTypesV2: false }];
}

describe('ConfigAttributeDropDownComponent', () => {
  let component: ConfiguratorAttributeDropDownComponent;
  let htmlElem: HTMLElement;
  let fixture: ComponentFixture<ConfiguratorAttributeDropDownComponent>;
  let config: Config;

  const ownerKey = 'theOwnerKey';
  const name = 'attributeName';
  const groupId = 'theGroupId';
  const selectedValue = 'selectedValue';

  const value1 = createValue(
    Configurator.RetractValueCode,
    'Please select a value',
    true
  );
  const value2 = createValue('2', 'val2', false);
  const value3 = createValue('3', 'val3', false);

  const values: Configurator.Value[] = [value1, value2, value3];

  function createComponentWithData(
    isCartEntryOrGroupVisited: boolean = true
  ): ConfiguratorAttributeDropDownComponent {
    showRequiredErrorMessage = isCartEntryOrGroupVisited;

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
      required: true,
      incomplete: true,
      values,
    };

    config = TestBed.inject(Config);
    (config.features ?? {}).attributeTypesV2 = false;
    fixture.detectChanges();
    return component;
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeDropDownComponent,
          ConfiguratorAttributeInputFieldComponent,
          ConfiguratorAttributeNumericInputFieldComponent,
          MockFocusDirective,
          MockConfiguratorAttributeQuantityComponent,
          MockConfiguratorPriceComponent,
          MockFeatureLevelDirective,
          MockConfiguratorShowMoreComponent,
        ],
        imports: [
          ReactiveFormsModule,
          NgSelectModule,
          I18nTestingModule,
          StoreModule.forRoot({}),
          StoreModule.forFeature(CONFIGURATOR_FEATURE, getConfiguratorReducers),
        ],
        providers: [
          {
            provide: ConfiguratorAttributeCompositionContext,
            useValue: ConfiguratorTestUtils.getAttributeContext(),
          },
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
          {
            provide: ConfiguratorStorefrontUtilsService,
            useClass: MockConfigUtilsService,
          },
          { provide: Config, useClass: MockConfig },
        ],
      })
        .overrideComponent(ConfiguratorAttributeDropDownComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  afterEach(() => {
    document.body.removeChild(htmlElem);
    fixture.destroy();
  });

  it('should create', () => {
    createComponentWithData();
    expect(component).toBeTruthy();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'select.cx-required-error-msg'
    );
  });

  it('should render an empty component because showRequiredErrorMessage$ is `false`', () => {
    createComponentWithData(false);
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'select.cx-required-error-msg'
    );
  });

  it('should not render cx-value-label-pair div in case attributeTypesV2 feature flag is disabled', () => {
    createComponentWithData();
    (component.attribute.values ?? [{ description: '' }])[0].description =
      'Here is a description at value level';
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-value-label-pair'
    );
  });

  it('should render cx-value-label-pair div in case attributeTypesV2 feature flag is enabled', () => {
    createComponentWithData();
    (config.features ?? {}).attributeTypesV2 = true;
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-value-label-pair'
    );
  });

  it('should not render description in case attributeTypesV2 feature flag is disabled', () => {
    createComponentWithData();
    (component.attribute.values ?? [{ description: '' }])[0].description =
      'Here is a description at value level';
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-configurator-show-more'
    );
  });

  it('should render description in case attributeTypesV2 feature flag is enabled', () => {
    createComponentWithData();
    (config.features ?? {}).attributeTypesV2 = true;
    (component.attribute.values ?? [{ description: '' }])[0].description =
      'Here is a description at value level';
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configurator-show-more'
    );
  });

  it('should set selectedSingleValue on init', () => {
    createComponentWithData();
    expect(component.attributeDropDownForm.value).toEqual(selectedValue);
  });

  it('should call updateConfiguration on select', () => {
    createComponentWithData();
    component.ownerKey = ownerKey;
    spyOn(
      component['configuratorCommonsService'],
      'updateConfiguration'
    ).and.callThrough();
    component.onSelect(component.attributeDropDownForm.value);
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalledWith(
      ownerKey,
      {
        ...component.attribute,
        selectedSingleValue: component.attributeDropDownForm.value,
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  });

  describe('attribute level', () => {
    beforeEach(() => {
      createComponentWithData();
    });

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
    beforeEach(() => {
      createComponentWithData();
    });

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

  describe('getSelectedValueDescription', () => {
    it('should return blank if no description provided at model level on any selected value', () => {
      createComponentWithData();
      component.attribute.values = [];
      expect(component.getSelectedValueDescription()).toBe('');
    });
  });

  describe('Rendering for additional value', () => {
    beforeEach(() => {
      createComponentWithData();
    });

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
    beforeEach(() => {
      createComponentWithData();
    });

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
