/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { MockFeatureDirective } from './mock-feature-directive';
import { MockFeatureLevelDirective } from './mock-feature-level-directive';

@NgModule({
  declarations: [MockFeatureDirective, MockFeatureLevelDirective],
})
export class MockFeatureDirectivesModule {}
