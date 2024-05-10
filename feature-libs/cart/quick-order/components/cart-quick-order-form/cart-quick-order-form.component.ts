/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  ActiveCartFacade,
  Cart,
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
} from '@spartacus/cart/base/root';
import {
  EventService,
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-quick-order-form',
  templateUrl: './cart-quick-order-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartQuickOrderFormComponent implements OnInit, OnDestroy {
  private featureConfig = inject(FeatureConfigService);

  quickOrderForm: UntypedFormGroup;
  cartIsLoading$: Observable<boolean> = this.activeCartService
    .isStable()
    .pipe(map((loaded) => !loaded));
  cart$: Observable<Cart> = this.activeCartService.getActive();
  min = 1;

  protected subscription: Subscription = new Subscription();
  protected cartEventsSubscription: Subscription = new Subscription();
  protected minQuantityValue: number = 1;

  constructor(
    protected activeCartService: ActiveCartFacade,
    protected eventService: EventService,
    protected formBuilder: UntypedFormBuilder,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.watchQuantityChange();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.cartEventsSubscription?.unsubscribe();
  }

  applyQuickOrder(): void {
    if (this.quickOrderForm.invalid) {
      this.quickOrderForm.markAllAsTouched();
      return;
    }

    const productCode = this.quickOrderForm.get('productCode')?.value;
    const quantity = this.quickOrderForm.get('quantity')?.value;

    this.watchAddEntrySuccessEvent();
    if (
      !this.featureConfig.isEnabled('cartQuickOrderRemoveListeningToFailEvent')
    ) {
      this.watchAddEntryFailEvent();
    }

    if (productCode && quantity) {
      this.activeCartService.addEntry(productCode, quantity);
    }
  }

  protected buildForm(): void {
    this.quickOrderForm = this.formBuilder.group({
      productCode: ['', [Validators.required]],
      quantity: [
        this.minQuantityValue,
        { updateOn: 'blur', validators: [Validators.required] },
      ],
    });
  }

  protected watchQuantityChange(): void {
    this.subscription.add(
      this.quickOrderForm
        .get('quantity')
        ?.valueChanges.subscribe((value) =>
          this.quickOrderForm
            .get('quantity')
            ?.setValue(this.getValidCount(value), { emitEvent: false })
        )
    );
  }

  protected watchAddEntrySuccessEvent(): void {
    this.cartEventsSubscription.add(
      this.eventService
        .get(CartAddEntrySuccessEvent)
        .pipe(first())
        .subscribe((data: CartAddEntrySuccessEvent) => {
          let key = 'quickOrderCartForm.stockLevelReached';
          let productTranslation;
          let messageType = GlobalMessageType.MSG_TYPE_WARNING;

          if (data.quantityAdded) {
            key =
              data.quantityAdded > 1
                ? 'quickOrderCartForm.entriesWereAdded'
                : 'quickOrderCartForm.entryWasAdded';

            productTranslation =
              data.quantityAdded > 1
                ? 'quickOrderCartForm.products'
                : 'quickOrderCartForm.product';

            messageType = GlobalMessageType.MSG_TYPE_CONFIRMATION;
          }

          this.globalMessageService.add(
            {
              key,
              params: {
                product: data?.entry?.product?.name || productTranslation,
                quantity: data.quantityAdded,
              },
            },
            messageType
          );
          this.resetForm();
        })
    );
  }

  /**
   * @deprecated since 2211.24
   *
   * This method is no longer needed since BadRequestHandler.handleUnknownIdentifierError was introduced.
   * If this method is used an unnecessary duplicated error message will appear in the UI.
   * Therefore this method will be removed.
   *
   * You can enable the Feature Toggle 'cartQuickOrderRemoveListenToFailEvent'
   * to stop calling this method by default.
   */
  protected watchAddEntryFailEvent(): void {
    this.cartEventsSubscription.add(
      this.eventService
        .get(CartAddEntryFailEvent)
        .pipe(first())
        .subscribe(() => {
          this.globalMessageService.add(
            {
              key: 'quickOrderCartForm.noResults',
            },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        })
    );
  }

  protected getValidCount(value: number) {
    if (value < this.min || !value) {
      value = this.min;
    }

    return value;
  }

  protected resetForm(): void {
    this.quickOrderForm.reset();
  }
}
