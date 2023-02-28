/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-configurator-resume-config-dialog',
  templateUrl: './configurator-resume-config-dialog.component.html',
})
export class ConfiguratorResumeConfigDialogComponent implements OnInit {
  constructor(protected launchDialogService: LaunchDialogService) {}

  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  ngOnInit(): void {}

  /**
   * closes the filter modal
   */
  closeFilterModal(): void {
    this.launchDialogService.closeDialog('Close Filtering');
  }
}
