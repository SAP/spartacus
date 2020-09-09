import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Configurator } from '@spartacus/core';
import { ConfiguratorUIKeyGenerator } from '../../../service/configurator-ui-key-generator';
import { ConfiguratorAttributeDropDownComponent } from './configurator-attribute-drop-down.component';

describe('ConfigAttributeDropDownComponent', () => {
  let component: ConfiguratorAttributeDropDownComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguratorAttributeDropDownComponent],
      imports: [ReactiveFormsModule, NgSelectModule],
      providers: [ConfiguratorUIKeyGenerator],
    })
      .overrideComponent(ConfiguratorAttributeDropDownComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorAttributeDropDownComponent);
    component = fixture.componentInstance;
    component.attribute = {
      name: 'attributeName',
      attrCode: 444,
      uiType: Configurator.UiType.DROPDOWN,
      selectedSingleValue: 'selectedValue',
      quantity: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedSingleValue on init', () => {
    expect(component.attributeDropDownForm.value).toEqual('selectedValue');
  });
});
