/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SupplementHashAnchorsPipe } from './supplement-hash-anchors.pipe';

@NgModule({
  declarations: [SupplementHashAnchorsPipe],
  exports: [SupplementHashAnchorsPipe],
})
export class SupplementHashAnchorsModule {}
