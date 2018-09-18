import { FormControl, ValidationErrors } from '@angular/forms';
import { CustomFormValidators } from './custom-form-validators';

describe('FormValidationService', () => {
  let email: FormControl;
  let emailError: ValidationErrors;
  let password: FormControl;
  let passwordError: ValidationErrors;

  beforeEach(() => {
    email = new FormControl();
    emailError = {
      InvalidEmail: true
    };
    password = new FormControl();
    passwordError = {
      InvalidPassword: true
    };
  });

  describe('Email domain validator', () => {
    it('should allow email with domain', () => {
      email.setValue('test@test.com');
      expect(CustomFormValidators.emailDomainValidator(email)).toBeNull();
    });

    it('should reject email without domain', () => {
      email.setValue('test@test');
      expect(CustomFormValidators.emailDomainValidator(email)).toEqual(
        emailError
      );
    });
  });

  describe('Password validator', () => {
    it('should apply specified rule', () => {
      password.setValue('Test123!');
      expect(CustomFormValidators.passwordValidator(password)).toBeNull();

      password.setValue('test123!');
      expect(CustomFormValidators.passwordValidator(password)).toEqual(
        passwordError
      );
    });
  });
});
