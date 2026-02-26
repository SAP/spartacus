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
import { GiftCardService } from '../../core/services/gift-card.service';
import { SAPGiftCards } from '../../root/model';
import { AppliedGiftCardComponent } from '../applied-gift-card';
import { GiftCardCheckoutComponent } from '../checkout';
@Component({
  selector: 'cx-gift-card',
  templateUrl: './gift-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
    CommonModule,
    OutletModule,
    FormsModule,
    ReactiveFormsModule,
    AppliedGiftCardComponent,
    GiftCardCheckoutComponent,
    IconModule,
    FormErrorsComponent,
  ],
})
export class GiftCardComponent implements OnInit, OnDestroy {
  protected globalMessageService = inject(GlobalMessageService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected giftCardService = inject(GiftCardService);
  protected formBuilder = inject(UntypedFormBuilder);
  protected opfPaymentEventsService = inject(OpfPaymentEventsService);

  protected subscription = new Subscription();
  giftCardForm: UntypedFormGroup;
  iconTypes = ICON_TYPE;

  isLoading$: Observable<boolean>;

  protected showGiftCardForm = false;
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  protected loading$ = this.loadingSubject.asObservable();
  protected cart$: Observable<Cart> = this.activeCartFacade.getActive();
  isBillingAddressPresent$!: Observable<boolean>;

  protected appliedGiftCards$: Observable<SAPGiftCards[]> = this.cart$.pipe(
    map((cart): SAPGiftCards[] => cart?.sapGiftCards ?? [])
  );

  protected buildForm(): void {
    this.giftCardForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.maxLength(64)]],
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

    this.giftCardService
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

  isGiftCardEnabled$ = this.giftCardService
    .isGiftCardEnabled()
    .pipe(shareReplay(1));

  ngOnInit(): void {
    this.giftCardService
      .isGiftCardCoveredTotalAmount(this.cart$)
      .subscribe((isCovered) => {
        this.opfPaymentEventsService.emitIsGiftCardCoveredTotalAmountEvent(
          isCovered
        );
      });

    if (this.outlet?.context$) {
      this.outlet.context$.subscribe((context) => {
        this.isBillingAddressPresent$ = context?.disabled;
      });
    }

    this.buildForm();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
