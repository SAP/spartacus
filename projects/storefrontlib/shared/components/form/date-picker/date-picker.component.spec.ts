import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { DatePickerComponent } from './date-picker.component';

@Component({
  selector: 'cx-form-errors',
})
class MockFormErrorComponent {
  @Input() control: UntypedFormControl;
  @Input() translationParams: any;
}

const mockEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
};

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  let control: UntypedFormControl;
  let inputEl: DebugElement;

  beforeEach(() => {
    console.log('Starting DatePickerComponent test');
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [
        DatePickerComponent,
        MockFormErrorComponent,
        MockFeatureDirective,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    console.log('Starting DatePickerComponent test');
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;

    control = new UntypedFormControl('min');

    component.control = control;
    fixture.detectChanges();

    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('minimum date', () => {
    beforeEach(() => {
    console.log('Starting DatePickerComponent test');
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
    console.log('Starting DatePickerComponent test');
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
      expect(component.getDate('2020-12')).toBeUndefined();
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
