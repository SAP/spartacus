/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AsyncPipe,
  NgClass,
  NgFor,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CurrencyService,
  FeatureToggles,
  LanguageService,
  TranslatePipe,
} from '@spartacus/core';
import { OpfConfig } from '@spartacus/opf/base/root';
import {
  OpfGlobalFunctionsDomain,
  OpfGlobalFunctionsFacade,
} from '@spartacus/opf/global-functions/root';
import {
  OpfPaymentEventsService,
  OpfPaymentRenderPattern,
  OpfPaymentSessionData,
} from '@spartacus/opf/payment/root';
import { SpinnerComponent } from '@spartacus/storefront';
import { merge, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  skip,
  switchMap,
  take,
} from 'rxjs/operators';
import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';

@Component({
  selector: 'cx-opf-checkout-payment-wrapper',
  templateUrl: './opf-checkout-payment-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgTemplateOutlet,
    NgFor,
    NgClass,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
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
  protected cdr = inject(ChangeDetectorRef);
  protected opfConfig = inject(OpfConfig);
  protected destroyRef = inject(DestroyRef);
  private featureToggles = inject(FeatureToggles);

  protected isPaymentDataReady = false;
  protected readonly PAYMENT_IFRAME_NAME = 'cx-payment-iframe';

  @Input() selectedPaymentId: number;
  @ViewChild('paymentForm') formElement!: ElementRef<HTMLFormElement>;

  renderPaymentMethodEvent$ = this.service.getRenderPaymentMethodEvent();

  RENDER_PATTERN = OpfPaymentRenderPattern;

  sub: Subscription = new Subscription();

  bypassSecurityTrustHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  bypassSecurityTrustResourceUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getIframeSandbox(paymentOptionId?: number): string | undefined {
    const sandboxMap = this.opfConfig?.opf?.paymentOption?.iframeSandboxMap;
    if (paymentOptionId && sandboxMap && sandboxMap[paymentOptionId]) {
      return sandboxMap[paymentOptionId];
    }
    return undefined;
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

  protected submitFormToIframe(): void {
    if (this.isPaymentDataReady && this.formElement?.nativeElement) {
      const form = this.formElement.nativeElement;
      if (this.formElement.nativeElement?.target === this.PAYMENT_IFRAME_NAME) {
        form.submit();
      }
    }
  }

  protected listenForReinitiatePaymentEvent(): void {
    if (this.featureToggles.opfUseDestroyRef) {
      this.opfPaymentEventsService.reinitiatePaymentEvent$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((paymentOptionId) => {
          this.handleReinitiatePayment(paymentOptionId);
        });
    } else {
      this.sub.add(
        this.opfPaymentEventsService.reinitiatePaymentEvent$.subscribe(
          (paymentOptionId) => {
            this.handleReinitiatePayment(paymentOptionId);
          }
        )
      );
    }
  }

  protected listenForSiteContextChanges(): void {
    const merged$ = merge(
      this.languageService.getActive().pipe(
        skip(1), // Skip the initial value
        distinctUntilChanged()
      ),
      this.currencyService.getActive().pipe(
        skip(1), // Skip the initial value
        distinctUntilChanged()
      )
    ).pipe(
      switchMap(() =>
        // Wait for cart to be stable before proceeding
        this.activeCartService.isStable().pipe(
          filter((isStable: boolean) => isStable),
          take(1)
        )
      )
    );

    if (this.featureToggles.opfUseDestroyRef) {
      merged$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.opfPaymentEventsService.emitReinitiatePaymentEvent(
          this.selectedPaymentId
        );
      });
    } else {
      this.sub.add(
        merged$.subscribe(() => {
          this.opfPaymentEventsService.emitReinitiatePaymentEvent(
            this.selectedPaymentId
          );
        })
      );
    }
  }

  protected handleReinitiatePayment(paymentOptionId?: number): void {
    const idToUse = paymentOptionId ?? this.selectedPaymentId;
    if (idToUse) {
      this.initiatePaymentMode(idToUse);
    }
  }

  protected initiatePaymentMode(paymentOptionId?: number): void {
    const idToUse = paymentOptionId ?? this.selectedPaymentId;
    this.isPaymentDataReady = false;

    const payment$ = this.service.initiatePayment(idToUse);

    const observer = {
      next: (paymentSessionData: OpfPaymentSessionData | Error) => {
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

        this.isPaymentDataReady = true;
        this.cdr.detectChanges();
        this.submitFormToIframe();
      },
      error: () => {
        this.isPaymentDataReady = false;
      },
    };

    if (this.featureToggles.opfUseDestroyRef) {
      payment$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(observer);
    } else {
      this.sub.add(payment$.subscribe(observer));
    }
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
