import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Configurator } from '@spartacus/core';
import { UIKeyGeneratorService } from '../../service/ui-key-generator.service';
import { AttributeRadioButtonComponent } from './attribute-radio-button.component';

describe('AttributeRadioButtonComponent', () => {
  let component: AttributeRadioButtonComponent;
  let fixture: ComponentFixture<AttributeRadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttributeRadioButtonComponent],
      providers: [UIKeyGeneratorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeRadioButtonComponent);
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
