import { Injectable } from '@angular/core';
import { B2BUser } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentUserService } from '../../../../user/services/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUnitUserService extends CurrentUserService {
  getDetailsRoute(): string {
    return 'unitUserList';
  }

  protected getItem(customerId: string): Observable<B2BUser> {
    return customerId ? this.b2bUserService.get(customerId) : of({});
  }
}
