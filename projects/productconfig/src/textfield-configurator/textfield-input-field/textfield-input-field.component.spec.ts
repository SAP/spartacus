import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TextfieldInputFieldComponent } from './textfield-input-field.component';

describe('TextfieldInputFieldComponent', () => {
  let component: TextfieldInputFieldComponent;

  let fixture: ComponentFixture<TextfieldInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextfieldInputFieldComponent],
      imports: [ReactiveFormsModule],
    })
      .overrideComponent(TextfieldInputFieldComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextfieldInputFieldComponent);
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
});
