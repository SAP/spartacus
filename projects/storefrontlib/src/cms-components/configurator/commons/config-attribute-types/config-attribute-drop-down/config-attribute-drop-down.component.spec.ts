import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { ConfigAttributeDropDownComponent } from './config-attribute-drop-down.component';

describe('ConfigAttributeRadioButtonComponent', () => {
  let component: ConfigAttributeDropDownComponent;
  let fixture: ComponentFixture<ConfigAttributeDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAttributeDropDownComponent],
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
      name: 'valueName',
      stdAttrCode: 444,
      uiType: Configurator.UiType.DROPDOWN,
      quantity: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
