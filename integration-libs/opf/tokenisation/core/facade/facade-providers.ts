/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Provider } from '@angular/core';
import { OpfTokenisationService } from './opf-tokenisation.service';

export const facadeProviders: Provider[] = [OpfTokenisationService];
