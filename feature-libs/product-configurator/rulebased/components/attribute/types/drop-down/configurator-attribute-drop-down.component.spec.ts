import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonConfiguratorTestUtilsService } from '@spartacus/product-configurator/common';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { ConfiguratorAttributeDropDownComponent } from './configurator-attribute-drop-down.component';

function createValue(code: string, name: string, isSelected: boolean) {
  const value: Configurator.Value = {
    valueCode: code,
    name: name,
    selected: isSelected,
  };
  return value;
}

describe('ConfigAttributeDropDownComponent', () => {
  let component: ConfiguratorAttributeDropDownComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeDropDownComponent>;
  let htmlElem: HTMLElement;

  const ownerKey = 'theOwnerKey';
  const name = 'theName';
  const groupId = 'theGroupId';
  const selectedValue = 'selectedValue';

  const value1 = createValue('1', 'val1', true);
  const value2 = createValue('2', 'val2', false);
  const value3 = createValue('3', 'val3', false);

  const values: Configurator.Value[] = [value1, value2, value3];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguratorAttributeDropDownComponent],
        imports: [ReactiveFormsModule, NgSelectModule],
        providers: [ConfiguratorAttributeBaseComponent],
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
    component.onSelect();
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

  it('should call emit of selectionChange onHandleQuantity', () => {
    component.ownerKey = ownerKey;

    spyOn(component.selectionChange, 'emit').and.callThrough();

    component.onHandleQuantity(2);

    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        changedAttribute: jasmine.objectContaining({
          name: name,
          uiType: Configurator.UiType.DROPDOWN,
          groupId: groupId,
          selectedSingleValue: component.attributeDropDownForm.value,
        }),
        ownerKey: ownerKey,
        updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
      })
    );
  });

  it('should call onHandleQuantity of event onChangeQuantity', () => {
    spyOn(component, 'onHandleQuantity');

    const quantity = { quantity: 2 };

    component.onChangeQuantity(quantity);

    expect(component.onHandleQuantity).toHaveBeenCalled();
  });

  it('should call onSelect of event onChangeQuantity', () => {
    spyOn(component, 'onSelect');

    const quantity = { quantity: 0 };

    component.onChangeQuantity(quantity);

    expect(component.onSelect).toHaveBeenCalled();
  });

  it('should not display attribute quantity when dataType is no quantity', () => {
    component.attribute.dataType = Configurator.DataType.USER_SELECTION_NO_QTY;

    fixture.detectChanges();

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-configurator-attribute-quantity'
    );
  });

  it('should display attribute quantity when dataType is with attribute quantity', () => {
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.form-group'
    );
  });

  it('should allow quantity', () => {
    expect(component.withQuantity).toBe(true);
  });

  it('should not allow quantity when service is missing ', () => {
    component['quantityService'] = undefined;
    expect(component.withQuantity).toBe(false);
  });

  it('should allow quantity actions', () => {
    expect(component.disableQuantityActions).toBe(false);
  });

  it('should not allow quantity actions when service is missing ', () => {
    component['quantityService'] = undefined;
    expect(component.disableQuantityActions).toBe(true);
  });
});
