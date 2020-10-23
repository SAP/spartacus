import { Injectable } from '@angular/core';
import { GlobalMessageType, RoutingService } from '@spartacus/core';
import { BaseItem } from '../../components/shared/organization.model';
import { EntityItemGuard } from './entity-item.guard';
import { MessageService } from '../../components/shared/organization-message/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveEntityItemGuard extends EntityItemGuard {
  constructor(
    protected routingService: RoutingService,
    protected messageService: MessageService
  ) {
    super();
  }

  protected isValid(item: BaseItem): boolean {
    return item.active;
  }

  protected redirect(
    entityData: string[],
    item?: BaseItem,
    routeParam?: string
  ) {
    const paramObject = {};
    paramObject[routeParam] = item.code;

    this.routingService.go({
      cxRoute: `${entityData[0]}Details`,
      params: paramObject,
    });
  }

  protected showErrorMessage(entityData: string[]) {
    this.messageService.add({
      message: {
        key: 'organization.notification.disabled',
        params: {
          item: entityData[0].charAt(0).toUpperCase() + entityData[0].slice(1),
        },
      },
      type: GlobalMessageType.MSG_TYPE_ERROR,
    });
  }
}
