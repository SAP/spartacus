/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/opf/base/root';
import '@spartacus/opf/payment/root';
import { OpfQuickBuyDigitalWallet } from './opf-quick-buy.model';

declare module '@spartacus/opf/base/root' {
  interface ActiveConfiguration {
    digitalWalletQuickBuy?: OpfQuickBuyDigitalWallet[];
  }
}
