import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorTextfieldInputFieldReadonlyComponent } from './configurator-textfield-input-field-readonly.component';

describe('TextfieldInputFieldComponent', () => {
  let component: ConfiguratorTextfieldInputFieldReadonlyComponent;

  let fixture: ComponentFixture<ConfiguratorTextfieldInputFieldReadonlyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguratorTextfieldInputFieldReadonlyComponent],
        imports: [ReactiveFormsModule],
      })
        .overrideComponent(ConfiguratorTextfieldInputFieldReadonlyComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorTextfieldInputFieldReadonlyComponent
    );
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

  it('should generate id with prefixt', () => {
    expect(component.getId(component.attribute)).toEqual(
      'cx-configurator-textfieldattributeName'
    );
  });
});
