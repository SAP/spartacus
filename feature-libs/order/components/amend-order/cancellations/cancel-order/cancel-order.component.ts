/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { GlobalMessageType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrderAmendService } from '../../amend-order.service';
import { NgIf, NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { MessageComponent } from '../../../../../../projects/storefrontlib/cms-components/misc/message/message.component';
import { CancelOrReturnItemsComponent } from '../../amend-order-items/amend-order-items.component';
import { AmendOrderActionsComponent } from '../../amend-order-actions/amend-order-actions.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-cancel-order',
  templateUrl: './cancel-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    MessageComponent,
    NgTemplateOutlet,
    CancelOrReturnItemsComponent,
    AmendOrderActionsComponent,
    AsyncPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class CancelOrderComponent {
  orderCode: string;
  globalMessageType = GlobalMessageType;

  form$: Observable<UntypedFormGroup> = this.orderAmendService
    .getForm()
    .pipe(tap((form) => (this.orderCode = form.value.orderCode)));

  entries$: Observable<OrderEntry[]> = this.orderAmendService.getEntries();

  constructor(protected orderAmendService: OrderAmendService) {}
}
