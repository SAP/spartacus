/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OpfGlobalFunctionsFacade } from '@spartacus/opf/global-functions/root';
import { OpfGlobalFunctionsCheckoutDomainRegistrationsService } from '../services/domains/checkout/opf-global-functions-checkout-domain-registrations.service';
import { OpfGlobalFunctionsCheckoutDomainService } from '../services/domains/checkout/opf-global-functions-checkout-domain.service';
import { OpfGlobalFunctionsGlobalDomainRegistrationsService } from '../services/domains/global/opf-global-functions-global-domain-registrations.service';
import { OpfGlobalFunctionsGlobalDomainService } from '../services/domains/global/opf-global-functions-global-domain.service';
import { OpfGlobalFunctionsRedirectDomainRegistrationsService } from '../services/domains/redirect/opf-global-functions-redirect-domain-registrations.service';
import { OpfGlobalFunctionsRedirectDomainService } from '../services/domains/redirect/opf-global-functions-redirect-domain.service';
import { OpfGlobalFunctionsSharedRegistrationsService } from '../services/opf-global-functions-shared-registrations.service';
import { OpfGlobalFunctionsSharedService } from '../services/opf-global-functions-shared.service';
import { OpfGlobalFunctionsService } from './opf-global-functions.service';


export const facadeProviders: Provider[] = [
  OpfGlobalFunctionsSharedService,
  OpfGlobalFunctionsSharedRegistrationsService,
  OpfGlobalFunctionsCheckoutDomainService,
  OpfGlobalFunctionsCheckoutDomainRegistrationsService,
  OpfGlobalFunctionsGlobalDomainService,
  OpfGlobalFunctionsGlobalDomainRegistrationsService,
  OpfGlobalFunctionsRedirectDomainService,
  OpfGlobalFunctionsRedirectDomainRegistrationsService,
  OpfGlobalFunctionsService,
  {
    provide: OpfGlobalFunctionsFacade,
    useExisting: OpfGlobalFunctionsService,
  },
];
