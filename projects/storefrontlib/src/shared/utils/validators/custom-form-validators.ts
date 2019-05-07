import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomFormValidators {
  static emailDomainValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const email = control.value as string;

    return email.match('[.][a-zA-Z]+$') ? null : { InvalidEmail: true };
  }

  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;

    return email.match(
      // Email Standard RFC 5322:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // tslint:disable-line
    )
      ? null
      : { InvalidEmail: true };
  }

  static passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value as string;
    return password.match(
      '^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^*()_+{};:.,]).{6,}$'
    )
      ? null
      : { InvalidPassword: true };
  }
}
