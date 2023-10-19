/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Type } from '@angular/core';
import { AsmCustomer360SectionConfig } from './asm-customer-360-section-config';
import { AsmCustomer360Query } from './asm-customer-360.model';

export interface AsmCustomer360TabComponent {
  component?: Type<unknown>;
  /** Data that can be associated to a component used to fetch information from a backend. */
  requestData?: AsmCustomer360Query;
  config?: AsmCustomer360SectionConfig;
}

export abstract class AsmCustomer360TabConfig {
  components: Array<AsmCustomer360TabComponent>;
  i18nNameKey: string;
}
