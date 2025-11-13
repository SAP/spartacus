/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, OnDestroy, OnInit, inject } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ItemService } from './item.service';
import { MessageService } from './message/services/message.service';
import { BaseItem } from './organization.model';

@Directive({
  selector: '[cxOrgItemExists]',
  standalone: false,
})
export class ItemExistsDirective<T = BaseItem> implements OnInit, OnDestroy {
  protected itemService = inject<ItemService<T>>(ItemService);
  protected messageService = inject(MessageService);

  protected subscription: Subscription;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.subscription = this.itemService.error$
      .pipe(filter((error) => error))
      .subscribe(() => this.handleErrorMessage());
  }

  protected handleErrorMessage() {
    this.messageService.add({
      message: {
        key: 'organization.notification.notExist',
      },
      type: GlobalMessageType.MSG_TYPE_ERROR,
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
