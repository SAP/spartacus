import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from './configurator-attribute-single-selection-base.component';

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
  selector: 'cx-configurator-attribute-single-selection',
  template: 'test-configurator-attribute-single-selection',
})
class ExampleConfiguratorAttributeSingleSelectionComponent extends ConfiguratorAttributeSingleSelectionBaseComponent {
  constructor(protected quantityService: ConfiguratorAttributeQuantityService) {
    super(quantityService);
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
        providers: [ConfiguratorAttributeQuantityService],
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
      spyOn(component.selectionChange, 'emit').and.callThrough();
      component.onSelect(changedSelectedValue);
      expect(component.selectionChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          ownerKey: ownerKey,
          changedAttribute: jasmine.objectContaining({
            selectedSingleValue: changedSelectedValue,
            groupId: groupId,
          }),
          updateType: Configurator.UpdateType.ATTRIBUTE,
        })
      );
    });
  });

  describe('onHandleQuantity', () => {
    it('should call emit of selectionChange onHandleQuantity', () => {
      const quantity = 2;
      spyOn(component.selectionChange, 'emit').and.callThrough();
      component.onHandleQuantity(quantity);

      expect(component.selectionChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          changedAttribute: jasmine.objectContaining({
            selectedSingleValue: selectedValue,
            groupId: groupId,
            quantity,
          }),
          ownerKey: ownerKey,
          updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
        })
      );
    });
  });

  describe('onChangeQuantity', () => {
    it('should call emit of onSelect(empty)', () => {
      spyOn(component.selectionChange, 'emit').and.callThrough();
      component.onChangeQuantity(undefined);
      expect(component.selectionChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          ownerKey: ownerKey,
          changedAttribute: jasmine.objectContaining({
            selectedSingleValue: '',
          }),
          updateType: Configurator.UpdateType.ATTRIBUTE,
        })
      );
    });

    it('should call form setValue with zero', () => {
      const form = new FormControl('');
      spyOn(form, 'setValue').and.callThrough();
      component.onChangeQuantity(undefined, form);
      expect(form.setValue).toHaveBeenCalledWith('0');
    });

    it('should call emit of onHandleQuantity', () => {
      const quantity = 10;
      spyOn(component.selectionChange, 'emit').and.callThrough();
      component.onChangeQuantity(quantity);
      expect(component.selectionChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          changedAttribute: jasmine.objectContaining({
            selectedSingleValue: selectedValue,
            quantity,
          }),
          ownerKey: ownerKey,
          updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
        })
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
      const form = new FormControl('');
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
      const form = new FormControl('');
      form.setValue('5');
      component.attribute.quantity = attributeQuantity;
      fixture.detectChanges();
      const quantityParameters = component.extractQuantityParameters(form);
      expect(quantityParameters.initialQuantity).toBe(attributeQuantity);
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
    it('should return `undefined`', () => {
      expect(
        component.extractValuePriceFormulaParameters(undefined)
      ).toBeUndefined();
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
});
