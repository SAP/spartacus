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
      InvalidEmail: true,
    };
    password = new FormControl();
    passwordError = {
      InvalidPassword: true,
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

  describe('Email validator', () => {
    const validEmails = [
      'email@example.com',
      'firstname.lastname@example.com',
      'email@subdomain.example.com',
      'firstname+lastname@example.com',
      'email@123.123.123.com',
      'email@[123.123.123.123]',
      '"email"@example.com',
      '1234567890@example.com',
      'email@example-one.com',
      '_______@example.com',
      'email@example.name',
      'email@example.museum',
      'email@example.co.jp',
      'firstname-lastname@example.com',
    ];
    const invalidEmails = [
      '',
      ' ',
      'plainaddress',
      ' startspace@example.com',
      'middle space@example.com',
      'endspace@example.com ',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'Joe Smith <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      '.email@example.com',
      'email.@example.com',
      'email..email@example.com',
      'email@example.com (Joe Smith)',
      'email@example',
      'email@111.222.333.44444',
      'email@example..com',
      'Abc..123@example.com',
      '”(),:;<>[]@example.com',
      'this is"really"notallowed@example.com',
    ];

    validEmails.forEach((validEmail: string) => {
      it(`should allow email '${validEmail}'`, function() {
        email.setValue(validEmail);
        expect(CustomFormValidators.emailValidator(email)).toBeNull();
      });
    });

    invalidEmails.forEach((invalidEmail: string) => {
      it(`should reject email '${invalidEmail}'`, function() {
        email.setValue(invalidEmail);
        expect(CustomFormValidators.emailValidator(email)).toEqual(emailError);
      });
    });
  });

  describe('Password validator', () => {
    const validPasswords = ['Test123!', 'TEST123!', 'TEST123test!@#'];
    const invalidPasswords = ['test123!', 'Test1234', 'Test!@#%', 'Te1!'];

    validPasswords.forEach((validPassword: string) => {
      it(`should allow password ${validPassword}`, () => {
        password.setValue('Test123!');
        expect(CustomFormValidators.passwordValidator(password)).toBeNull();
      });
    });

    invalidPasswords.forEach((invalidPassword: string) => {
      it(`should reject password '${invalidPassword}'`, function() {
        password.setValue(invalidPassword);
        expect(CustomFormValidators.passwordValidator(password)).toEqual(
          passwordError
        );
      });
    });
  });
});
