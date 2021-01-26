import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalMessageType, RoutingService } from '@spartacus/core';
import { distinctUntilChanged, filter, take } from 'rxjs/operators';
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
    protected messageService: MessageService,
    protected routingService: RoutingService,
    protected route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.itemService.current$
      .pipe(
        distinctUntilChanged(
          (previous: BaseItem, current: BaseItem) =>
            previous?.active === current?.active
        ),
        filter((item) => item && item?.active === false)
      )
      .subscribe((item) => this.handleDisabledItems(item));
  }

  protected handleDisabledItems(item: BaseItem) {
    this.messageService.add({
      message: {
        key: 'organization.notification.disabled',
        params: { item },
      },
      type: GlobalMessageType.MSG_TYPE_ERROR,
    });

    this.routingService
      .getRouterState()
      .pipe(take(1))
      .subscribe((routerState) => {
        this.routingService.go([
          routerState.state.context.id,
          item.customerId ?? item.uid,
        ]);
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
