import { ConfigAttributeCheckBoxComponent } from './config-attribute-checkbox.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { Configurator } from 'projects/core/src/model/configurator.model';
import { By } from '@angular/platform-browser';

describe('ConfigAttributeCheckBoxComponent', () => {
  let component: ConfigAttributeCheckBoxComponent;
  let fixture: ComponentFixture<ConfigAttributeCheckBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAttributeCheckBoxComponent],
      imports: [ReactiveFormsModule, NgSelectModule],
      providers: [ConfigUIKeyGeneratorService],
    })
      .overrideComponent(ConfigAttributeCheckBoxComponent, {
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

    fixture = TestBed.createComponent(ConfigAttributeCheckBoxComponent);
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
