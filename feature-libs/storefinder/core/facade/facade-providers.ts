/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { StoreFinderFacade } from '@spartacus/storefinder/root';
import { StoreFinderService } from './store-finder.service';

export const facadeProviders: Provider[] = [
  StoreFinderService,
  { provide: StoreFinderFacade, useExisting: StoreFinderService },
];
