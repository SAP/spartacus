import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Configurator } from '@spartacus/core';
import { ConfigFormUpdateEvent } from '../../config-form/config-form.event';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { ConfigAttributeNumericInputFieldComponent } from './config-attribute-numeric-input-field.component';

describe('ConfigAttributeInputFieldComponent', () => {
  let component: ConfigAttributeNumericInputFieldComponent;
  const userInput = '345';
  let fixture: ComponentFixture<ConfigAttributeNumericInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAttributeNumericInputFieldComponent],
      imports: [ReactiveFormsModule],
      providers: [ConfigUIKeyGeneratorService],
    })
      .overrideComponent(ConfigAttributeNumericInputFieldComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfigAttributeNumericInputFieldComponent
    );
    component = fixture.componentInstance;
    component.attribute = {
      name: 'attributeName',
      uiType: Configurator.UiType.STRING,
      userInput: userInput,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value on init', () => {
    expect(component.attributeInputForm.value).toEqual(userInput);
  });

  it('should be able to create an event from the user input', () => {
    const event: ConfigFormUpdateEvent = component.createEventFromInput();
    expect(event).toBeDefined();
    expect(event.changedAttribute).toBeDefined();
    expect(event.changedAttribute.userInput).toBe(userInput);
  });
});
