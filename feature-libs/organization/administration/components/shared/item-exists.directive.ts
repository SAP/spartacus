import { Directive, OnDestroy, OnInit } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { tap } from 'rxjs/operators';
import { OrganizationItemService } from './organization-item.service';
import { MessageService } from './organization-message/services/message.service';
import { BaseItem } from './organization.model';

@Directive({
  selector: '[cxOrgItemExists]',
})
export class ItemExistsDirective<T = BaseItem> implements OnInit, OnDestroy {
  protected subscription;

  constructor(
    protected itemService: OrganizationItemService<T>,
    protected messageService: MessageService
  ) {}

  ngOnInit() {
    this.subscription = this.itemService.error$
      .pipe(tap((error) => this.handleErrorMessage(error)))
      .subscribe();
  }

  protected handleErrorMessage(error: boolean) {
    if (error) {
      this.messageService.add({
        message: {
          key: 'organization.notification.notExist',
        },
        type: GlobalMessageType.MSG_TYPE_ERROR,
      });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
