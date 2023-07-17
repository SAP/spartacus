/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { country } from './country';

export interface shippingAddress {
  country: country;
  defaultAddress: boolean;
  formattedAddress: String;
  id: String;
  line2: String;
  phone: String;
  postalCode: String;
  town: String;
}
