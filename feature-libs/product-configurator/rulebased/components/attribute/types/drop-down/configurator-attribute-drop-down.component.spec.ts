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
import { FeatureLevelDirective, I18nTestingModule } from '@spartacus/core';
import { ConfiguratorShowMoreComponent } from '@spartacus/product-configurator/rulebased';
import { FocusDirective } from '@spartacus/storefront';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { CONFIGURATOR_FEATURE } from '../../../../core/state/configurator-state';
import { getConfiguratorReducers } from '../../../../core/state/reducers';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import {
  ConfiguratorPriceComponent,
  ConfiguratorPriceComponentOptions,
} from '../../../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributePriceChangeService } from '../../price-change/configurator-attribute-price-change.service';
import {
  ConfiguratorAttributeQuantityComponent,
  ConfiguratorAttributeQuantityComponentOptions,
} from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeDropDownComponent } from './configurator-attribute-drop-down.component';

function createValue(
  code: string,
  name: string,
  isSelected: boolean,
  withPrice?: boolean
) {
  const value: Configurator.Value = {
    valueCode: code,
    valueDisplay: name,
    name: name,
    selected: isSelected,
    valuePrice: withPrice
      ? {
          currencyIso: 'EUR',
          value: 10,
        }
      : undefined,
  };
  return value;
}

@Directive({ selector: '[cxFocus]' })
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}

@Component({
  selector: 'cx-configurator-attribute-quantity',
  template: '',
  imports: [ReactiveFormsModule, NgSelectModule, I18nTestingModule],
})
class MockConfiguratorAttributeQuantityComponent {
  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;
  @Output() changeQuantity = new EventEmitter<number>();
}

