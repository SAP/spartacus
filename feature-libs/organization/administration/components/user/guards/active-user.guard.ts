import { Injectable } from '@angular/core';
import {
  B2BUser,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CurrentUserService } from '../services/current-user.service';
import { BaseItem } from '../../shared';

@Injectable({
  providedIn: 'root',
})
export class ActiveUserGuard {
  constructor(
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected currentItemService: CurrentUserService
  ) {}

  canActivate() {
    return this.currentItemService.item$.pipe(
      map((item) => {
        if (!this.isValid(item)) {
          this.redirect(item);
          this.showErrorMessage();
        }
      }),
      catchError(() => {
        return of();
      })
    );
  }

  protected isValid(user: B2BUser): boolean {
    return user.active;
  }

  protected redirect(_item?: BaseItem) {
    this.routingService.go({
      cxRoute: `userDetails`,
      params: { userCode: _item.customerId },
    });
  }

  protected showErrorMessage() {
    this.globalMessageService.add(
      {
        key: 'organization.notification.disabled',
        params: { item: 'User' },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}
