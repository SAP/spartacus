import { Provider } from '@angular/core';
import { OpfTokenisationService } from './opf-tokenisation.service';
import { OpfTokenisationFacade } from '../../root/facade';

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const facadeProviders: Provider[] = [
  OpfTokenisationService,
  {
    provide: OpfTokenisationFacade,
    useExisting: OpfTokenisationService,
  },
];
