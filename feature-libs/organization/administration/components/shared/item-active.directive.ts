import { Directive, OnDestroy, OnInit } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { tap, withLatestFrom } from 'rxjs/operators';
import { ItemService } from './item.service';
import { MessageService } from './message/services/message.service';
import { BaseItem } from './organization.model';

@Directive({
  selector: '[cxOrgItemActive]',
})
export class ItemActiveDirective<T = BaseItem> implements OnInit, OnDestroy {
  protected subscription;

  constructor(
    protected itemService: ItemService<T>,
    protected messageService: MessageService
  ) {}

  ngOnInit() {
    this.subscription = this.itemService.current$
      .pipe(
        withLatestFrom(this.messageService.get()),
        tap(([item, messageData]) => {
          if (item && this.checkDuplicatedMessage(messageData)) {
            this.handleDisabledItems(item);
          }
        })
      )
      .subscribe();
  }

  protected checkDuplicatedMessage(messageData) {
    return (
      messageData?.message?.key !== this.message.message.key &&
      messageData?.type !== this.message.type
    );
  }

  protected get message() {
    return {
      message: {
        key: 'organization.notification.disabled',
      },
      type: GlobalMessageType.MSG_TYPE_ERROR,
    };
  }

  protected handleDisabledItems(item: BaseItem) {
    if (item?.active === false) {
      this.messageService.add(this.message);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
