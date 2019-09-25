import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Configurator } from '@spartacus/core';
import { UIKeyGeneratorService } from '../../service/ui-key-generator.service';
import { ConfigAttributeRadioButtonComponent } from './config-attribute-radio-button.component';

describe('ConfigAttributeRadioButtonComponent', () => {
  let component: ConfigAttributeRadioButtonComponent;
  let fixture: ComponentFixture<ConfigAttributeRadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAttributeRadioButtonComponent],
      providers: [UIKeyGeneratorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAttributeRadioButtonComponent);
    component = fixture.componentInstance;
    component.currentAttribute = {
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
