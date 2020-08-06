import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigTextfieldInputFieldComponent } from './config-textfield-input-field.component';

describe('TextfieldInputFieldComponent', () => {
  let component: ConfigTextfieldInputFieldComponent;

  let fixture: ComponentFixture<ConfigTextfieldInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigTextfieldInputFieldComponent],
      imports: [ReactiveFormsModule],
    })
      .overrideComponent(ConfigTextfieldInputFieldComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTextfieldInputFieldComponent);
    component = fixture.componentInstance;
    component.attribute = {
      configurationLabel: 'attributeName',
      configurationValue: 'input123',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value on init', () => {
    expect(component.attributeInputForm.value).toEqual('input123');
  });

  it('should emit a change event on change ', () => {
    spyOn(component.inputChange, 'emit').and.callThrough();
    component.onInputChange();
    expect(component.inputChange.emit).toHaveBeenCalledWith(
      component.attribute
    );
  });
});
