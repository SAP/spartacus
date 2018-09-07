import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class FormValidationService {
  constructor() {}

  emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;

    return email.match('[.][a-zA-Z]+$') ? null : { InvalidEmail: true };
  }
}
