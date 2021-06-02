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
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeDropDownComponent } from './configurator-attribute-drop-down.component';

function createValue(code: string, name: string, isSelected: boolean) {
  const value: Configurator.Value = {
    valueCode: code,
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

describe('ConfigAttributeDropDownComponent', () => {
  let component: ConfiguratorAttributeDropDownComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeDropDownComponent>;

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
        declarations: [
          ConfiguratorAttributeDropDownComponent,
          MockFocusDirective,
          MockConfiguratorAttributeQuantityComponent,
        ],
        imports: [ReactiveFormsModule, NgSelectModule],
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
});
