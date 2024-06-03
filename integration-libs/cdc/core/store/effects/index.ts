/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CdcUserAddressesEffects } from './cdc-user-addresses.effect';
import { CdcUserTokenEffects } from './cdc-user-token.effect';

export const effects: any[] = [CdcUserTokenEffects, CdcUserAddressesEffects];

export * from './cdc-user-addresses.effect';
export * from './cdc-user-token.effect';
