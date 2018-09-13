import { Action } from '@ngrx/store';

export const GLOBAL_ERROR_HANDLING_ACTION = '[Error] Global Error Handling';

export class GlobalErrorHandlingAction implements Action {
  readonly type = GLOBAL_ERROR_HANDLING_ACTION;
  constructor(public error: any) {}
}
