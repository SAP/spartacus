import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { DatePickerFallbackDirective } from './date-picker-fallback.directive';
import { DatePickerComponent } from './date-picker.component';

@Component({
  selector: 'cx-form-errors',
})
class MockFormErrorComponent {
  @Input() control: FormControl;
  @Input() translationParams: any;
}

const mockEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
};

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  let control: FormControl;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule, ReactiveFormsModule],
      declarations: [
        DatePickerComponent,
        MockFormErrorComponent,
        DatePickerFallbackDirective,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;

    control = new FormControl('min');

    component.control = control;
    fixture.detectChanges();

    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('minimum date', () => {
    let minControl: FormControl;

    beforeEach(() => {
      minControl = new FormControl('2020-12-1');
      component.min = minControl;
      fixture.detectChanges();
    });

    it('should add minControl value to the min value', () => {
      expect(inputEl.nativeElement.min).toContain('2020-12-1');
    });

    it('should not have max value', () => {
      expect(inputEl.nativeElement.max).toEqual('');
    });

    it('should updateValueAndValidity on control.change()', () => {
      spyOn(minControl, 'updateValueAndValidity');
      component.update();
      expect(minControl.updateValueAndValidity).toHaveBeenCalled();
    });

    it('should updateValueAndValidity on input change', () => {
      spyOn(minControl, 'updateValueAndValidity');
      inputEl.triggerEventHandler('change', mockEvent);
      expect(minControl.updateValueAndValidity).toHaveBeenCalled();
    });
  });

  describe('maximum date', () => {
    let maxControl: FormControl;

    beforeEach(() => {
      maxControl = new FormControl('2020-12-1');
      component.max = maxControl;
      fixture.detectChanges();
    });

    it('should add maxControl value to the min value', () => {
      expect(inputEl.nativeElement.max).toContain('2020-12-1');
    });

    it('should not have min value', () => {
      expect(inputEl.nativeElement.min).toEqual('');
    });

    it('should updateValueAndValidity on control.change()', () => {
      spyOn(maxControl, 'updateValueAndValidity');
      component.update();
      expect(maxControl.updateValueAndValidity).toHaveBeenCalled();
    });

    it('should updateValueAndValidity on input change', () => {
      spyOn(maxControl, 'updateValueAndValidity');
      inputEl.triggerEventHandler('change', mockEvent);
      expect(maxControl.updateValueAndValidity).toHaveBeenCalled();
    });
  });

  describe('validates input date', () => {
    it('should not return invalid date', () => {
      expect(component.getDate('2020-12')).toBeNull();
    });
    it('should not return invalid date', () => {
      expect(component.getDate('2020-12-2')).toEqual('2020-12-2');
    });
  });
});
