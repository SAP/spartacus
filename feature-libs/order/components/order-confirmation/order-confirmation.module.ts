/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  OrderConfirmationOrderEntriesContextToken,
  OrderFacade,
  OrderOutlets,
} from '@spartacus/order/root';
import {
  CardModule,
  FormErrorsModule,
  OutletModule,
  PasswordVisibilityToggleModule,
  PromotionsModule,
  PwaModule,
  provideOutlet,
} from '@spartacus/storefront';
import { OrderConfirmationGuard } from '../guards/order-confirmation.guard';
import { OrderDetailBillingComponent } from '../order-details/order-detail-billing/order-detail-billing.component';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderOverviewComponent } from '../order-details/order-overview/order-overview.component';
import { OrderConfirmationOrderEntriesContext } from '../page-context/order-confirmation-order-entries.context';
import { OrderConfirmationItemsComponent } from './order-confirmation-items/order-confirmation-items.component';
import { OrderConfirmationShippingComponent } from './order-confirmation-shipping/order-confirmation-shipping.component';
import { OrderConfirmationThankYouMessageComponent } from './order-confirmation-thank-you-message/order-confirmation-thank-you-message.component';
import { OrderConfirmationTotalsComponent } from './order-confirmation-totals/order-confirmation-totals.component';
import { OrderGuestRegisterFormComponent } from './order-guest-register-form/order-guest-register-form.component';

const orderConfirmationComponents = [
  OrderConfirmationItemsComponent,
  OrderConfirmationThankYouMessageComponent,
  OrderConfirmationTotalsComponent,
  OrderGuestRegisterFormComponent,
  OrderConfirmationShippingComponent,
];

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    PwaModule,
    PromotionsModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
    OutletModule.forChild(),
    PasswordVisibilityToggleModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OrderConfirmationThankMessageComponent: {
          component: OrderConfirmationThankYouMessageComponent,
          guards: [OrderConfirmationGuard],
        },
        ReplenishmentConfirmationMessageComponent: {
          component: OrderConfirmationThankYouMessageComponent,
          guards: [OrderConfirmationGuard],
        },

        OrderConfirmationItemsComponent: {
          component: OrderConfirmationItemsComponent,
          guards: [OrderConfirmationGuard],
        },
        ReplenishmentConfirmationItemsComponent: {
          component: OrderConfirmationItemsComponent,
          guards: [OrderConfirmationGuard],
        },

        OrderConfirmationTotalsComponent: {
          component: OrderConfirmationTotalsComponent,
          guards: [OrderConfirmationGuard],
        },
        ReplenishmentConfirmationTotalsComponent: {
          component: OrderConfirmationTotalsComponent,
          guards: [OrderConfirmationGuard],
        },

        OrderConfirmationOverviewComponent: {
          component: OrderOverviewComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: OrderFacade,
            },
          ],
          guards: [OrderConfirmationGuard],
        },
        ReplenishmentConfirmationOverviewComponent: {
          component: OrderOverviewComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: OrderFacade,
            },
          ],
          guards: [OrderConfirmationGuard],
        },

        OrderConfirmationShippingComponent: {
          component: OrderConfirmationShippingComponent,
          guards: [OrderConfirmationGuard],
        },

        OrderConfirmationBillingComponent: {
          component: OrderDetailBillingComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: OrderFacade,
            },
          ],
          guards: [OrderConfirmationGuard],
        },
      },
    }),
    {
      provide: OrderConfirmationOrderEntriesContextToken,
      useExisting: OrderConfirmationOrderEntriesContext,
    },
    provideOutlet({
      id: OrderOutlets.CONSIGNMENT_DELIVERY_INFO,
      component: OrderConfirmationShippingComponent,
    }),
  ],
  declarations: [...orderConfirmationComponents],
  exports: [...orderConfirmationComponents],
})
export class OrderConfirmationModule {}
