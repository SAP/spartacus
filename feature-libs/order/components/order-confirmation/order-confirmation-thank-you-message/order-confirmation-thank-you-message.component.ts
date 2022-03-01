import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  TranslationService,
} from '@spartacus/core';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { filter, take, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'cx-order-confirmation-thank-you-message',
  templateUrl: './order-confirmation-thank-you-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationThankYouMessageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  order$: Observable<Order | undefined>;

  isGuestCustomer = false;
  orderGuid: string | undefined;

  constructor(
    protected orderFacade: OrderFacade,
    protected globalMessageService: GlobalMessageService,
    protected translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.order$ = this.orderFacade.getOrderDetails().pipe(
      tap((order) => {
        this.isGuestCustomer =
          order && 'guestCustomer' in order
            ? order.guestCustomer ?? false
            : false;
        this.orderGuid = order?.guid;
      })
    );
  }

  ngAfterViewInit(): void {
    this.addThankYouMessage();
  }

  ngOnDestroy() {
    this.orderFacade.clearPlacedOrder();
  }

  protected addThankYouMessage() {
    this.getThankYouAssistiveMessage()
      .pipe(take(1))
      .subscribe(
        ([
          order,
          confirmationOfOrderMessage,
          thankYouMessage,
          invoiceHasBeenSentByEmailMessage,
        ]) => {
          const message = `${confirmationOfOrderMessage} ${order?.code}. ${thankYouMessage} ${invoiceHasBeenSentByEmailMessage}`;
          this.globalMessageService.add(
            message,
            GlobalMessageType.MSG_TYPE_ASSISTIVE
          );
        }
      );
  }

  protected getThankYouAssistiveMessage() {
    const confirmationOfOrderMessage$ = this.translationService.translate(
      'checkoutOrderConfirmation.confirmationOfOrder'
    );
    const thankYouMessage$ = this.translationService.translate(
      'checkoutOrderConfirmation.thankYou'
    );
    const invoiceHasBeenSentByEmailMessage$ = this.translationService.translate(
      'checkoutOrderConfirmation.invoiceHasBeenSentByEmail'
    );

    return this.order$.pipe(
      filter((order) => !!order),
      withLatestFrom(
        confirmationOfOrderMessage$,
        thankYouMessage$,
        invoiceHasBeenSentByEmailMessage$
      )
    );
  }
}
