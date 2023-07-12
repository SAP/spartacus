import { HttpErrorResponse } from '@angular/common/http';

export interface CxEffectError {
  action: any;
  error: string | HttpErrorResponse;
}
