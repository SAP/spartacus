import { Directive, OnDestroy, OnInit } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { withLatestFrom, filter } from 'rxjs/operators';
import { ItemService } from './item.service';
import { MessageService } from './message/services/message.service';
import { BaseItem } from './organization.model';
import { MessageData } from './message/message.model';

const messageDisabledItem: MessageData = {
  message: {
    key: 'organization.notification.disabled',
  },
  type: GlobalMessageType.MSG_TYPE_ERROR,
};

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
        filter(
          ([item, messageData]: [BaseItem, MessageData]) =>
            item &&
            item?.active === false &&
            this.checkDuplicatedMessage(messageData)
        )
      )
      .subscribe(() => {
        this.handleDisabledItems();
      });
  }

  protected checkDuplicatedMessage(messageData: MessageData): boolean {
    return (
      messageData?.message?.key !== messageDisabledItem.message.key &&
      messageData?.type !== messageDisabledItem.type
    );
  }

  protected handleDisabledItems(): void {
    this.messageService.add(messageDisabledItem);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
