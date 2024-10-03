/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, Type } from '@angular/core';

export interface FeatureEnvironment {
  imports: Array<Type<any> | ModuleWithProviders<{}>>;
}
