import { FormValidationService } from './form-validation.service';
import { FormControl, ValidationErrors } from '@angular/forms';

describe('FormValidationService', () => {
  let service: FormValidationService;
  let email: FormControl;
  let emailError: ValidationErrors;

  beforeEach(() => {
    service = new FormValidationService();
    email = new FormControl();
    emailError = {
      InvalidEmail: true
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
});
