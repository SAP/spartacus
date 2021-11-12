import { ChangeDetectionStrategy, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorTextfieldInputFieldComponent } from './configurator-textfield-input-field.component';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('TextfieldInputFieldComponent', () => {
  let component: ConfiguratorTextfieldInputFieldComponent;

  let fixture: ComponentFixture<ConfiguratorTextfieldInputFieldComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorTextfieldInputFieldComponent,
          MockTranslateUrlPipe,
        ],
        imports: [ReactiveFormsModule],
      })
        .overrideComponent(ConfiguratorTextfieldInputFieldComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

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

  it('should generate id with prefixt', () => {
    expect(component.getId(component.attribute)).toEqual(
      'cx-configurator-textfieldattributeName'
    );
  });
});
