import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import {
  ActiveConfiguration,
  KeyValuePair,
  OpfCheckoutFacade,
  OpfVerifyPayload as OpfVerifyPaymentPayload,
  OpfVerifyPaymentResponse,
} from '@spartacus/opf/root';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-payment-response',
  templateUrl: './opf-payment-response.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfPaymentResponseComponent implements OnInit {
  subscription: Subscription;
  isSuccess: boolean;
  verifyPaymentPayload: OpfVerifyPaymentPayload;
  verifyPaymentResult: OpfVerifyPaymentResponse;
  selectedPaymentId?: number;

  activeConfiguratons$: Observable<ActiveConfiguration[] | undefined>;
  constructor(
    protected routingService: RoutingService,
    protected route: ActivatedRoute,
    private opfCheckoutService: OpfCheckoutFacade
  ) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.routingService.go({ cxRoute: 'verifypayment' });
    // this.opfCheckoutService
    //   .getActiveConfigurationsState()
    //   .pipe(
    //     filter((state) => !state.loading),
    //     map((state) => state.data),
    //     tap((activeConfiguratons) => {
    //       console.log('activeConfiguratons');
    //       if (activeConfiguratons?.length) {
    //         this.selectedPaymentId = activeConfiguratons[0].id;
    //       }
    //     })
    //   )
    //   .subscribe();

    console.log(
      'urls',
      this.route.snapshot.url.map((url: any) => url.path).join('/')
    );
    const list: KeyValuePair[] = Object.entries(
      this.route.snapshot.queryParams
    ).map((pair) => {
      return { key: pair[0], value: pair[1] as string };
    });
    this.verifyPaymentPayload = { responseMap: [...list] };
    console.log('verifyPaymentpayload', list);
    if (list.length <= 0) {
      console.log('payload is null');
      return;
    }
    const paymentSessionId = this.getPaymentSessionId(list);
    if (!paymentSessionId) {
      console.log('paymentSessionId is null');
      return;
    }
    console.log('paymentSessionId is ', paymentSessionId);
    this.opfCheckoutService.getActiveConfigurationsState().pipe(
      filter((state) => !state.loading),
      map((state) => state.data)
      // tap((verifyPaymentResult) => {
      //   if (verifyPaymentResult?.result === 'AUTHORIZED') {
      //     console.log('AUTHORIZED payment');
      //   }
      // })
    );
    // .subscribe((verifyPaymentResult) => {
    //   //if (verifyPaymentResult?.result === 'AUTHORIZED') {
    //   console.log('AUTHORIZED payment', verifyPaymentResult);
    //   this.routingService.go({ cxRoute: 'verifypayment' });
    //   //   }
    // });

    // make verify call
  }

  private getPaymentSessionId(list: KeyValuePair[]): string | null {
    return list.find((pair) => pair.key === 'paymentSessionId')?.value ?? null;
  }
}
