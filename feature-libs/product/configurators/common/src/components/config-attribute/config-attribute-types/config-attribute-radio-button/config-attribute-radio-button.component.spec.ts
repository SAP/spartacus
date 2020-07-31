import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGenerator } from '../../../service/config-ui-key-generator';
import { ConfigAttributeRadioButtonComponent } from './config-attribute-radio-button.component';

describe('ConfigAttributeRadioButtonComponent', () => {
  let component: ConfigAttributeRadioButtonComponent;
  let fixture: ComponentFixture<ConfigAttributeRadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAttributeRadioButtonComponent],
      imports: [ReactiveFormsModule],
      providers: [ConfigUIKeyGenerator],
    })
      .overrideComponent(ConfigAttributeRadioButtonComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAttributeRadioButtonComponent);
    component = fixture.componentInstance;
    component.attribute = {
      name: 'valueName',
      attrCode: 444,
      uiType: Configurator.UiType.RADIOBUTTON,
      selectedSingleValue: 'selectedValue',
      quantity: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedSingleValue on init', () => {
    expect(component.attributeRadioButtonForm.value).toEqual('selectedValue');
  });
});
