/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CdsEndpoints } from './cds-endpoints.model';
import { MerchandisingConfig, ProfileTagConfig } from '../config';

export interface CdsConfiguration {
  site?: string;
  tenant?: string;
  baseUrl?: string;
  consentTemplateId?: string;
  endpoints?: CdsEndpoints;
  merchandising?: MerchandisingConfig;
  profileTag?: ProfileTagConfig;
}
