/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { GlobalMessageType, FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrderAmendService } from '../../amend-order.service';
import { AmendOrderActionsComponent } from '../../amend-order-actions/amend-order-actions.component';
import { CancelOrReturnItemsComponent } from '../../amend-order-items/amend-order-items.component';
import { MessageComponentModule, FormErrorsModule } from '@spartacus/storefront';
import { NgIf, NgTemplateOutlet, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-cancel-order',
    templateUrl: './cancel-order.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        MessageComponentModule,
        NgTemplateOutlet,
        CancelOrReturnItemsComponent,
        FeaturesConfigModule,
        FormErrorsModule,
        AmendOrderActionsComponent,
        AsyncPipe,
        I18nModule,
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
