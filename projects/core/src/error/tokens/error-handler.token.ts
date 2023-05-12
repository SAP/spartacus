import { ErrorHandler, InjectionToken } from '@angular/core';

// SPIKE TODO arch: rename to ERROR_HANDLERS + filename too
// SPIKE TODO doc: add docs
export const ERROR_HANDLER = new InjectionToken<ErrorHandler[]>(
  'ERROR_HANDLER'
);
