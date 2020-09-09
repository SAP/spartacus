import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorUIKeyGenerator } from '../../../service/configurator-ui-key-generator';
import { Configurator } from './../../../../core/model/configurator.model';
import { ConfiguratorAttributeRadioButtonComponent } from './configurator-attribute-radio-button.component';

describe('ConfigAttributeRadioButtonComponent', () => {
  let component: ConfiguratorAttributeRadioButtonComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeRadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguratorAttributeRadioButtonComponent],
      imports: [ReactiveFormsModule],
      providers: [ConfiguratorUIKeyGenerator],
    })
      .overrideComponent(ConfiguratorAttributeRadioButtonComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeRadioButtonComponent
    );
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
