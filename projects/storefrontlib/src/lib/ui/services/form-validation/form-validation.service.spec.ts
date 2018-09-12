import { FormValidationService } from './form-validation.service';
import { FormControl, ValidationErrors } from '@angular/forms';

describe('FormValidationService', () => {
  let service: FormValidationService;
  let email: FormControl;
  let emailError: ValidationErrors;
  let password: FormControl;
  let passwordError: ValidationErrors;

  beforeEach(() => {
    service = new FormValidationService();
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
      expect(service.emailDomainValidator(email)).toBeNull();
    });

    it('should reject email without domain', () => {
      email.setValue('test@test');
      expect(service.emailDomainValidator(email)).toEqual(emailError);
    });
  });

  describe('Password validator', () => {
    it('should apply specified rule', () => {
      password.setValue('Test123!');
      expect(service.passwordValidator(password)).toBeNull();

      password.setValue('test123!');
      expect(service.passwordValidator(password)).toEqual(passwordError);
    });
  });
});
