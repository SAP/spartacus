/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BundleTemplate } from './bundle-template.model';

declare module '@spartacus/core' {
  interface Product {
    bundleTemplates?: BundleTemplate[];
  }
}
