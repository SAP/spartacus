import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { ConfigAttributeRadioButtonComponent } from './config-attribute-radio-button.component';

describe('ConfigAttributeRadioButtonComponent', () => {
  let component: ConfigAttributeRadioButtonComponent;
  let fixture: ComponentFixture<ConfigAttributeRadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAttributeRadioButtonComponent],
      providers: [ConfigUIKeyGeneratorService],
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
      stdAttrCode: 444,
      uiType: Configurator.UiType.RADIOBUTTON,
      quantity: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
