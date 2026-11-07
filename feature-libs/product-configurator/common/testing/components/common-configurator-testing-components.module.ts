/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { MockConfigureCartEntryComponent } from './mock-configure-cart-entry.component';

const mockComponents = [MockConfigureCartEntryComponent];

/** Declares the common product-configurator component stubs for unit tests. */
@NgModule({
  imports: [...mockComponents],
  exports: [...mockComponents],
})
export class CommonConfiguratorTestingComponentsModule {}