@Component({
  selector: 'cx-configurator-price',
  template: '',
  imports: [ReactiveFormsModule, NgSelectModule, I18nTestingModule],
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

@Component({
  selector: 'cx-configurator-show-more',
  template: '',
  imports: [ReactiveFormsModule, NgSelectModule, I18nTestingModule],
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

class MockConfiguratorAttributePriceChangeService {
  getChangedPrices(): Observable<Record<string, Configurator.PriceDetails>[]> {
    return of([]);
  }
}

const ATTRIBUTE_VALUES_MISSING = 'attribute values are missing';

describe('ConfiguratorAttributeDropDownComponent', () => {
  let component: ConfiguratorAttributeDropDownComponent;
  let htmlElem: HTMLElement;
  let fixture: ComponentFixture<ConfiguratorAttributeDropDownComponent>;
  const ownerKey = 'theOwnerKey';
  const name = 'group1@attribute_1_1';
  const groupId = 'theGroupId';
  const selectedValue = 'selectedValue';

  function createComponentWithData(
    isCartEntryOrGroupVisited: boolean = true
  ): ConfiguratorAttributeDropDownComponent {
    showRequiredErrorMessage = isCartEntryOrGroupVisited;

    fixture = TestBed.createComponent(ConfiguratorAttributeDropDownComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    const value1 = createValue(
      Configurator.RetractValueCode,
      'Please select a value',
      true,
      true
    );
    const value2 = createValue('2', 'value_1_1', false);
    const value3 = createValue('3', 'value_1_2', false);
    const values: Configurator.Value[] = [value1, value2, value3];

    component.attribute = {
      key: name,
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
    fixture.detectChanges();
    return component;
  }

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(ConfiguratorAttributeDropDownComponent, {
      set: {
        providers: [
          {
            provide: ConfiguratorAttributePriceChangeService,
            useClass: MockConfiguratorAttributePriceChangeService,
          },
        ],
      },
    });
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgSelectModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(CONFIGURATOR_FEATURE, getConfiguratorReducers),
        ConfiguratorAttributeDropDownComponent,
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
      ],
    })
      .overrideComponent(ConfiguratorAttributeDropDownComponent, {
        remove: {
          imports: [
            FocusDirective,
            ConfiguratorAttributeQuantityComponent,
            ConfiguratorPriceComponent,
            FeatureLevelDirective,
            ConfiguratorShowMoreComponent,
          ],
        },
        add: {
          imports: [
            MockFocusDirective,
            MockConfiguratorAttributeQuantityComponent,
            MockConfiguratorPriceComponent,
            MockFeatureLevelDirective,
            MockConfiguratorShowMoreComponent,
          ],
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  it('should create', () => {
    createComponentWithData();
    expect(component).toBeTruthy();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'select.cx-required-error-msg'
    );
  });

  it('should render an empty component in case showRequiredErrorMessage$ is `false`', () => {
    createComponentWithData(false);
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'select.cx-required-error-msg'
    );
  });

  it('should render cx-value-label-pair div', () => {
    createComponentWithData();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-value-label-pair'
    );
  });

  it('should render description', () => {
    createComponentWithData();
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

    it('should not display quantity and price in case attribute does not carry quantity', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_NO_QTY;
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-attribute-level-quantity-price'
      );
    });

    it('should display quantity and no price in case value price not present', () => {
      component.attribute.quantity = 5;
      component.attribute.attributePriceTotal = {
        currencyIso: '$',
        formattedValue: '500.00$',
        value: 500,
      };

      const attributeValues = component.attribute.values;
      if (attributeValues) {
        attributeValues[0].selected = false;
        attributeValues[1].selected = true;
      } else {
        fail(ATTRIBUTE_VALUES_MISSING);
      }

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-attribute-level-quantity-price cx-configurator-price'
      );
    });

    it('should display quantity and price in case attribute carries quantity and selected value has price', () => {
      component.attribute.quantity = 5;
      component.attribute.attributePriceTotal = {
        currencyIso: '$',
        formattedValue: '500.00$',
        value: 500,
      };
      if (component.attribute.values) {
        component.attribute.values[1].selected = true;
        component.attribute.values[1].valuePrice = {
          currencyIso: '$',
          formattedValue: '$100.00',
          value: 100,
        };
      } else {
        fail(ATTRIBUTE_VALUES_MISSING);
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
        '.cx-attribute-level-quantity-price cx-configurator-price'
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
      if (component.attribute.values) {
        component.attribute.values[0].valuePrice = {
          currencyIso: '$',
          formattedValue: '$100.00',
          value: 100,
        };
      } else {
        fail(ATTRIBUTE_VALUES_MISSING);
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

    it('should provide input field for date value in case additional input is allowed ', () => {
      component.attribute.uiType =
        Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
      component.attribute.validationType = Configurator.ValidationType.SAP_DATE;
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
        'cx-configurator--label--group1@attribute_1_1'
      );
    });

    it("should contain option elements with 'aria-label' attribute for value without price that defines an accessible name to label the current element", () => {
      let value2;
      if (component.attribute.values) {
        value2 = component.attribute.values[1];
        value2.valuePrice = undefined;
        component.attribute.values[0].selected = false;
        value2.selected = true;
        value2.valuePrice = undefined;
      } else {
        fail(ATTRIBUTE_VALUES_MISSING);
      }
      fixture.detectChanges();
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
          value2?.valueDisplay,
        value2?.valueDisplay
      );
    });

    it("should contain option elements with 'aria-label' attribute for value with price that defines an accessible name to label the current element", () => {
      let value2;
      if (component.attribute.values) {
        value2 = component.attribute.values[1];
        value2.selected = true;
        value2.valuePrice = {
          currencyIso: '$',
          formattedValue: '$100.00',
          value: 100,
        };
      } else {
        fail(ATTRIBUTE_VALUES_MISSING);
      }

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'option',
        undefined,
        1,
        'aria-label',
        'configurator.a11y.selectedValueOfAttributeFullWithPrice attribute:' +
          component.attribute.label +
          ' price:' +
          value2?.valuePrice?.formattedValue +
          ' value:' +
          value2?.valueDisplay,
        value2?.valueDisplay
      );
    });

    it("should contain option elements with 'aria-label' attribute for value with total price that defines an accessible name to label the current element", () => {
      let value2;
      if (component.attribute.values) {
        value2 = component.attribute.values[1];
        value2.selected = true;
        value2.valuePriceTotal = {
          currencyIso: '$',
          formattedValue: '$100.00',
          value: 100,
        };
      } else {
        fail(ATTRIBUTE_VALUES_MISSING);
      }

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'option',
        undefined,
        1,
        'aria-label',
        'configurator.a11y.selectedValueOfAttributeFullWithPrice attribute:' +
          component.attribute.label +
          ' price:' +
          value2?.valuePriceTotal?.formattedValue +
          ' value:' +
          value2?.valueDisplay,
        value2?.valueDisplay
      );
    });
  });
});
