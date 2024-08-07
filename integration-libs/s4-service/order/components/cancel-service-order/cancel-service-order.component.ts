import { Component, inject } from '@angular/core';
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
  CancelObj,
} from '@spartacus/s4-service/root';
import { mergeMap, Observable, throwError } from 'rxjs';

@Component({
  selector: 'cx-cancel-service-order',
  templateUrl: './cancel-service-order.component.html',
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
        mergeMap((order) => {
          if (order) {
            const cancelobj: CancelObj = {
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
              cancelobj
            );
          } else {
            return throwError(
              () => new Error('Order details are not available')
            );
          }
        }),
        mergeMap(() => this.order$), // Re-subscribe to get order details for routing
        mergeMap((order) =>
          this.routingService.go({
            cxRoute: 'orderDetails',
            params: { code: order.code },
          })
        )
      )
      .subscribe({
        next: () => {
          this.globalMessageService.add(
            { key: 'cancelService.cancelServiceSucess' },
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
