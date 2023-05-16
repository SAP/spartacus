import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { I18nTestingModule, TranslationService } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfigFormUpdateEvent } from '../../../form';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from './configurator-attribute-single-selection-base.component';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { StoreModule } from '@ngrx/store';
import { CONFIGURATOR_FEATURE } from '../../../../core/state/configurator-state';
import { getConfiguratorReducers } from '../../../../core/state/reducers';

function createValue(code: string, name: string, isSelected: boolean) {
  const value: Configurator.Value = {
    valueCode: code,
    valueDisplay: name,
    name: name,
    selected: isSelected,
  };
  return value;
}
const createTestValue = (
  price: number | undefined,
  total: number | undefined,
  selected = true
): Configurator.Value => ({
  valueCode: 'a',
  selected,
  valuePrice: {
    currencyIso: '$',
    formattedValue: price ? '$' + price : '',
    value: price ?? 0,
  },
  valuePriceTotal: {
    currencyIso: '$',
    formattedValue: price ? '$' + price : '',
    value: total ?? 0,
  },
});

class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
}

@Component({
  selector: 'cx-configurator-attribute-single-selection',
  template: 'test-configurator-attribute-single-selection',
})
class ExampleConfiguratorAttributeSingleSelectionComponent extends ConfiguratorAttributeSingleSelectionBaseComponent {
  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected translation: TranslationService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {
    super(
      quantityService,
      translation,
      attributeComponentContext,
      configuratorCommonsService
    );
  }
}

