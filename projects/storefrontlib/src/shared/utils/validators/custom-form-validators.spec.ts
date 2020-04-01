import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { CustomFormValidators } from './custom-form-validators';

describe('FormValidationService', () => {
  let email: FormControl;
  let emailError: ValidationErrors;
  let passwordError: ValidationErrors;
  let starRatingEmpty: ValidationErrors;
  let matchPasswordError: any;
  let passwordsMustMatchErrorName: string;
  let emailsMustMatchErrorName: string;
  let form: FormGroup;

  beforeEach(() => {
    email = new FormControl();

    form = new FormGroup({
      password: new FormControl(),
      passwordconf: new FormControl(),
      rating: new FormControl(),
      email: new FormControl(),
      emailconf: new FormControl(),
    });

    emailError = {
      cxInvalidEmail: true,
    };

    passwordError = {
      cxInvalidPassword: true,
    };

    matchPasswordError = {
      cxPasswordsNotEqual: true,
    };

    starRatingEmpty = {
      cxStarRatingEmpty: true,
    };

    passwordsMustMatchErrorName = 'cxPasswordsMustMatch';
    emailsMustMatchErrorName = 'cxEmailsMustMatch';
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
      it(`should allow email '${validEmail}'`, function () {
        email.setValue(validEmail);
        expect(CustomFormValidators.emailValidator(email)).toBeNull();
      });
    });

    invalidEmails.forEach((invalidEmail: string) => {
      it(`should reject email '${invalidEmail}'`, function () {
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
        form.get('password').setValue(validPassword);
        expect(
          CustomFormValidators.passwordValidator(form.get('password'))
        ).toBeNull();
      });
    });

    invalidPasswords.forEach((invalidPassword: string) => {
      it(`should reject password '${invalidPassword}'`, function () {
        form.get('password').setValue(invalidPassword);
        expect(
          CustomFormValidators.passwordValidator(form.get('password'))
        ).toEqual(passwordError);
      });
    });
  });

  describe('Match password validator', () => {
    it('should not return error, when passwords match', () => {
      form.get('password').setValue('Test123!');
      form.get('passwordconf').setValue('Test123!');
      expect(CustomFormValidators.matchPassword(form)).toBeNull();
    });

    it("should return error, when passwords don't match", () => {
      form.get('password').setValue('Test123!');
      form.get('passwordconf').setValue('Test123@');

      expect(CustomFormValidators.matchPassword(form)).toEqual(
        matchPasswordError
      );
    });
  });

  describe('Passwords must match validator', () => {
    it('should not return error, when emails match', () => {
      form.get('email').setValue('test@test.com');
      form.get('emailconf').setValue('test@test.com');

      CustomFormValidators.emailsMustMatch('email', 'emailconf')(form);

      expect(form.get('emailconf').hasError(emailsMustMatchErrorName)).toEqual(
        false
      );
    });

    it("should return error, when emails don't match", () => {
      form.get('email').setValue('test@test.com');
      form.get('emailconf').setValue('other@email.com');

      CustomFormValidators.emailsMustMatch('email', 'emailconf')(form);

      expect(form.get('emailconf').hasError(emailsMustMatchErrorName)).toEqual(
        true
      );
    });
  });

  describe('Emails must match validator', () => {
    it('should not return error, when passwords match', () => {
      form.get('password').setValue('Test123!');
      form.get('passwordconf').setValue('Test123!');

      CustomFormValidators.passwordsMustMatch('password', 'passwordconf')(form);

      expect(
        form.get('passwordconf').hasError(passwordsMustMatchErrorName)
      ).toEqual(false);
    });

    it("should return error, when passwords don't match", () => {
      form.get('password').setValue('Test123!');
      form.get('passwordconf').setValue('Test123@');

      CustomFormValidators.passwordsMustMatch('password', 'passwordconf')(form);

      expect(
        form.get('passwordconf').hasError(passwordsMustMatchErrorName)
      ).toEqual(true);
    });
  });

  describe('Star rating validator', () => {
    const invalidValues = [null, 'a', 0, 1000];
    const validValues = [1, 2, 3, 4, 5];

    it('should reject invalid values', () => {
      invalidValues.forEach((value: any) => {
        form.get('rating').setValue(value);

        expect(
          CustomFormValidators.starRatingEmpty(form.get('rating'))
        ).toEqual(starRatingEmpty);
      });
    });

    it('should allow valid values', () => {
      validValues.forEach((value: any) => {
        form.get('rating').setValue(value);

        expect(
          CustomFormValidators.starRatingEmpty(form.get('rating'))
        ).toBeNull();
      });
    });
  });
});
