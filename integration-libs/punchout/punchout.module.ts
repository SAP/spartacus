/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { PunchoutComponentsModule } from '@spartacus/punchout/components';
import { PunchoutCoreModule } from '@spartacus/punchout/core';
import { PunchoutOccModule } from '@spartacus/punchout/occ';

@NgModule({
  imports: [PunchoutComponentsModule, PunchoutCoreModule, PunchoutOccModule],
})
export class PunchoutModule {}
