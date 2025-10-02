/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { FocusDirective } from '../../../../../projects/storefrontlib/layout/a11y/keyboard-focus/focus.directive';
import { IconComponent } from '../../../../../projects/storefrontlib/cms-components/misc/icon/icon.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { ConfiguratorOverviewFilterComponent } from '../overview-filter/configurator-overview-filter.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-configurator-overview-filter-dialog',
  templateUrl: './configurator-overview-filter-dialog.component.html',
  imports: [
    FocusDirective,
    IconComponent,
    NgIf,
    ConfiguratorOverviewFilterComponent,
    AsyncPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class ConfiguratorOverviewFilterDialogComponent {
  constructor(protected launchDialogService: LaunchDialogService) {}

  config$ = this.launchDialogService.data$;

  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  /**
   * closes the filter modal
   */
  closeFilterModal(): void {
    this.launchDialogService.closeDialog('Close Filtering');
  }
}
