import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { makeHttpErrorSerializable } from '../../../util/serialization-utils';

export class ErrorAction implements Action {
  type: string;
  constructor(public payload: HttpErrorResponse | any) {
    this.payload = makeHttpErrorSerializable(this.payload);
  }
}
