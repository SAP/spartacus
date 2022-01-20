import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
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
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [DatePickerComponent, MockFormErrorComponent],
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
    beforeEach(() => {
      component.min = '2020-12-1';
      fixture.detectChanges();
    });

    it('should add minControl value to the min value', () => {
      expect(inputEl.nativeElement.min).toContain('2020-12-1');
    });

    it('should not have max value', () => {
      expect(inputEl.nativeElement.max).toEqual('');
    });
  });

  describe('maximum date', () => {
    beforeEach(() => {
      component.max = '2020-12-1';
      fixture.detectChanges();
    });

    it('should add maxControl value to the min value', () => {
      expect(inputEl.nativeElement.max).toContain('2020-12-1');
    });

    it('should not have min value', () => {
      expect(inputEl.nativeElement.min).toEqual('');
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

  describe('change date', () => {
    it('should emit event', () => {
      spyOn(component.update, 'emit');
      inputEl.triggerEventHandler('change', mockEvent);
      expect(component.update.emit).toHaveBeenCalledWith();
    });
  });
});
