/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CdcUserAddressesEffects } from './cdc-user-addresses.effect';
import { CdcUserConsentsEffects } from './cdc-user-consents.effect';
import { CdcUserTokenEffects } from './cdc-user-token.effect';

export const effects: any[] = [
  CdcUserTokenEffects,
  CdcUserAddressesEffects,
  CdcUserConsentsEffects,
];

export * from './cdc-user-addresses.effect';
export * from './cdc-user-token.effect';
export * from './cdc-user-consents.effect';
