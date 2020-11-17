import { Directive, OnDestroy, OnInit } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { tap } from 'rxjs/operators';
import { OrganizationItemService } from './organization-item.service';
import { MessageService } from './message/services/message.service';
import { BaseItem } from './organization.model';

@Directive({
  selector: '[cxOrgItemActive]',
})
export class ItemActiveDirective<T = BaseItem> implements OnInit, OnDestroy {
  protected subscription;

  constructor(
    protected itemService: OrganizationItemService<T>,
    protected messageService: MessageService
  ) {}

  ngOnInit() {
    this.subscription = this.itemService.current$
      .pipe(
        tap((item) => {
          if (item) {
            this.handleDisabledItems(item);
          }
        })
      )
      .subscribe();
  }

  protected handleDisabledItems(item: BaseItem) {
    if (item?.active === false) {
      this.messageService.add({
        message: {
          key: 'organization.notification.disabled',
        },
        type: GlobalMessageType.MSG_TYPE_ERROR,
      });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
