import { Component, OnInit, inject } from '@angular/core';
import {
  CtaScriptsLocation,
  CtaScriptsRequest,
  OpfPaymentFacade,
} from '@spartacus/opf/base/root';
import { OrderFacade } from '@spartacus/order/root';
import { Order } from 'feature-libs/order/root/model';
import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-cta-scripts',
  templateUrl: './opf-cta-scripts.component.html',
})
export class OpfCtaScriptsComponent implements OnInit {
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected orderDetailsService = inject(OrderFacade);

  ngOnInit() {
    this.orderDetailsService
      .getOrderDetails()
      .pipe(
        switchMap((order) => {
          if (!order) {
            return throwError({ error: 'Order obj not found' });
          }
          console.log('flo order', order);
          const obj: CtaScriptsRequest = {
            orderId: order?.code,
            ctaProductItems: this.getProductItems(order),
            paymentAccountIds: [12, 11, 200, 52, 101],
            scriptLocations: [
              CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE,
            ],
          };
          return this.opfPaymentFacade.ctaScripts(obj);
        })
      )
      .subscribe((ctaScriptsResponse) => {
        console.log('ctaScriptsResponse', ctaScriptsResponse);
      });
  }

  protected getProductItems(
    order: Order
  ): { productId: string; quantity: number }[] | [] {
    return !!order.entries
      ? order.entries
          ?.filter((item) => {
            return !!item?.product?.code && !!item?.quantity;
          })
          .map((item) => {
            return {
              productId: item.product?.code as string,
              quantity: item.quantity as number,
            };
          })
      : [];
  }
}
