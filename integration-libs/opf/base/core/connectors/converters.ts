/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import { Address, Converter } from '@spartacus/core';

export const OPF_CART_ACCESS_TOKEN_NORMALIZER = new InjectionToken<
  Converter<any, string | undefined>
>('OpfCartNormalizer');

export const OPF_CART_BILLING_ADDRESS_NORMALIZER = new InjectionToken<
  Converter<any, Address>
>('OpfCartBillingAddressNormalizer');

export const OPF_CART_DELIVERY_ADDRESS_NORMALIZER = new InjectionToken<
  Converter<any, Address>
>('OpfCartDeliveryAddressNormalizer');

export const OPF_CART_DELIVERY_MODE_NORMALIZER = new InjectionToken<
  Converter<any, DeliveryMode>
>('OpfCartDeliveryModeNormalizer');

export const OPF_CART_DELIVERY_MODES_NORMALIZER = new InjectionToken<
  Converter<any, DeliveryMode[]>
>('OpfCartDeliveryModesNormalizer');
