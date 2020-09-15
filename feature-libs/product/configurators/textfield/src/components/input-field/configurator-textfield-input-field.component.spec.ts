import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorTextfieldInputFieldComponent } from './configurator-textfield-input-field.component';

describe('TextfieldInputFieldComponent', () => {
  let component: ConfiguratorTextfieldInputFieldComponent;

  let fixture: ComponentFixture<ConfiguratorTextfieldInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguratorTextfieldInputFieldComponent],
      imports: [ReactiveFormsModule],
    })
      .overrideComponent(ConfiguratorTextfieldInputFieldComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorTextfieldInputFieldComponent);
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
