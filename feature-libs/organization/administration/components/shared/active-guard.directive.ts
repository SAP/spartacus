import { Directive, OnDestroy, OnInit } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { tap } from 'rxjs/operators';
import { CurrentOrganizationItemService } from './current-organization-item.service';
import { MessageService } from './organization-message/services/message.service';
import { BaseItem } from './organization.model';

@Directive({
  selector: '[cxActiveGuard]',
})
export class ActiveGuardDirective<T = BaseItem> implements OnInit, OnDestroy {
  protected subscription;

  constructor(
    protected currentItemService: CurrentOrganizationItemService<T>,
    protected messageService: MessageService
  ) {}

  ngOnInit() {
    this.subscription = this.currentItemService.item$
      .pipe(tap((item) => this.handleErrorMessage(item)))
      .subscribe();
  }

  protected handleErrorMessage(item: BaseItem) {
    if (!item?.active) {
      this.messageService.add({
        message: {
          key: 'organization.notification.disabled',
        },
        type: GlobalMessageType.MSG_TYPE_ERROR,
      });
    } else {
      this.messageService.clear();
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
