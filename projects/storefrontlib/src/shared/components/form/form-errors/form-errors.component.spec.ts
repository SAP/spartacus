import { SimpleChange } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormErrorsComponent } from './form-errors.component';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';

const mockErrorName = 'exampleError';
const mockErrorName2 = 'exampleError2';
const mockError = { [mockErrorName]: true, [mockErrorName2]: true };

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
  });

  function runTests(): void {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should not provide errors, when control is valid', () => {
      let returnedError: string[];

      control.setErrors({});
      component.errors$.subscribe((errors) => {
        returnedError = errors;
      });

      expect(returnedError).toEqual([]);
    });

    it('should not provide errors, when control no longer invalid', () => {
      let returnedError: string[];

      control.setErrors(mockError);
      component.errors$.subscribe((errors) => {
        returnedError = errors;
      });

      expect(returnedError).toEqual([mockErrorName]);

      control.setErrors({});
      component.errors$.subscribe((error) => {
        returnedError = error;
      });

      expect(returnedError).toEqual([]);
    });

    it('should provide errors, when control not valid', () => {
      let returnedError: string[];

      control.setErrors(mockError);
      component.errors$.subscribe((errors) => {
        returnedError = errors;
      });

      expect(returnedError).toEqual([mockErrorName]);
    });

    it('should provide errors, when control no longer valid', () => {
      let returnedError: string[];

      control.setErrors({});
      component.errors$.subscribe((errors) => {
        returnedError = errors;
      });

      expect(returnedError).toEqual([]);

      control.setErrors(mockError);
      component.errors$.subscribe((error) => {
        returnedError = error;
      });

      expect(returnedError).toEqual([mockErrorName]);
    });

    describe('Show all Errors', () => {
      it('should show all errors when showOnlyOne is set to false', () => {
        let returnedError: string[];
        component.showOnlyOne = false;

        control.setErrors(mockError);
        component.errors$.subscribe((error) => {
          returnedError = error;
        });

        expect(returnedError).toEqual([mockErrorName, mockErrorName2]);
      });
    });
  }

  describe('passing control as input', () => {
    beforeEach(() => {
      control = new FormControl('exampleControl');
      component.control = control;
      component.ngOnChanges({});

      fixture.detectChanges();
    });

    runTests();
  });

  describe('passing controlName as input', () => {
    beforeEach(() => {
      component['formGroup'] = {
        form: new FormGroup({
          exampleControl: new FormControl(),
        }),
      } as FormGroupDirective;

      component.ngOnChanges({
        controlName: new SimpleChange(null, 'exampleControl', true),
      });
      control = component.control;

      fixture.detectChanges();
    });

    runTests();
  });
});
