/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { LaunchDialogService } from '../services/launch-dialog.service';
import { MockLaunchDialogService } from './mock-launch-dialog.service';

/** Provides a default {@link MockLaunchDialogService} for {@link LaunchDialogService}. */
@NgModule({
  providers: [
    { provide: LaunchDialogService, useClass: MockLaunchDialogService },
  ],
})
export class LaunchDialogTestingModule {}
