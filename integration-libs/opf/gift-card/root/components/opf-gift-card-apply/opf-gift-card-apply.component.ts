/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  Optional,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  TranslatePipe,
} from '@spartacus/core';
import {
  FormErrorsComponent,
  OutletContextData,
  OutletModule,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { OpfPaymentEventsService } from '@spartacus/opf/payment/root';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import { OpfGiftCardFacade } from '../../facade';
import { OpfGiftCardAppliedComponent } from '../opf-gift-card-applied';
import { OpfGiftCardCheckoutPlaceOrderComponent } from '../opf-gift-card-checkout';
import { OpfGiftCards } from '../../model';

@Component({
  selector: 'cx-opf-gift-card-apply',
  templateUrl: './opf-gift-card-apply.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
    CommonModule,
    OutletModule,
    FormsModule,
    ReactiveFormsModule,
    OpfGiftCardAppliedComponent,
    OpfGiftCardCheckoutPlaceOrderComponent,
    FormErrorsComponent,
  ],
})
export class OpfGiftCardApplyComponent implements OnInit {
  protected globalMessageService = inject(GlobalMessageService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected giftCardFacade = inject(OpfGiftCardFacade);
  protected formBuilder = inject(NonNullableFormBuilder);
  protected opfPaymentEventsService = inject(OpfPaymentEventsService);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected destroyRef = inject(DestroyRef);

  giftCardForm = this.formBuilder.group({
    cardNumber: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(64)],
    ],
    pin: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(28)],
    ],
  });

  protected showGiftCardForm = signal(false);
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  protected loading$ = this.loadingSubject.asObservable();
  protected cart$: Observable<Cart> = this.activeCartFacade.getActive();
  isBillingAddressPresent$!: Observable<void>;

  protected appliedGiftCards$: Observable<OpfGiftCards[]> = this.cart$.pipe(
    map((cart): OpfGiftCards[] => cart?.opfGiftCards ?? [])
  );

  constructor(@Optional() protected outlet?: OutletContextData) {}

  addGiftCard(): void {
    if (this.giftCardForm.invalid) {
      this.giftCardForm.markAllAsTouched();
      return;
    }

    const { cardNumber, pin } = this.giftCardForm.getRawValue();
    this.loadingSubject.next(true);

    this.giftCardFacade
      .applyGiftCard({
        number: cardNumber,
        securityCode: pin,
      })
      .subscribe({
        next: () => {
          this.activeCartFacade.reloadActiveCart();
          this.globalMessageService.add(
            { key: 'opfGiftCard.appliedSuccessfully' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
          this.resetForm();
          this.toggleGiftCardForm();
          this.loadingSubject.next(false);
        },
        error: (error: HttpErrorModel) => this.handleGiftCardError(error),
      });
  }

  protected handleGiftCardError(error: HttpErrorModel): void {
    const message =
      error?.details?.[0]?.message ||
      error?.message ||
      'opfGiftCard.errors.applyFailed';
    this.globalMessageService.add(
      { raw: message },
      GlobalMessageType.MSG_TYPE_ERROR
    );
    this.loadingSubject.next(false);
  }

  toggleGiftCardForm() {
    this.showGiftCardForm.set(!this.showGiftCardForm());
  }

  protected resetForm(): void {
    this.giftCardForm.reset();
  }

  isGiftCardEnabled$ = this.giftCardFacade
    .isGiftCardEnabled()
    .pipe(shareReplay(1));

  isAddGiftCard$ = this.cart$.pipe(
    map((cart) => {
      return (
        cart?.availableOperations?.find(
          (operations) => operations.key === 'applyGiftCard'
        )?.value?.available ?? true
      );
    })
  );

  ngOnInit(): void {
    this.giftCardFacade
      .isGiftCardCoveredTotalAmount(this.cart$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isCovered) => {
        this.opfPaymentEventsService.emitIsGiftCardCoveredTotalAmountEvent(
          isCovered
        );
      });

    // Close gift card form when other payment options are selected
    // selectedPaymentOptionId is -1 for saved payment details.
    this.opfMetadataStoreService
      .getOpfMetadataState()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((x) => {
        if ((x.selectedPaymentOptionId ?? 0) >= -1 && this.showGiftCardForm()) {
          this.giftCardForm.reset();
          this.toggleGiftCardForm();
        }
      });

    if (this.outlet?.context$) {
      this.outlet.context$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((context) => {
          this.isBillingAddressPresent$ = context?.disabled;
        });
    }
  }
}
