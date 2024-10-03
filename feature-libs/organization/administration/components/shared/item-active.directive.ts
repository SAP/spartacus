/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, OnDestroy, OnInit } from '@angular/core';
import { GlobalMessageType, isNotNullable } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { ItemService } from './item.service';
import { MessageService } from './message/services/message.service';
import { BaseItem } from './organization.model';

@Directive({
  selector: '[cxOrgItemActive]',
})
export class ItemActiveDirective<T extends BaseItem = BaseItem>
  implements OnInit, OnDestroy
{
  protected subscription: Subscription;

  constructor(
    protected itemService: ItemService<T>,
    protected messageService: MessageService
  ) {}

  ngOnInit() {
    this.subscription = this.itemService.current$
      .pipe(
        distinctUntilChanged(
          (previous: BaseItem | undefined, current: BaseItem | undefined) =>
            previous?.active === current?.active
        ),
        filter(isNotNullable),
        filter((item) => item.active === false)
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
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
