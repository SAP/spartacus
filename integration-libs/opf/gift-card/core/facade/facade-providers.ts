/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfGiftCardFacade } from '@spartacus/opf/gift-card/root';
import { OpfGiftCardService } from './opf-gift-card.service';
import { Provider } from '@angular/core';

export const facadeProviders: Provider[] = [
  OpfGiftCardService,
  {
    provide: OpfGiftCardFacade,
    useExisting: OpfGiftCardService,
  },
];
