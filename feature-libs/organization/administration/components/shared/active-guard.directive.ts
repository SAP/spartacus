import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalMessageType } from '@spartacus/core';
import { tap } from 'rxjs/operators';
import { OrganizationItemService } from './organization-item.service';
import { MessageService } from './organization-message/services/message.service';
import { BaseItem } from './organization.model';

@Directive({
  selector: '[cxActiveGuard]',
})
export class ActiveGuardDirective<T = BaseItem> implements OnInit, OnDestroy {
  protected subscription;

  @Input('cxActiveGuard') form: FormGroup;

  constructor(
    protected itemService: OrganizationItemService<T>,
    protected messageService: MessageService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.routeConfig.path === 'edit') {
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
  }

  protected handleDisabledItems(item: BaseItem) {
    if (!item?.active && this.form) {
      this.form.disable();
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
