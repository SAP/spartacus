/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-configurator-overview-filter-button',
  templateUrl: './configurator-overview-filter-button.component.html',
})
export class ConfiguratorOverviewFilterButtonComponent {
  constructor(protected launchDialogService: LaunchDialogService) {}
  openFilterModal() {
    const dialogData = {
      testData: 'test',
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CONFIGURATOR_OV_FILTER,
      undefined,
      undefined,
      dialogData
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
}
