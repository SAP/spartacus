import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [FormErrorsComponent],
      }).compileComponents();
    })
  );

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
    let returnedErrors: string[];

    control.setErrors({});
    component.errors$.subscribe((errors) => {
      returnedErrors = errors;
    });

    expect(returnedErrors).toEqual([]);
  });

  it('should not provide errors, when control no longer invalid', () => {
    let returnedErrors: string[];

    control.setErrors(mockError);
    component.errors$.subscribe((errors) => {
      returnedErrors = errors;
    });

    expect(returnedErrors).toEqual([mockErrorName]);

    control.setErrors({});
    component.errors$.subscribe((errors) => {
      returnedErrors = errors;
    });

    expect(returnedErrors).toEqual([]);
  });

  it('should provide errors, when control not valid', () => {
    let returnedErrors: string[];

    control.setErrors(mockError);
    component.errors$.subscribe((errors) => {
      returnedErrors = errors;
    });

    expect(returnedErrors).toEqual([mockErrorName]);
  });

  it('should provide errors, when control no longer valid', () => {
    let returnedErrors: string[];

    control.setErrors({});
    component.errors$.subscribe((errors) => {
      returnedErrors = errors;
    });

    expect(returnedErrors).toEqual([]);

    control.setErrors(mockError);
    component.errors$.subscribe((errors) => {
      returnedErrors = errors;
    });

    expect(returnedErrors).toEqual([mockErrorName]);
  });
});
