import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalMessageType } from '@spartacus/core';
import { tap } from 'rxjs/operators';
import { OrganizationItemService } from './organization-item.service';
import { MessageService } from './organization-message/services/message.service';
import { BaseItem } from './organization.model';

@Directive({
  selector: '[cxOrgItemActive]',
})
export class ItemActiveDirective<T = BaseItem> implements OnInit, OnDestroy {
  protected subscription;

  @Input('cxOrgItemActive') form: FormGroup;

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
    if (item?.active === false && this.form) {
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
