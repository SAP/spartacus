import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { MessageService } from '../../components/shared/organization-message/services/message.service';
import { GlobalMessageType } from '@spartacus/core';
import { BaseItem } from '../../components/shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class EntityGuard {
  constructor(
    protected routingService: RoutingService,
    protected messageService: MessageService
  ) {}

  canActivate(
    item: BaseItem,
    entity: string,
    routeParam?: string
  ): BaseItem | void {
    const entityData = this.splitEntity(entity);

    if (this.isValid(item, entityData)) {
      return item;
    } else {
      this.showErrorMessage(entityData);
      /*
       * timeout for the user to be able to see the error message before redirecting
       * if we do not want the timeout, we would need to use the global message service
       */
      setTimeout(() => {
        this.redirect(item, entityData, routeParam);
      }, 1000);
    }
  }

  protected isValid(item: BaseItem, entityData: string[]): boolean {
    return entityData[1] === 'details'
      ? Object.keys(item).length !== 0
      : item.active;
  }

  protected splitEntity(entity: string) {
    return entity.split('.');
  }

  protected redirect(
    item: BaseItem,
    entityData: string[],
    routeParam?: string
  ) {
    if (entityData[1] === 'details') {
      this.routingService.go({ cxRoute: entityData[0] });
    } else {
      const paramObject = {};
      paramObject[routeParam] = item.code;

      this.routingService.go({
        cxRoute: `${entityData[0]}Details`,
        params: paramObject,
      });
    }
  }

  protected showErrorMessage(entityData: string[]) {
    this.messageService.add({
      message: {
        key:
          entityData[1] === 'details'
            ? 'organization.notification.notExist'
            : 'organization.notification.disabled',
        params: {
          item: entityData[0].charAt(0).toUpperCase() + entityData[0].slice(1),
        },
      },
    });
  }
}
