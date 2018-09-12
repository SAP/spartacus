import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class FormValidationService {
  constructor() {}

  emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;

    return email.match('[.][a-zA-Z]+$') ? null : { InvalidEmail: true };
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value as string;
    return password.match(
      '^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^*()_+{};:.,]).{6,}$'
    )
      ? null
      : { InvalidPassword: true };
  }
}
