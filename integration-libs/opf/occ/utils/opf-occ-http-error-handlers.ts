import { HttpErrorModel } from '@spartacus/core';

export function isHttp500Error(err: HttpErrorModel): boolean {
  return err?.status && err.status >= 500 ? true : false;
}