describe('ConfiguratorAttributeSingleSelectionBaseComponent', () => {
  let component: ConfiguratorAttributeSingleSelectionBaseComponent;
  let fixture: ComponentFixture<ExampleConfiguratorAttributeSingleSelectionComponent>;
  let configuratorAttributeQuantityService: ConfiguratorAttributeQuantityService;

  const changedSelectedValue = 'changedSelectedValue';
  const ownerKey = 'theOwnerKey';
  const groupId = 'theGroupId';
  const attributeQuantity = 4;
  const selectedValue = 'a';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExampleConfiguratorAttributeSingleSelectionComponent],
        imports: [
          I18nTestingModule,
          StoreModule.forRoot({}),
          StoreModule.forFeature(CONFIGURATOR_FEATURE, getConfiguratorReducers),
        ],
        providers: [
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
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ExampleConfiguratorAttributeSingleSelectionComponent
    );
    configuratorAttributeQuantityService = TestBed.inject(
      ConfiguratorAttributeQuantityService
    );
    spyOn(
      configuratorAttributeQuantityService,
      'withQuantity'
    ).and.callThrough();
    spyOn(
      configuratorAttributeQuantityService,
      'disableQuantityActions'
    ).and.callThrough();

    component = fixture.componentInstance;

    component.attribute = {
      name: 'attrName',
      attrCode: 444,
      dataType: Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
      selectedSingleValue: selectedValue,
      groupId: groupId,
    };
    component.ownerKey = ownerKey;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSelect', () => {
    it('should call emit of selectionChange onSelect', () => {
      spyOn(
        component['configuratorCommonsService'],
        'updateConfiguration'
      ).and.callThrough();
      component.onSelect(changedSelectedValue);
      expect(
        component['configuratorCommonsService'].updateConfiguration
      ).toHaveBeenCalledWith(
        ownerKey,
        { ...component.attribute, selectedSingleValue: changedSelectedValue },
        Configurator.UpdateType.ATTRIBUTE
      );
    });
  });

  describe('onSelectAdditionalValue', () => {
    const configFormUpdateEvent: ConfigFormUpdateEvent = {
      ownerKey: ownerKey,
      changedAttribute: { name: 'Attr' },
    };
    it('should not call emit of selectionChange in case no user input is present', () => {
      spyOn(
        component['configuratorCommonsService'],
        'updateConfiguration'
      ).and.callThrough();
      component.onSelectAdditionalValue(configFormUpdateEvent);
      expect(
        component['configuratorCommonsService'].updateConfiguration
      ).toHaveBeenCalledTimes(0);
    });

    it('should call facade update in case user input is present', () => {
      configFormUpdateEvent.changedAttribute.userInput = 'userInput';

      spyOn(
        component['configuratorCommonsService'],
        'updateConfiguration'
      ).and.callThrough();
      component.onSelectAdditionalValue(configFormUpdateEvent);
      expect(
        component['configuratorCommonsService'].updateConfiguration
      ).toHaveBeenCalledWith(
        ownerKey,
        configFormUpdateEvent.changedAttribute,
        Configurator.UpdateType.ATTRIBUTE
      );
    });
  });

  describe('onHandleQuantity', () => {
    it('should call facade update onHandleQuantity', () => {
      const quantity = 2;
      spyOn(
        component['configuratorCommonsService'],
        'updateConfiguration'
      ).and.callThrough();
      component.onHandleQuantity(quantity);
      expect(
        component['configuratorCommonsService'].updateConfiguration
      ).toHaveBeenCalledWith(
        ownerKey,
        { ...component.attribute, quantity: 2 },
        Configurator.UpdateType.ATTRIBUTE_QUANTITY
      );
    });
  });

  describe('onChangeQuantity', () => {
    it('should call emit of onSelect(empty)', () => {
      spyOn(
        component['configuratorCommonsService'],
        'updateConfiguration'
      ).and.callThrough();
      component.onChangeQuantity(undefined);
      expect(
        component['configuratorCommonsService'].updateConfiguration
      ).toHaveBeenCalledWith(
        ownerKey,
        { ...component.attribute, selectedSingleValue: '' },
        Configurator.UpdateType.ATTRIBUTE
      );
    });

    it('should call form setValue with zero', () => {
      const form = new UntypedFormControl('');
      spyOn(form, 'setValue').and.callThrough();
      component.onChangeQuantity(undefined, form);
      expect(form.setValue).toHaveBeenCalledWith('0');
    });

    it('should call facade update onChangeQuantity', () => {
      const quantity = 10;
      spyOn(
        component['configuratorCommonsService'],
        'updateConfiguration'
      ).and.callThrough();
      component.onChangeQuantity(quantity);
      expect(
        component['configuratorCommonsService'].updateConfiguration
      ).toHaveBeenCalledWith(
        ownerKey,
        { ...component.attribute, quantity: 10 },
        Configurator.UpdateType.ATTRIBUTE_QUANTITY
      );
    });
  });

  describe('selected value price calculation', () => {
    describe('should return number', () => {
      it('on selected value only', () => {
        component.attribute = {
          name: 'testAttribute',
          values: [createTestValue(100, 100)],
        };
        fixture.detectChanges();

        const valuePrice = component['getSelectedValuePrice']();
        expect(valuePrice?.value).toEqual(100);
      });

      it('on selected value', () => {
        component.attribute = {
          name: 'testAttribute',
          values: [createTestValue(100, 100), createTestValue(100, 100, false)],
        };
        fixture.detectChanges();

        const valuePrice = component['getSelectedValuePrice']();
        expect(valuePrice?.value).toEqual(100);
      });
    });

    describe('should not return price', () => {
      it('without values property', () => {
        component.attribute = {
          name: 'testAttribute',
        };
        fixture.detectChanges();

        const valuePrice = component['getSelectedValuePrice']();
        expect(valuePrice).toBeUndefined();
      });

      it('without values', () => {
        component.attribute = {
          name: 'testAttribute',
          values: [],
        };
        fixture.detectChanges();

        const valuePrice = component['getSelectedValuePrice']();
        expect(valuePrice).toBeUndefined();
      });

      it('without price property', () => {
        component.attribute = {
          name: 'testAttribute',
          values: [createTestValue(undefined, undefined)],
        };
        fixture.detectChanges();

        const valuePrice = component['getSelectedValuePrice']();
        expect(valuePrice?.value).toBe(0);
      });
    });
  });

  describe('extractQuantityParameters', () => {
    it('should return 0 as initial if no selected value is specified  ', () => {
      component.attribute.selectedSingleValue = undefined;
      fixture.detectChanges();
      const quantityParameters = component.extractQuantityParameters();
      expect(quantityParameters.initialQuantity).toBe(0);
    });

    it('should return 0 as initial if a selected value but no attribute quantity is specified', () => {
      fixture.detectChanges();
      const quantityParameters = component.extractQuantityParameters();
      expect(quantityParameters.initialQuantity).toBe(0);
    });

    it('should return 0 as initial if form value equals zero', () => {
      const form = new UntypedFormControl('');
      form.setValue('0');
      fixture.detectChanges();
      const quantityParameters = component.extractQuantityParameters(form);
      expect(quantityParameters.initialQuantity).toBe(0);
    });

    it('should return attribute quantity as initial if a selected value is specified', () => {
      component.loading$ = new BehaviorSubject<boolean>(true);
      component.attribute.quantity = attributeQuantity;
      fixture.detectChanges();
      const quantityParameters = component.extractQuantityParameters();
      expect(quantityParameters.initialQuantity).toBe(attributeQuantity);
    });

    it('should return attribute quantity as initial if form value does not equal zero', () => {
      const form = new UntypedFormControl('');
      form.setValue('5');
      component.attribute.quantity = attributeQuantity;
      fixture.detectChanges();
      const quantityParameters = component.extractQuantityParameters(form);
      expect(quantityParameters.initialQuantity).toBe(attributeQuantity);
    });

    it('should take over loading observable into result ', () => {
      component.loading$.next(false);
      const quantityOptions = component.extractQuantityParameters();
      quantityOptions.disableQuantityActions$?.subscribe((disable) =>
        expect(disable).toBe(false)
      );
    });
  });

  describe('extractPriceFormulaParameters', () => {
    it('should return ConfiguratorPriceComponentOptions object', () => {
      component.attribute.quantity = 100;
      component.attribute.values = [
        createTestValue(100, 100),
        createTestValue(100, 100, false),
      ];
      component.attribute.attributePriceTotal = {
        currencyIso: '$',
        formattedValue: '$1000',
        value: 1000,
      };
      fixture.detectChanges();
      const priceFormulaParameters = component.extractPriceFormulaParameters();
      expect(priceFormulaParameters.quantity).toBe(
        component.attribute.quantity
      );
      expect(priceFormulaParameters.price).toBe(
        component.attribute.values[0].valuePrice
      );
      expect(priceFormulaParameters.priceTotal).toBe(
        component.attribute.attributePriceTotal
      );
      expect(priceFormulaParameters.isLightedUp).toBe(true);
    });
  });

  describe('extractValuePriceFormulaParameters', () => {
    it('should return empty result for undefined input', () => {
      expect(component.extractValuePriceFormulaParameters(undefined)).toEqual({
        price: undefined,
        isLightedUp: false,
      });
    });

    it('should return price formula parameters', () => {
      const value = createTestValue(100, 100, true);
      const priceFormulaParameters =
        component.extractValuePriceFormulaParameters(value);
      expect(priceFormulaParameters?.price?.value).toBe(
        value?.valuePrice?.value
      );
      expect(priceFormulaParameters?.isLightedUp).toBe(value?.selected);
    });
  });

  describe('withQuantity', () => {
    it('should not allow quantity', () => {
      component.attribute.uiType = Configurator.UiType.NOT_IMPLEMENTED;
      component.attribute.dataType = Configurator.DataType.NOT_IMPLEMENTED;
      fixture.detectChanges();
      expect(component.withQuantity).toBe(false);
    });

    it('should allow quantity', () => {
      component.attribute.uiType = Configurator.UiType.RADIOBUTTON_PRODUCT;
      fixture.detectChanges();
      expect(component.withQuantity).toBe(true);
    });
  });

  describe('disableQuantityActions', () => {
    it('should allow quantity actions', () => {
      expect(component.disableQuantityActions).toBe(false);
    });
  });

  describe('IsAdditionalValueNumeric', () => {
    it('should return true for UI type Radio button additional input and validation type numeric', () => {
      component.attribute.uiType =
        Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT;
      component.attribute.validationType = Configurator.ValidationType.NUMERIC;
      expect(component.isAdditionalValueNumeric).toBe(true);
    });

    it('should return true for UI type Radio button additional input and validation type  numeric', () => {
      component.attribute.uiType =
        Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
      component.attribute.validationType = Configurator.ValidationType.NUMERIC;
      expect(component.isAdditionalValueNumeric).toBe(true);
    });
  });

  describe('IsAdditionalValueAlphaNumeric', () => {
    it('should return true for UI type Radio button additional input and validation type alpha numeric', () => {
      component.attribute.uiType =
        Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT;
      component.attribute.validationType = Configurator.ValidationType.NONE;
      expect(component.isAdditionalValueAlphaNumeric).toBe(true);
    });

    it('should return true for UI type Dropdown box additional input and validation type alpha numeric', () => {
      component.attribute.uiType =
        Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
      component.attribute.validationType = Configurator.ValidationType.NONE;
      expect(component.isAdditionalValueAlphaNumeric).toBe(true);
    });
  });
  describe('getAriaLabel', () => {
    it('should return aria label for additional value', () => {
      expect(component.getAdditionalValueAriaLabel()).toEqual(
        'configurator.a11y.additionalValue'
      );
    });
    it('should return aria label of value with total price', () => {
      let attributeWithTotalPrice: Configurator.Attribute = {
        name: 'attribute with total price',
        label: 'attribute with total price',
      };
      let price: Configurator.PriceDetails = {
        currencyIso: '$',
        formattedValue: '$100.00',
        value: 100,
      };
      let priceTotal: Configurator.PriceDetails = {
        currencyIso: '$',
        formattedValue: '$100.00',
        value: 100,
      };
      const valueWithValuePriceTotal = createValue(
        '1',
        'value with total price',
        true
      );
      valueWithValuePriceTotal.valuePriceTotal = priceTotal;
      valueWithValuePriceTotal.valuePrice = price;

      expect(
        component.getAriaLabelWithoutAdditionalValue(
          valueWithValuePriceTotal,
          attributeWithTotalPrice
        )
      ).toEqual(
        'configurator.a11y.selectedValueOfAttributeFullWithPrice attribute:' +
          attributeWithTotalPrice.label +
          ' price:' +
          valueWithValuePriceTotal.valuePrice?.formattedValue +
          ' value:' +
          valueWithValuePriceTotal.valueDisplay
      );
    });

    it('should return aria label for value with price', () => {
      let attributeWithValuePrice: Configurator.Attribute = {
        name: 'attribute with value price',
        label: 'attribute with value price',
      };
      let price: Configurator.PriceDetails = {
        currencyIso: '$',
        formattedValue: '$100.00',
        value: 100,
      };
      const valueWithValuePrice = createValue(
        '1',
        'value with value price',
        true
      );
      valueWithValuePrice.valuePrice = price;

      expect(
        component.getAriaLabelWithoutAdditionalValue(
          valueWithValuePrice,
          attributeWithValuePrice
        )
      ).toEqual(
        'configurator.a11y.selectedValueOfAttributeFullWithPrice attribute:' +
          attributeWithValuePrice.label +
          ' price:' +
          valueWithValuePrice.valuePrice?.formattedValue +
          ' value:' +
          valueWithValuePrice.valueDisplay
      );
    });

    it('should return aria label for value without price', () => {
      let attributeWithOutPrice: Configurator.Attribute = {
        name: 'attribute without price',
        label: 'attribute without value price',
      };
      const valueWithOutPrice = createValue('1', 'value without price', true);

      expect(
        component.getAriaLabelWithoutAdditionalValue(
          valueWithOutPrice,
          attributeWithOutPrice
        )
      ).toEqual(
        'configurator.a11y.selectedValueOfAttributeFull attribute:' +
          attributeWithOutPrice.label +
          ' value:' +
          valueWithOutPrice.valueDisplay
      );
    });

    it('should return aria label for value with price and attribute additional value', () => {
      let attributeWithValuePrice: Configurator.Attribute = {
        name: 'attribute with value price',
        label: 'attribute with value price',
      };
      let price: Configurator.PriceDetails = {
        currencyIso: '$',
        formattedValue: '$100.00',
        value: 100,
      };
      const valueWithValuePrice = createValue(
        '1',
        'value with value price',
        true
      );
      valueWithValuePrice.valuePrice = price;
      component.attribute.uiType =
        Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT ||
        Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT;
      component.attribute.validationType = Configurator.ValidationType.NONE;
      fixture.detectChanges();
      expect(
        component.getAriaLabel(valueWithValuePrice, attributeWithValuePrice)
      ).toEqual(
        'configurator.a11y.selectedValueOfAttributeFullWithPrice attribute:' +
          attributeWithValuePrice.label +
          ' price:' +
          valueWithValuePrice.valuePrice?.formattedValue +
          ' value:' +
          valueWithValuePrice.valueDisplay +
          ' ' +
          'configurator.a11y.additionalValue'
      );
    });
  });
});
