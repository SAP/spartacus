/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActiveCartFacade, DeliveryMode } from '@spartacus/cart/base/root';
import { B2BCheckoutReviewSubmitComponent } from '@spartacus/checkout/b2b/components';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import { TranslationService, UserCostCenterService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  CheckoutServiceDetailsFacade,
  CheckoutServiceSchedulePickerService,
  ServiceDateTime,
  S4ServiceDeliveryModeConfig,
} from '@spartacus/s4-service/root';

@Component({
  selector: 'cx-review-submit',
  templateUrl: './service-checkout-review-submit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCheckoutReviewSubmitComponent extends B2BCheckoutReviewSubmitComponent {
  checkoutStepTypeServiceDetails = CheckoutStepType.SERVICE_DETAILS;
  protected checkoutServiceDetailsFacade = inject(CheckoutServiceDetailsFacade);
  protected checkoutServiceSchedulePickerService = inject(
    CheckoutServiceSchedulePickerService
  );
  protected config = inject(S4ServiceDeliveryModeConfig);

  constructor(
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected activeCartFacade: ActiveCartFacade,
    protected translationService: TranslationService,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade,
    protected userCostCenterService: UserCostCenterService
  ) {
    super(
      checkoutDeliveryAddressFacade,
      checkoutPaymentFacade,
      activeCartFacade,
      translationService,
      checkoutStepService,
      checkoutDeliveryModesFacade,
      checkoutPaymentTypeFacade,
      checkoutCostCenterFacade,
      userCostCenterService
    );
  }

  get scheduledAt$(): Observable<string | undefined> {
    return this.checkoutServiceDetailsFacade
      .getSelectedServiceDetailsState()
      .pipe(
        filter((state) => !state.loading && !state.error),
        map((state) => {
          return state.data;
        })
      );
  }
  protected getCheckoutDeliverySteps(): Array<CheckoutStepType | string> {
    return [
      CheckoutStepType.DELIVERY_ADDRESS,
      CheckoutStepType.DELIVERY_MODE,
      CheckoutStepType.SERVICE_DETAILS,
    ];
  }

  shouldShowDeliveryModeCard(mode: DeliveryMode): boolean {
    return mode.code !== this.config.s4ServiceDeliveryMode?.code;
  }

  getServiceDetailsCard(
    scheduledAt: ServiceDateTime | undefined | null
  ): Observable<Card> {
    return this.translationService
      .translate('serviceOrderCheckout.serviceDetails')
      .pipe(
        map((textTitle) => {
          if (scheduledAt) {
            scheduledAt =
              this.checkoutServiceSchedulePickerService.convertDateTimeToReadableString(
                scheduledAt
              );
          }
          return {
            title: textTitle,
            textBold: scheduledAt?.split(',')[0] ?? '',
            text: [scheduledAt?.split(',')[1].trim() ?? ''],
          };
        })
      );
  }
}
