import { B2BUserService } from '@spartacus/organization/administration/core';
import { Observable, of } from 'rxjs';

export class CdcB2BUserService extends B2BUserService {
  isUpdatingUserAllowed(): Observable<boolean> {
    return of(false);
  }
}
