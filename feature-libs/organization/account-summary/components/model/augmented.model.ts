/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/organization/administration/components';
import { OrganizationTableType } from '@spartacus/organization/administration/components';

declare module '@spartacus/organization/administration/components' {
  enum OrganizationTableType {
    ACCOUNT_SUMMARY_UNIT = 'orgAccountSummary',
  }
}

(OrganizationTableType as any)['ACCOUNT_SUMMARY_UNIT'] = 'orgAccountSummary';
