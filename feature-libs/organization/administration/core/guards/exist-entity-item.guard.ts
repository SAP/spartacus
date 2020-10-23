import { Injectable } from '@angular/core';
import { GlobalMessageType, RoutingService } from '@spartacus/core';
import { MessageService } from '../../components/shared/organization-message/services/message.service';
import { BaseItem } from '../../components/shared/organization.model';
import { EntityItemGuard } from './entity-item.guard';

@Injectable({
  providedIn: 'root',
})
export class ExistEntityItemGuard extends EntityItemGuard {
  constructor(
    protected routingService: RoutingService,
    protected messageService: MessageService
  ) {
    super();
  }

  protected isValid(item: BaseItem): boolean {
    return Object.keys(item).length !== 0;
  }

  protected redirect(entityData: string[]) {
    this.routingService.go({ cxRoute: entityData[0] });
  }

  protected showErrorMessage(entityData: string[]) {
    this.messageService.add({
      message: {
        key: 'organization.notification.notExist',
        params: {
          item: entityData[0].charAt(0).toUpperCase() + entityData[0].slice(1),
        },
      },
      type: GlobalMessageType.MSG_TYPE_ERROR,
    });
  }
}
