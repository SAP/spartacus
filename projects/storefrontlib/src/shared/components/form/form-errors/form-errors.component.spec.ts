import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormErrorsComponent } from './form-errors.component';
import { FormControl } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';

const mockErrorName = 'exampleError';
const mockError = { [mockErrorName]: true };

describe('FormErrors', () => {
  let component: FormErrorsComponent;
  let fixture: ComponentFixture<FormErrorsComponent>;
  let control: FormControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [FormErrorsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorsComponent);
    component = fixture.componentInstance;
    control = new FormControl('exampleControl');

    component.control = control;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not provide errors, when control is valid', () => {
    let returnedError: string;

    control.setErrors({});
    component.error$.subscribe((error) => {
      returnedError = error;
    });

    expect(returnedError).toEqual(undefined);
  });

  it('should not provide errors, when control no longer invalid', () => {
    let returnedError: string;

    control.setErrors(mockError);
    component.error$.subscribe((error) => {
      returnedError = error;
    });

    expect(returnedError).toEqual(mockErrorName);

    control.setErrors({});
    component.error$.subscribe((error) => {
      returnedError = error;
    });

    expect(returnedError).toEqual(undefined);
  });

  it('should provide errors, when control not valid', () => {
    let returnedError: string;

    control.setErrors(mockError);
    component.error$.subscribe((error) => {
      returnedError = error;
    });

    expect(returnedError).toEqual(mockErrorName);
  });

  it('should provide errors, when control no longer valid', () => {
    let returnedError: string;

    control.setErrors({});
    component.error$.subscribe((error) => {
      returnedError = error;
    });

    expect(returnedError).toEqual(undefined);

    control.setErrors(mockError);
    component.error$.subscribe((error) => {
      returnedError = error;
    });

    expect(returnedError).toEqual(mockErrorName);
  });
});
