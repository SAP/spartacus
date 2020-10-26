import { Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { BaseItem } from './organization.model';

@Injectable({
  providedIn: 'root',
})
export abstract class ActiveOrganizationItemGuard {
  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  protected showErrorMessage(keyParam: string) {
    this.globalMessageService.add(
      {
        key: 'organization.notification.disabled',
        params: { item: keyParam },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }

  protected redirect(id: string, route: string, code: string) {
    const paramObj = {};
    paramObj[code] = id;

    this.routingService.go({
      cxRoute: route,
      params: paramObj,
    });
  }

  protected isValid(item: BaseItem): boolean {
    return item.active;
  }
}
