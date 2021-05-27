import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from './configurator-attribute-multi-selection-base.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';

@Component({
  selector: 'cx-configurator-attribute-multi-selection',
})
class ExampleConfiguratorAttributeMultiSelectionComponent extends ConfiguratorAttributeMultiSelectionBaseComponent {
  constructor(protected quantityService: ConfiguratorAttributeQuantityService) {
    super(quantityService);
  }
}

describe('ConfiguratorAttributeMultiSelectionBaseComponent', () => {
  let component: ConfiguratorAttributeMultiSelectionBaseComponent;
  let fixture: ComponentFixture<ExampleConfiguratorAttributeMultiSelectionComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExampleConfiguratorAttributeMultiSelectionComponent],
        providers: [ConfiguratorAttributeQuantityService],
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

  describe('withQuantity', () => {
    it('should allow quantity', () => {
      expect(component.withQuantity).toBe(true);
    });

    // TODO(#11681):remove this test when the quantityService will be a required dependency
    it('should not allow quantity when service is missing ', () => {
      component['quantityService'] = undefined;
      expect(component.withQuantity).toBe(false);
    });
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

    // TODO(#11681):remove this test when the quantityService will be a required dependency
    it('should not allow quantity on attribute level when service is missing ', () => {
      component['quantityService'] = undefined;
      expect(component.withQuantityOnAttributeLevel).toBe(false);
    });
  });

  describe('disableQuantityActions', () => {
    it('should allow quantity actions', () => {
      expect(component.disableQuantityActions).toBe(false);
    });

    // TODO(#11681):remove this test when the quantityService will be a required dependency
    it('should not allow quantity actions when service is missing ', () => {
      component['quantityService'] = undefined;
      expect(component.disableQuantityActions).toBe(true);
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
      component['onHandleAttributeQuantity'](quantity);
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
});
