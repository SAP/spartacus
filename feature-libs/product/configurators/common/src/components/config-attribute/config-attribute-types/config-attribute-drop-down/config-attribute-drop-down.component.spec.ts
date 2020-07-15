import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../../../service/config-ui-key-generator.service';
import { ConfigAttributeDropDownComponent } from './config-attribute-drop-down.component';

describe('ConfigAttributeDropDownComponent', () => {
  let component: ConfigAttributeDropDownComponent;
  let fixture: ComponentFixture<ConfigAttributeDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAttributeDropDownComponent],
      imports: [ReactiveFormsModule, NgSelectModule],
      providers: [ConfigUIKeyGeneratorService],
    })
      .overrideComponent(ConfigAttributeDropDownComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAttributeDropDownComponent);
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
