import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import {
  FeatureConfigService,
  I18nTestingModule,
  MockTranslatePipe,
} from '@spartacus/core';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { FormErrorsComponent } from './form-errors.component';

const mockErrorName = 'exampleError';
const mockError = { [mockErrorName]: true };
const mockErrorDetails: [string, string | boolean][] = [[mockErrorName, true]];
class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled(_feature: string) {
    return true;
  }
}

describe('FormErrors', () => {
  let component: FormErrorsComponent;
  let fixture: ComponentFixture<FormErrorsComponent>;
  let control: UntypedFormControl;

  const getContent = () => fixture.debugElement.nativeElement.innerText;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        FeatureConfigService,
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
      declarations: [FormErrorsComponent, MockFeatureDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorsComponent);
    component = fixture.componentInstance;
    control = new UntypedFormControl('exampleControl');

    component.control = control;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not provide errors, when control is valid', () => {
    control.setErrors({});
    component.errorsDetails$.subscribe((errors) => {
      expect(errors).toEqual([]);
    });
  });

  it('should not provide errors, when control no longer invalid', () => {
    let returnedErrors: [string, string | boolean][] = [];

    control.setErrors(mockError);
    component.errorsDetails$.subscribe((errors) => {
      returnedErrors = errors;
    });
    expect(returnedErrors).toEqual(mockErrorDetails);

    control.setErrors([]);
    expect(returnedErrors).toEqual([]);
  });

  it('should provide errors, when control not valid', () => {
    control.setErrors(mockError);
    component.errorsDetails$.subscribe((errors) => {
      expect(errors).toEqual(mockErrorDetails);
    });
  });

  it('should provide errors, when control no longer valid', () => {
    let returnedErrors: [string, string | boolean][] = [];

    control.setErrors({});
    component.errorsDetails$.subscribe((errors) => {
      returnedErrors = errors;
    });
    expect(returnedErrors).toEqual([]);

    control.setErrors(mockError);
    expect(returnedErrors).toEqual(mockErrorDetails);
  });

  it('should render multiple errors', () => {
    control.setErrors({ email: true, required: true });
    control.markAsTouched();
    fixture.detectChanges();
    const renderedErrors =
      fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(renderedErrors[0].innerText).toEqual(
      'formErrors.labeled.email,formErrors.email'
    );
    expect(renderedErrors[1].innerText).toEqual(
      'formErrors.labeled.required,formErrors.required'
    );
  });

  describe('i18n', () => {
    describe('key', () => {
      it('should use the error key with default prefix', () => {
        control.setErrors(mockError);
        control.markAsTouched();
        fixture.detectChanges();
        expect(getContent()).toEqual(
          'formErrors.labeled.exampleError,formErrors.exampleError'
        );
      });

      it('should use the error key with default fallback prefix', () => {
        const errorKeys = [
          `${component.prefix}.${mockErrorName}`,
          `${component.fallbackPrefix}.${mockErrorName}`,
        ];
        spyOn(MockTranslatePipe.prototype, 'transform')
          .withArgs(errorKeys, {})
          .and.returnValue(errorKeys[1]);

        control.setErrors(mockError);
        control.markAsTouched();
        fixture.detectChanges();
        expect(getContent()).toEqual('formErrors.exampleError');
      });

      it('should use the error key with prefix @Input', () => {
        component.prefix = 'customPrefix';
        control.setErrors(mockError);
        control.markAsTouched();
        fixture.detectChanges();
        expect(getContent()).toEqual(
          'customPrefix.exampleError,formErrors.exampleError'
        );
      });

      it('should use the error key with fallbackPrefix @Input', () => {
        component.fallbackPrefix = 'customPrefix';
        const errorKeys = [
          `${component.prefix}.${mockErrorName}`,
          `${component.fallbackPrefix}.${mockErrorName}`,
        ];
        spyOn(MockTranslatePipe.prototype, 'transform')
          .withArgs(errorKeys, {})
          .and.returnValue(errorKeys[1]);

        control.setErrors(mockError);
        control.markAsTouched();
        fixture.detectChanges();
        expect(getContent()).toEqual('customPrefix.exampleError');
      });
    });

    describe('params', () => {
      it('should use the method `getTranslationParams`', () => {
        spyOn(component, 'getTranslationParams').and.returnValue({
          foo: '1',
          bar: '2',
        });
        control.setErrors({ exampleError: { foo: '1', bar: '2' } });
        control.markAsTouched();
        fixture.detectChanges();
        expect(getContent()).toEqual(
          'formErrors.labeled.exampleError,formErrors.exampleError bar:2 foo:1'
        );
        expect(component.getTranslationParams).toHaveBeenCalledWith({
          foo: '1',
          bar: '2',
        });
      });
    });
  });

  describe('getTranslationParams', () => {
    it('should return the argument `errorDetails`', () => {
      expect(component.getTranslationParams({ foo: '1' })).toEqual({
        foo: '1',
      });
    });

    it('should NOT return the error details when it is not an object', () => {
      expect(component.getTranslationParams('someString')).toEqual({});
      expect(component.getTranslationParams(['arrayElement'])).toEqual({});
      expect(component.getTranslationParams(123)).toEqual({});
    });

    it('should return the @Input `translationParams`', () => {
      component.translationParams = { foo: '1' };
      expect(component.getTranslationParams(undefined)).toEqual({ foo: '1' });
    });

    it('should use the argument `errorDetails` merged with the @Input `translationParams`', () => {
      component.translationParams = { a: '1', b: '2' };
      expect(component.getTranslationParams({ b: '22', c: '33' })).toEqual({
        a: '1',
        b: '2',
        c: '33',
      });
    });
  });
});
