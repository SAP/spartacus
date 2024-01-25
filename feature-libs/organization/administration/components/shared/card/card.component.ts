/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { ICON_TYPE, ViewComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ItemService } from '../item.service';
import { MessageService } from '../message/services/message.service';
import { BaseItem } from '../organization.model';

@Component({
  selector: 'cx-org-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [MessageService],
})
export class CardComponent<T extends BaseItem> {
  @Input() i18nRoot: string;
  @Input() previous: boolean | string = true;
  @Input() subtitle?: string;
  @Input() showHint? = false;

  protected itemKey: string | undefined;

  iconTypes = ICON_TYPE;

  item$: Observable<T | undefined> = this.itemService.current$.pipe(
    tap((item) => this.refreshMessages(item))
  );

  @ViewChild(ViewComponent, { read: ViewComponent }) view: ViewComponent;

  constructor(
    protected itemService: ItemService<T>,
    protected messageService: MessageService
  ) {}

  /**
   * The views are router based, which means if we close a view, the router outlet is
   * cleaned immediately. To prevent this, we're closing the view manually, before
   * navigating back.
   */
  closeView(event: MouseEvent) {
    event.stopPropagation();
    this.view.toggle(true);

    setTimeout(() => {
      (event.target as HTMLElement)?.parentElement?.click();
    }, 500);

    return false;
  }

  get previousLabel(): string {
    return this.previous as string;
  }

  protected refreshMessages(item: T | undefined) {
    if (
      this.itemKey !== undefined &&
      item?.code !== this.itemKey &&
      item?.uid !== this.itemKey &&
      item?.customerId !== this.itemKey
    ) {
      this.messageService.clear();
    }
    this.itemKey = item?.code ?? item?.uid ?? item?.customerId;
  }
}
