/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

//import { Type } from '@angular/core';
import { Customer360SectionConfig } from './customer-360-section-config';
import { Customer360Query } from './customer-360.model';

export interface Customer360TabComponent {
  component?: any; // Type<unknown>;
  /** Data that can be associated to a component used to fetch information from a backend. */
  requestData?: Customer360Query;
  config?: Customer360SectionConfig;
}

export abstract class Customer360TabConfig {
  components: Array<Customer360TabComponent>;
  i18nNameKey: string;
}
