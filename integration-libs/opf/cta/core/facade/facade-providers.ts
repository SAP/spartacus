/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OpfCtaFacade } from '@spartacus/opf/cta/root';
import { OpfCtaService } from './opf-cta.service';

export const facadeProviders: Provider[] = [
  OpfCtaService,
  {
    provide: OpfCtaFacade,
    useExisting: OpfCtaService,
  },
];
