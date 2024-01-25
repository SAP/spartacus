/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import {
  AccountSummaryDetails,
  AccountSummaryList,
} from '@spartacus/organization/account-summary/root';

export const ACCOUNT_SUMMARY_NORMALIZER = new InjectionToken<
  Converter<any, AccountSummaryDetails>
>('AccountSummaryNormalizer');

export const ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER = new InjectionToken<
  Converter<any, AccountSummaryList>
>('AccountSummaryDocumentNormalizer');
