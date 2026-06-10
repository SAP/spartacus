/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  B2BPaymentTypeEnum,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import {
  GlobalMessageService,
  TranslatePipe,
  UserIdService,
} from '@spartacus/core';
import {
  OpfActiveConfiguration,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { OpfCheckoutPaymentsComponent } from '@spartacus/opf/checkout/components';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';
import { FeatureToggles } from '@spartacus/core';
import { SpinnerComponent } from '@spartacus/storefront';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  filter,
  Observable,
  Subscription,
  switchMap,
  take,
} from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-b2b-checkout-payment-type',
  templateUrl: './opf-b2b-checkout-payment-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    OpfCheckoutPaymentsComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class OpfB2bCheckoutPaymentTypeComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected userIdService = inject(UserIdService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected checkoutPaymentTypeFacade = inject(CheckoutPaymentTypeFacade);
  protected checkoutStepService = inject(CheckoutStepService);
  protected activatedRoute = inject(ActivatedRoute);
  protected globalMessageService = inject(GlobalMessageService);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected fb = inject(FormBuilder);
  protected destroyRef = inject(DestroyRef);
  protected featureToggles = inject(FeatureToggles);

  protected subscription: Subscription = new Subscription();

  @ViewChild('poNumber', { static: false })
  protected poNumberInputElement: ElementRef<HTMLInputElement>;

  protected isUpdating$ = new BehaviorSubject<boolean>(false);
  protected form: FormGroup;

  cartPoNumber$: Observable<string | undefined>;

  protected poNumberValue: string | undefined;
  protected selectedPaymentOption: string | undefined = undefined;

  constructor() {
    this.form = this.fb.group({
      poNumber: [''],
    });
  }

  protected updatePoNumberField(): void {
    if (this.poNumberInputElement?.nativeElement && this.poNumberValue) {
      this.poNumberInputElement.nativeElement.value = this.poNumberValue;
    }
  }

  protected adaptCheckoutSteps(paymentType: string | undefined) {
    if (paymentType) {
      this.checkoutStepService.disableEnableStep(
        CheckoutStepType.PAYMENT_DETAILS,
        paymentType === B2BPaymentTypeEnum.ACCOUNT_PAYMENT
      );
      this.checkoutStepService.disableEnableStep(
        CheckoutStepType.REVIEW_ORDER,
        paymentType !== B2BPaymentTypeEnum.ACCOUNT_PAYMENT
      );
    }
  }

  getCartPoNumber(): Observable<string | undefined> {
    return this.activeCartFacade.getActive().pipe(
      take(1),
      map((cart) => cart.purchaseOrderNumber)
    );
  }

  next(): void {
    const poNumberInput = this.form.get('poNumber')?.value;
    if (this.selectedPaymentOption) {
      this.isUpdating$.next(true);

      this.checkoutPaymentTypeFacade
        .setPaymentType(this.selectedPaymentOption, poNumberInput)
        .subscribe({
          complete: () => {
            this.activeCartFacade.reloadActiveCart();
            this.checkoutStepService.next(this.activatedRoute);
            this.isUpdating$.next(false);
          },
        });
    }
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

  getSelectedPaymentOption(): Observable<string | undefined> {
    return this.opfMetadataStoreService.getOpfMetadataState().pipe(
      take(1),
      map((state) => state.selectedPaymentOptionId?.toString())
    );
  }

  setPaymentOption(paymentOption: string, poNumber?: string) {
    return this.checkoutPaymentTypeFacade
      .setPaymentType(paymentOption, poNumber)
      .pipe(take(1));
  }

  handlePaymentChange(payment: OpfActiveConfiguration): void {
    this.selectedPaymentOption = payment?.id?.toString();
    this.adaptCheckoutSteps(payment?.paymentType);
    if (this.selectedPaymentOption) {
      this.isUpdating$.next(true);
      this.setPaymentOption(
        this.selectedPaymentOption,
        this.form.get('poNumber')?.value
      ).subscribe({
        complete: () => {
          this.activeCartFacade.reloadActiveCart();
          this.isUpdating$.next(false);
        },
      });
    }
  }

  ngOnInit(): void {
    this.cartPoNumber$ = this.getCartPoNumber();

    this.getSelectedPaymentOption().subscribe(
      (selectedOption) => (this.selectedPaymentOption = selectedOption)
    );

    if (this.featureToggles.opfUseDestroyRef) {
      this.cartPoNumber$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((poNumber) => {
          this.poNumberValue = poNumber;
          this.form.patchValue({ poNumber });
        });
    } else {
      this.subscription.add(
        this.cartPoNumber$.subscribe((poNumber) => {
          this.poNumberValue = poNumber;
          this.form.patchValue({ poNumber });
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (this.poNumberValue) {
      this.form.patchValue({ poNumber: this.poNumberValue });
    }

    this.getSelectedPaymentOption()
      .pipe(
        take(1),
        filter((paymentOption) => paymentOption === undefined),
        tap(() => this.opfMetadataStoreService.clearOpfMetadata()),
        switchMap(() =>
          this.opfMetadataStoreService.getOpfMetadataState().pipe(
            filter(
              (state) => state.defaultSelectedPaymentOptionId !== undefined
            ),
            take(1)
          )
        ),
        switchMap((state) => {
          const paymentId = state.defaultSelectedPaymentOptionId as number;
          this.selectedPaymentOption = paymentId.toString();
          return this.setPaymentOption(
            this.selectedPaymentOption,
            this.poNumberValue
          ).pipe(take(1));
        })
      )
      .subscribe();
  }
}
