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
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
} from '@spartacus/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { GiftCard } from '../../root/model';
import { GiftCardService } from '../../core/services/gift-card.service';
import { ICON_TYPE } from '@spartacus/storefront';
import { OpfActiveConfiguration } from '@spartacus/opf/base/root';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-gift-card',
  templateUrl: './gift-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
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

  protected initializeGiftCardConfiguration(): void {
    this.subscription.add(
      this.giftCardService.getGiftCardConfiguration().subscribe({
        next: (config: OpfActiveConfiguration | undefined) => {
          if (config?.id) {
            this.configurationId = config.id.toString();
          } else {
            this.globalMessageService.add(
              { key: 'giftCard.errors.configurationNotFound' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          }
        },
        error: () => {
          this.globalMessageService.add(
            { key: 'giftCard.errors.configurationNotFound' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        },
      })
    );
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
  ngOnInit(): void {
    console.log('GiftCardComponent initialized');
    this.initializeGiftCardConfiguration();
    this.buildForm();
    this.appliedGiftCards$ = this.cart$.pipe(
      map((cart) => cart?.sapGiftCards ?? [])
    );
  }
}
