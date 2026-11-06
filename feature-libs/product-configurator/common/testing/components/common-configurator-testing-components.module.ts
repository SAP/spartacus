/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { MockConfigureCartEntryComponent } from './mock-configure-cart-entry.component';

const mockComponents = [MockConfigureCartEntryComponent];

/** Shared mock components for product-configurator common unit tests. */
@NgModule({
  imports: [...mockComponents],
  exports: mockComponents,
})
export class ConfiguratorCommonTestingComponentsModule {}
