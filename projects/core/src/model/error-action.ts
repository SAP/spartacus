import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { HttpErrorModel } from './index';

export interface ErrorAction extends Action {
  error: HttpErrorResponse | HttpErrorModel | Error;
}
