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
import { SAPGiftCard } from '../../root/model';
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
  // protected configurationId: string;
  //mockGiftCards: SAPGiftCard[] = [];
  mockGiftCards = [
    {
      id: 'GC1',
      maskedNumber: '****1111',
      balance: { currencyIso: 'USD', formattedValue: '$100', value: 100 },
      appliedAmount: { currencyIso: 'USD', formattedValue: '$20', value: 20 },
      remainingBalance: {
        currencyIso: 'USD',
        formattedValue: '$80',
        value: 80,
      },
    },
    {
      id: 'GC2',
      maskedNumber: '****2222',
      balance: { currencyIso: 'USD', formattedValue: '$50', value: 50 },
      appliedAmount: { currencyIso: 'USD', formattedValue: '$10', value: 10 },
      remainingBalance: {
        currencyIso: 'USD',
        formattedValue: '$40',
        value: 40,
      },
    },
    {
      id: 'GC3',
      maskedNumber: '****3333',
      balance: { currencyIso: 'USD', formattedValue: '$25', value: 25 },
      appliedAmount: { currencyIso: 'USD', formattedValue: '$5', value: 5 },
      remainingBalance: {
        currencyIso: 'USD',
        formattedValue: '$20',
        value: 20,
      },
    },
    {
      id: 'GC4',
      maskedNumber: '****3333',
      balance: { currencyIso: 'USD', formattedValue: '$25', value: 25 },
      appliedAmount: { currencyIso: 'USD', formattedValue: '$5', value: 5 },
      remainingBalance: {
        currencyIso: 'USD',
        formattedValue: '$20',
        value: 20,
      },
    },
    {
      id: 'GC5',
      maskedNumber: '****3333',
      balance: { currencyIso: 'USD', formattedValue: '$25', value: 25 },
      appliedAmount: { currencyIso: 'USD', formattedValue: '$5', value: 5 },
      remainingBalance: {
        currencyIso: 'USD',
        formattedValue: '$20',
        value: 20,
      },
    },
    {
      id: 'GC6',
      maskedNumber: '****3333',
      balance: { currencyIso: 'USD', formattedValue: '$25', value: 25 },
      appliedAmount: { currencyIso: 'USD', formattedValue: '$5', value: 5 },
      remainingBalance: {
        currencyIso: 'USD',
        formattedValue: '$20',
        value: 20,
      },
    },
    {
      id: 'GC7',
      maskedNumber: '****3333',
      balance: { currencyIso: 'USD', formattedValue: '$25', value: 25 },
      appliedAmount: { currencyIso: 'USD', formattedValue: '$5', value: 5 },
      remainingBalance: {
        currencyIso: 'USD',
        formattedValue: '$20',
        value: 20,
      },
    },
    {
      id: 'GC8',
      maskedNumber: '****3333',
      balance: { currencyIso: 'USD', formattedValue: '$25', value: 25 },
      appliedAmount: { currencyIso: 'USD', formattedValue: '$5', value: 5 },
      remainingBalance: {
        currencyIso: 'USD',
        formattedValue: '$20',
        value: 20,
      },
    },
    {
      id: 'GC9',
      maskedNumber: '****3333',
      balance: { currencyIso: 'USD', formattedValue: '$25', value: 25 },
      appliedAmount: { currencyIso: 'USD', formattedValue: '$5', value: 5 },
      remainingBalance: {
        currencyIso: 'USD',
        formattedValue: '$20',
        value: 20,
      },
    },
    {
      id: 'GC10',
      maskedNumber: '****3333',
      balance: { currencyIso: 'USD', formattedValue: '$25', value: 25 },
      appliedAmount: { currencyIso: 'USD', formattedValue: '$5', value: 5 },
      remainingBalance: {
        currencyIso: 'USD',
        formattedValue: '$20',
        value: 20,
      },
    },
  ];

  protected showGiftCardForm = false;
  protected appliedGiftCards$: Observable<SAPGiftCard[]>;
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  protected loading$ = this.loadingSubject.asObservable();
  protected cart$: Observable<Cart> = this.activeCartFacade.getActive();

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
            { key: 'giftCard.addedSuccessfully' },
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
  //billing address is not set this will tell
  isBillingAddressPresent$!: Observable<boolean>;

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
    this.isBillingAddressPresent$.subscribe((x) => {
      console.log('isBillingAddressPresent', x);
    });
    this.cart$.subscribe((cart) => {
      console.log('cart', cart);
    });
    this.buildForm();
    this.appliedGiftCards$ = this.cart$.pipe(
      map((cart) => cart?.sapGiftCards ?? [])
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
