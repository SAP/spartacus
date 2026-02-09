/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  TranslatePipe,
} from '@spartacus/core';
import { ICON_TYPE, IconModule, OutletModule } from '@spartacus/storefront';
import { map, shareReplay } from 'rxjs/operators';

import { AppliedGiftCardComponent } from '../applied-gift-card';
import { CommonModule } from '@angular/common';
import { GiftCard } from '../../root/model';
import { GiftCardCheckoutComponent } from '../checkout';
import { GiftCardService } from '../../core/services/gift-card.service';

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
  ],
})
export class GiftCardComponent implements OnInit, OnDestroy {
  protected globalMessageService = inject(GlobalMessageService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected giftCardService = inject(GiftCardService);
  protected formBuilder = inject(UntypedFormBuilder);

  protected subscription = new Subscription();

  giftCardForm: UntypedFormGroup;
  iconTypes = ICON_TYPE;

  isLoading$: Observable<boolean>;
  protected configurationId: string;
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
  ];

  protected showGiftCardForm = false;
  protected appliedGiftCards$: Observable<GiftCard[]>;
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  protected loading$ = this.loadingSubject.asObservable();
  protected cart$: Observable<Cart> = this.activeCartFacade.getActive();

  protected buildForm(): void {
    this.giftCardForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.maxLength(56)]],
      pin: ['', [Validators.required, Validators.maxLength(16)]],
    });
  }


  addGiftCard(): void {
    if (this.giftCardForm.invalid) {
      this.giftCardForm.markAllAsTouched();
      return;
    }

    const { cardNumber, pin } = this.giftCardForm.value;
    this.loadingSubject.next(true);

    this.giftCardService
      .applyGiftCard({
        configurationId: this.configurationId,
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  isGiftCardEnabled$ = this.giftCardService
    .isGiftCardEnabled()
    .pipe(shareReplay(1));

  ngOnInit(): void {
    this.buildForm();
    this.appliedGiftCards$ = this.cart$.pipe(
      map((cart) => cart?.sapGiftCards ?? [])
    );
  }
}
