import { Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export abstract class ExistOrganizationItemGuard {
  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  protected showErrorMessage(keyParam: string) {
    this.globalMessageService.add(
      {
        key: 'organization.notification.notExist',
        params: { item: keyParam },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }

  protected redirect(route: string) {
    this.routingService.go({
      cxRoute: route,
    });
  }
}
