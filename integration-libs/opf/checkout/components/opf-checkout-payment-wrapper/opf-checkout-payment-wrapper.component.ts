/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { CurrencyService, LanguageService } from '@spartacus/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  OpfGlobalFunctionsDomain,
  OpfGlobalFunctionsFacade,
} from '@spartacus/opf/global-functions/root';
import {
  OpfPaymentRenderPattern,
  OpfPaymentSessionData,
  OpfPaymentEventsService,
} from '@spartacus/opf/payment/root';
import { merge, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  skip,
  switchMap,
  take,
  filter,
} from 'rxjs/operators';
import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';

@Component({
  selector: 'cx-opf-checkout-payment-wrapper',
  templateUrl: './opf-checkout-payment-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfCheckoutPaymentWrapperComponent implements OnInit, OnDestroy {
  protected service = inject(OpfCheckoutPaymentWrapperService);
  protected sanitizer = inject(DomSanitizer);
  protected globalFunctionsService = inject(OpfGlobalFunctionsFacade);
  protected opfPaymentEventsService = inject(OpfPaymentEventsService);
  protected languageService = inject(LanguageService);
  protected currencyService = inject(CurrencyService);
  protected activeCartService = inject(ActiveCartFacade);
  protected vcr = inject(ViewContainerRef);

  @Input() selectedPaymentId: number;

  renderPaymentMethodEvent$ = this.service.getRenderPaymentMethodEvent();

  RENDER_PATTERN = OpfPaymentRenderPattern;

  sub: Subscription = new Subscription();

  bypassSecurityTrustHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  bypassSecurityTrustResourceUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    this.initiatePaymentMode();
    this.listenForReinitiatePaymentEvent();
    this.listenForSiteContextChanges();
  }

  ngOnDestroy() {
    this.globalFunctionsService.unregisterGlobalFunctions(
      OpfGlobalFunctionsDomain.CHECKOUT
    );
    this.sub.unsubscribe();
  }

  retryInitiatePayment(): void {
    this.service.reloadPaymentMode();
  }

  protected listenForReinitiatePaymentEvent(): void {
    this.sub.add(
      this.opfPaymentEventsService?.reinitiatePaymentEvent$.subscribe(
        (paymentOptionId) => {
          this.handleReinitiatePayment(paymentOptionId);
        }
      )
    );
  }

  protected listenForSiteContextChanges(): void {
    this.sub.add(
      merge(
        this.languageService.getActive().pipe(
          skip(1), // Skip the initial value
          distinctUntilChanged()
        ),
        this.currencyService.getActive().pipe(
          skip(1), // Skip the initial value
          distinctUntilChanged()
        )
      )
        .pipe(
          switchMap(() =>
            // Wait for cart to be stable before proceeding
            this.activeCartService.isStable().pipe(
              filter((isStable: boolean) => isStable),
              take(1)
            )
          )
        )
        .subscribe(() => {
          this.opfPaymentEventsService.emitReinitiatePaymentEvent(
            this.selectedPaymentId
          );
        })
    );
  }

  protected handleReinitiatePayment(paymentOptionId?: number): void {
    const idToUse = paymentOptionId ?? this.selectedPaymentId;
    if (idToUse) {
      this.initiatePaymentMode(idToUse);
    }
  }

  protected initiatePaymentMode(paymentOptionId?: number): void {
    const idToUse = paymentOptionId ?? this.selectedPaymentId;
    this.sub.add(
      this.service.initiatePayment(idToUse).subscribe({
        next: (paymentSessionData) => {
          if (this.isHostedFields(paymentSessionData)) {
            this.globalFunctionsService.registerGlobalFunctions({
              domain: OpfGlobalFunctionsDomain.CHECKOUT,
              paymentSessionId: (paymentSessionData as OpfPaymentSessionData)
                .paymentSessionId as string,
              vcr: this.vcr,
            });
          } else {
            this.globalFunctionsService.unregisterGlobalFunctions(
              OpfGlobalFunctionsDomain.CHECKOUT
            );
          }
        },
      })
    );
  }

  protected isHostedFields(
    paymentSessionData: OpfPaymentSessionData | Error
  ): boolean {
    return !!(
      !(paymentSessionData instanceof Error) &&
      paymentSessionData?.paymentSessionId &&
      paymentSessionData?.pattern === OpfPaymentRenderPattern.HOSTED_FIELDS
    );
  }
}
