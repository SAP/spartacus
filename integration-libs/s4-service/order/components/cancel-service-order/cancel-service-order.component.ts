/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import {
  CancelServiceOrderFacade,
  CancellationDetails,
} from '@spartacus/s4-service/root';
import { Observable, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'cx-cancel-service-order',
  templateUrl: './cancel-service-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelServiceOrderComponent {
  protected orderDetailsService = inject(OrderDetailsService);
  protected cancelServiceOrderFacade = inject(CancelServiceOrderFacade);
  protected fb = inject(FormBuilder);
  protected globalMessageService = inject(GlobalMessageService);
  protected routingService = inject(RoutingService);

  order$: Observable<any> = this.orderDetailsService.getOrderDetails();
  characterLeft: number = 255;
  form: FormGroup = this.fb.group({
    cancelReason: [null, Validators.maxLength(255)],
  });

  cancelServiceOrder(): void {
    const cancelReason = this.form.get('cancelReason')?.value || '';
    this.order$
      .pipe(
        mergeMap((order: any) => {
          if (order) {
            const cancellationDetails: CancellationDetails = {
              cancellationRequestEntryInputs: order.entries.map(
                (entry: OrderEntry) => ({
                  orderEntryNumber: entry.entryNumber,
                  quantity: entry.quantity,
                })
              ),
              cancelReason: cancelReason,
            };

            return this.cancelServiceOrderFacade.cancelService(
              order.code,
              cancellationDetails
            );
          } else {
            return throwError(
              () => new Error('Order details are not available')
            );
          }
        }),
        mergeMap(() => this.order$),
        mergeMap((order: any) =>
          this.routingService.go({
            cxRoute: 'orderDetails',
            params: { code: order.code },
          })
        )
      )
      .subscribe({
        next: () => {
          this.globalMessageService.add(
            { key: 'cancelService.cancelServiceSuccess' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        },
        error: () => this.onError(),
      });
  }

  protected onError(): void {
    this.globalMessageService.add(
      { key: 'cancelService.unknownError' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  updateCharacterLeft(): void {
    const cancelReason = this.form.get('cancelReason')?.value || '';
    this.characterLeft = 255 - cancelReason.length;
  }
}
