import { ConfigAttributeCheckBoxListComponent } from './config-attribute-checkbox-list.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { Configurator } from 'projects/core/src/model/configurator.model';

describe('ConfigAttributeDropDownComponent', () => {
  let component: ConfigAttributeCheckBoxListComponent;
  let fixture: ComponentFixture<ConfigAttributeCheckBoxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAttributeCheckBoxListComponent],
      imports: [ReactiveFormsModule, NgSelectModule],
      providers: [ConfigUIKeyGeneratorService],
    })
      .overrideComponent(ConfigAttributeCheckBoxListComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    const value1: Configurator.Value = {
      valueCode: '1',
      name: 'val1',
      selected: true,
    };
    const value2: Configurator.Value = {
      valueCode: '2',
      name: 'val2',
      selected: false,
    };
    const value3: Configurator.Value = {
      valueCode: '3',
      name: 'val3',
      selected: true,
    };

    let localvalues: Configurator.Value[];
    localvalues = [];

    localvalues.push(value1, value2, value3);

    fixture = TestBed.createComponent(ConfigAttributeCheckBoxListComponent);
    component = fixture.componentInstance;

    component.attribute = {
      name: 'attributeName',
      attrCode: 444,
      uiType: Configurator.UiType.CHECKBOX,
      values: localvalues,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('forms should have 3 entries after init with first and last value filled', () => {
    expect(component.attributeCheckBoxForms.length).toBe(3);
    expect(component.attributeCheckBoxForms[0].value).toBe(true);
    expect(component.attributeCheckBoxForms[1].value).toBe(false);
    expect(component.attributeCheckBoxForms[2].value).toBe(true);
  });
});
