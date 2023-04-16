import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import {
  defaultOpfConfig,
  KeyValuePair,
  OpfCheckoutFacade,
  OpfConfig,
  OpfVerifyPaymentPayload,
  OpfVerifyPaymentResponse,
} from '@spartacus/opf/root';
import { OrderFacade } from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-verify-payment',
  templateUrl: './opf-verify-payment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfVerifyPaymentComponent implements OnInit {
  verifyPaymentPayload?: OpfVerifyPaymentPayload;
  paymentSessionId?: string;
  isAuthorized?: string;
  placedOrder: void | Observable<ComponentRef<any> | undefined>;
  paymentObs$: Observable<OpfVerifyPaymentResponse | undefined>;
  path?: string;

  constructor(
    protected route: ActivatedRoute,
    protected routingService: RoutingService,
    protected orderFacade: OrderFacade,
    protected opfCheckoutService: OpfCheckoutFacade,
    protected launchDialogService: LaunchDialogService,
    protected config: OpfConfig
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');

    this.route.url
      .pipe(
        map((segments) => segments.join('/')),
        switchMap((url: string) => {
          console.log(
            'defaultOpfConfig.opf?.successUrl',
            defaultOpfConfig.opf?.successUrl
          );
          console.log('url', url);
          this.path = url.includes(defaultOpfConfig.opf?.successUrl as string)
            ? 'SuccessPath'
            : 'CancelPath';

          return this.route.queryParams;
        }),
        switchMap((params) => {
          const list: KeyValuePair[] = Object.entries(params).map((pair) => {
            return { key: pair[0], value: pair[1] as string };
          });

          this.paymentSessionId = this.getPaymentSessionId(list);
          if (!this.paymentSessionId) return of(null);
          return this.opfCheckoutService.getVerifyPaymentState(
            this.paymentSessionId,
            { responseMap: [...list] }
          );
        }),
        filter((state) => !state?.loading),
        map((state) => state?.data)
      )
      .subscribe({
        error: (error) => {
          console.log('getVerifyPaymentState ERROR', error);
        },

        next: (response) => {
          this.isAuthorized = 'Hello';
          console.log('AUTHORIZED payment', response?.result);

          //  response?.result == 'AUTHORIZED' ? 'true' : 'false';
          // this.placeOrder();
        },
      });

    // console.log(
    //   'urls',
    //   this.route.snapshot.url.map((url: any) => url.path).join('/')
    // );
    // const list: KeyValuePair[] = Object.entries(
    //   this.route.snapshot.queryParams
    // ).map((pair) => {
    //   return { key: pair[0], value: pair[1] as string };
    // });
    // this.verifyPaymentPayload = { responseMap: [...list] };
    // console.log('verifyPaymentpayload', list);
    // if (list.length <= 0) {
    //   console.log('payload is null');
    //   return;
    // }
    // this.paymentSessionId = this.getPaymentSessionId(list);
    // if (!this.paymentSessionId) {
    //   console.log('paymentSessionId is null');
    //   return;
    // }

    // this.opfCheckoutService
    //   .getVerifyPaymentState(
    //     this.paymentSessionId,
    //     JSON.stringify(this.verifyPaymentPayload)
    //   )
    //   .pipe(
    //     filter((state) => !state.loading),
    //     map((state) => state.data)
    //   )
    //   .subscribe({
    //     error: (error) => {
    //       console.log('getVerifyPaymentState ERROR', error);
    //     },

    //     next: (response) => {
    //       console.log('AUTHORIZED payment', response);

    //       this.isAuthorized = response?.result === 'AUTHORIZED' ? true : false;
    //       this.placeOrder();
    //     },
    //   });
  }

  private getPaymentSessionId(list: KeyValuePair[]): string | undefined {
    return (
      list.find((pair) => pair.key === 'paymentSessionId')?.value ?? undefined
    );
  }

  placeOrder() {
    // true as user already checked T&C from last Checkout step
    this.orderFacade.placeOrder(true).subscribe({
      error: () => {
        if (!this.placedOrder) {
          return;
        }

        this.placedOrder
          .subscribe((component) => {
            this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
            if (component) {
              component.destroy();
            }
          })
          .unsubscribe();
      },
      next: () => this.onSuccess(),
    });
  }

  onSuccess(): void {
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }
}
