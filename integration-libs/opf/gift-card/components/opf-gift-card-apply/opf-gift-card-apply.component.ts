/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Optional,
  inject,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
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
  ICON_TYPE,
  IconModule,
  OutletContextData,
  OutletModule,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { OpfPaymentEventsService } from '@spartacus/opf/payment/root';
import { OpfGiftCardFacade } from '../../root/facade/opf-gift-card.facade';
import { SAPGiftCards } from '../../root/model/opf-gift-card.model';
import { OpfGiftCardAppliedComponent } from '../opf-gift-card-applied/opf-gift-card-applied.component';
import { OpfGiftCardCheckoutPlaceOrderComponent } from '../opf-gift-card-checkout/opf-gift-card-checkout-place-order/opf-gift-card-checkout-place-order.component';
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
    IconModule,
    FormErrorsComponent,
  ],
})
export class OpfGiftCardApplyComponent implements OnInit, OnDestroy {
  protected globalMessageService = inject(GlobalMessageService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected giftCardFacade = inject(OpfGiftCardFacade);
  protected formBuilder = inject(UntypedFormBuilder);
  protected opfPaymentEventsService = inject(OpfPaymentEventsService);
  protected subscription = new Subscription();
  giftCardForm: UntypedFormGroup;
  iconTypes = ICON_TYPE;

  protected showGiftCardForm = false;
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  protected loading$ = this.loadingSubject.asObservable();
  protected cart$: Observable<Cart> = this.activeCartFacade.getActive();
  isBillingAddressPresent$!: Observable<void>;

  protected appliedGiftCards$: Observable<SAPGiftCards[]> = this.cart$.pipe(
    map((cart): SAPGiftCards[] => cart?.sapGiftCards ?? [])
  );

  protected buildForm(): void {
    this.giftCardForm = this.formBuilder.group({
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      pin: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(28),
        ],
      ],
    });
  }

  constructor(@Optional() protected outlet?: OutletContextData<any>) {}

  addGiftCard(): void {
    if (this.giftCardForm.invalid) {
      this.giftCardForm.markAllAsTouched();
      return;
    }

    const { cardNumber, pin } = this.giftCardForm.value;
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
            { key: 'giftCard.appliedSuccessfully' },
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
      'giftCard.errors.applyFailed';
    this.globalMessageService.add(
      { raw: message },
      GlobalMessageType.MSG_TYPE_ERROR
    );
    this.loadingSubject.next(false);
  }

  toggleGiftCardForm() {
    this.showGiftCardForm = !this.showGiftCardForm;
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
        cart?._availableOperations?.find(
          (operations) => operations.key === 'applyGiftCard'
        )?.value?.available ?? true
      );
    })
  );

  ngOnInit(): void {
    this.subscription.add(
      this.giftCardFacade
        .isGiftCardCoveredTotalAmount(this.cart$)
        .subscribe((isCovered) => {
          this.opfPaymentEventsService.emitIsGiftCardCoveredTotalAmountEvent(
            isCovered
          );
        })
    );

    if (this.outlet?.context$) {
      this.subscription.add(
        this.outlet.context$.subscribe((context) => {
          this.isBillingAddressPresent$ = context?.disabled;
        })
      );
    }
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
