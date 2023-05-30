import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { ConsentTemplate } from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class RegisterFormService {
  constructor(protected fb: UntypedFormBuilder) {}

  loadExtraRegistrationConsents(): Observable<
    {
      template: ConsentTemplate;
      required: boolean;
    }[]
  > {
    return EMPTY;
  }

  generateConsentsFormControl(): UntypedFormArray {
    return this.fb.array([]);
  }
}
