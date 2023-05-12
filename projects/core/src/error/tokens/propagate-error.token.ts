import { HttpErrorResponse } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
// SPIKE TODO doc: add docs
export const PROPAGATE_ERROR = new InjectionToken<PropagateErrorFn>(
  'PROPAGATE_ERROR'
);

export type PropagateErrorFn = (err: Error | HttpErrorResponse) => void;
