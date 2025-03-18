/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card, ICON_TYPE } from '@spartacus/storefront';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { TranslationService } from '@spartacus/core';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import {
  OpfBaseFacade,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';

@Component({
  selector: 'cx-opf-b2b-checkout-payment-method',
  templateUrl: './opf-b2b-checkout-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfB2bCheckoutPaymentMethodComponent {
  protected opfBaseFacade = inject(OpfBaseFacade);
  protected translationService = inject(TranslationService);
  protected checkoutStepService = inject(CheckoutStepService);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);

  checkoutStepTypePaymentType = CheckoutStepType.PAYMENT_TYPE;
  iconTypes = ICON_TYPE;

  get selectedPayment$(): Observable<string | undefined> {
    return combineLatest([
      this.opfBaseFacade.getActiveConfigurationsState(),
      this.opfMetadataStoreService.getOpfMetadataState(),
    ]).pipe(
      map(([state, metadata]) => {
        const configurations = state.data?.value;
        if (!configurations?.length) return undefined;

        const selectedProvider = configurations.find(
          (config) => config.id === metadata.selectedPaymentOptionId
        );
        return selectedProvider?.displayName;
      })
    );
  }

  getPaymentMethodCard(paymentMethod?: string | null): Observable<Card> {
    return combineLatest([
      this.translationService.translate('opfCheckout.paymentMethod'),
      this.translationService.translate('opfCheckout.noPaymentMethod'),
    ]).pipe(
      map(([paymentMethodTitle, noPaymentMethodTitle]) => {
        return {
          title: paymentMethodTitle,
          textBold: paymentMethod || noPaymentMethodTitle,
        };
      })
    );
  }

  getCheckoutStepUrl(stepType: CheckoutStepType | string): string | undefined {
    const step = this.checkoutStepService.getCheckoutStep(
      stepType as CheckoutStepType
    );
    return step?.routeName;
  }
}
