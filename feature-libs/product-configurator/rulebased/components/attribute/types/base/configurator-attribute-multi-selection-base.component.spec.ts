import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from './configurator-attribute-multi-selection-base.component';
import { ConfiguratorAttributeTypeUtilsService } from './configurator-attribute-type-utils.service';

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

@Component({
  selector: 'cx-configurator-attribute-multi-selection',
  template: 'test-configurator-attribute-multi-selection',
})
class ExampleConfiguratorAttributeMultiSelectionComponent extends ConfiguratorAttributeMultiSelectionBaseComponent {
  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected configAttributeTypeUtilsService: ConfiguratorAttributeTypeUtilsService
  ) {
    super(quantityService, configAttributeTypeUtilsService);
  }
}

describe('ConfiguratorAttributeMultiSelectionBaseComponent', () => {
  let component: ConfiguratorAttributeMultiSelectionBaseComponent;
  let fixture: ComponentFixture<ExampleConfiguratorAttributeMultiSelectionComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExampleConfiguratorAttributeMultiSelectionComponent],
        providers: [
          ConfiguratorAttributeQuantityService,
          ConfiguratorAttributeTypeUtilsService,
        ],
      }).compileComponents();
    })
  );

  function createValue(code: string, name: string, isSelected: boolean) {
    const value: Configurator.Value = {
      valueCode: code,
      name: name,
      selected: isSelected,
    };
    return value;
  }
  let values: Configurator.Value[];

  beforeEach(() => {
    const value1 = createValue('1', 'val1', true);
    const value2 = createValue('2', 'val2', false);
    const value3 = createValue('3', 'val3', true);
    values = [value1, value2, value3];

    fixture = TestBed.createComponent(
      ExampleConfiguratorAttributeMultiSelectionComponent
    );

    component = fixture.componentInstance;

    component.ownerKey = 'theOwnerKey';
    component.attribute = {
      dataType: Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL,
      name: 'attributeName',
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

  describe('withQuantityOnAttributeLevel', () => {
    it('should allow quantity on attribute level when specified as attribute level', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL;
      fixture.detectChanges();
      expect(component.withQuantityOnAttributeLevel).toBe(true);
    });

    it('should not allow quantity on attribute level when specified as value level', () => {
      (component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL),
        fixture.detectChanges();
      expect(component.withQuantityOnAttributeLevel).toBe(false);
    });
  });

  describe('disableQuantityActions', () => {
    it('should allow quantity actions', () => {
      expect(component.disableQuantityActions).toBe(false);
    });
  });

  describe('extractQuantityParameters', () => {
    it('should set initial quantity and allow zero', () => {
      const quantityOptions: ConfiguratorAttributeQuantityComponentOptions = component.extractQuantityParameters(
        2,
        true
      );
      expect(quantityOptions.initialQuantity).toBe(2);
      expect(quantityOptions.allowZero).toBe(true);
    });

    it('should set allow zero from attribute, if undefined', () => {
      const quantityOptions: ConfiguratorAttributeQuantityComponentOptions = component.extractQuantityParameters(
        1
      );
      expect(quantityOptions.allowZero).toBe(false);
    });
  });

  describe('onHandleAttributeQuantity', () => {
    it('should call emit of selectionChange', () => {
      const quantity = 2;
      spyOn(component.selectionChange, 'emit').and.callThrough();
      component['onHandleQuantity'](quantity);
      expect(component.selectionChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          changedAttribute: jasmine.objectContaining({
            ...component.attribute,
            quantity,
          }),
          ownerKey: component.ownerKey,
          updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
        })
      );
    });
  });

  describe('extractPriceFormulaParameters', () => {
    it('should return ConfiguratorPriceComponentOptions object', () => {
      component.attribute.attributePriceTotal = {
        currencyIso: '$',
        formattedValue: '$1000',
        value: 1000,
      };
      fixture.detectChanges();
      const priceFormulaParameters = component.extractPriceFormulaParameters();
      expect(priceFormulaParameters?.quantity).toBe(0);
      expect(priceFormulaParameters?.price?.value).toBe(0);
      expect(priceFormulaParameters?.price?.currencyIso).toBe('');
      expect(priceFormulaParameters?.priceTotal).toBe(
        component.attribute.attributePriceTotal
      );
      expect(priceFormulaParameters?.isLightedUp).toBe(true);
    });
  });

  describe('extractValuePriceFormulaParameters', () => {
    it('should return price formula parameters', () => {
      const value = createTestValue(100, 100, true);
      value.quantity = 5;
      const priceFormulaParameters = component.extractValuePriceFormulaParameters(
        value
      );
      expect(priceFormulaParameters?.quantity).toBe(value?.quantity);
      expect(priceFormulaParameters?.price?.value).toBe(
        value?.valuePrice?.value
      );
      expect(priceFormulaParameters?.priceTotal?.value).toBe(
        value?.valuePriceTotal?.value
      );
      expect(priceFormulaParameters?.isLightedUp).toBe(value?.selected);
    });
  });

  describe('assembleValuesForMultiSelectAttributes', () => {
    it('should assemble values from a checkbox list into an attribute value', () => {
      const controlArray = new Array<FormControl>();
      const control1 = new FormControl(true);
      const control2 = new FormControl(false);
      controlArray.push(control1, control2);
      const attribute: Configurator.Attribute = {
        name: 'attr',
        values: [{ valueCode: 'b' }, { name: 'blue', valueCode: 'a' }],
      };

      const values: Configurator.Value[] = component.assembleValuesForMultiSelectAttributes(
        controlArray,
        attribute
      );
      if (attribute.values) {
        expect(values.length).toBe(2);
        expect(values[0].valueCode).toBe(attribute.values[0].valueCode);
        expect(values[0].selected).toBe(true);
        expect(values[1].name).toBe(attribute.values[1].name);
        expect(values[1].selected).toBe(false);
      } else fail();
    });

    it('should gracefully handle situation that control array has values not present in attribute', () => {
      const controlArray = new Array<FormControl>();
      const control1 = new FormControl(true);
      const control2 = new FormControl(false);
      controlArray.push(control1, control2);
      const attribute: Configurator.Attribute = {
        name: 'attr',
        values: [{ name: 'blue', valueCode: 'a' }],
      };

      const values: Configurator.Value[] = component.assembleValuesForMultiSelectAttributes(
        controlArray,
        attribute
      );
      expect(values.length).toBe(1);
    });
  });
});
