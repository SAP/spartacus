import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfiguratorUIKeyGenerator } from '../../../service/configurator-ui-key-generator';
import { Configurator } from './../../../../core/model/configurator.model';
import { ConfiguratorAttributeCheckBoxComponent } from './configurator-attribute-checkbox.component';

describe('ConfigAttributeCheckBoxComponent', () => {
  let component: ConfiguratorAttributeCheckBoxComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeCheckBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguratorAttributeCheckBoxComponent],
      imports: [ReactiveFormsModule, NgSelectModule],
      providers: [ConfiguratorUIKeyGenerator],
    })
      .overrideComponent(ConfiguratorAttributeCheckBoxComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  function createValue(code: string, name: string, isSelected: boolean) {
    const value: Configurator.Value = {
      valueCode: code,
      name: name,
      selected: isSelected,
    };
    return value;
  }

  beforeEach(() => {
    const value1 = createValue('1', 'val1', false);
    const values: Configurator.Value[] = [value1];

    fixture = TestBed.createComponent(ConfiguratorAttributeCheckBoxComponent);
    component = fixture.componentInstance;

    component.attribute = {
      name: 'attributeName',
      attrCode: 444,
      uiType: Configurator.UiType.CHECKBOX,
      values: values,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an entry after init with empty value', () => {
    expect(component.attributeCheckBoxForm.value).toBeFalsy();
  });

  it('should select and deselect a checkbox value', () => {
    const checkboxId =
      '#cx-config--checkBox--' +
      component.attribute.name +
      '--' +
      component.attribute.values[0].valueCode;
    const valueToSelect = fixture.debugElement.query(By.css(checkboxId))
      .nativeElement;
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
});
