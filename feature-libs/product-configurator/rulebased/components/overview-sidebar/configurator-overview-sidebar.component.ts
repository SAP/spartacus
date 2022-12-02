/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';

@Component({
  selector: 'cx-configurator-overview-sidebar',
  templateUrl: './configurator-overview-sidebar.component.html',
})
export class ConfiguratorOverviewSidebarComponent {
  showFilter: boolean = false;

  constructor() {}

  onFilter() {
    this.showFilter = true;
  }

  onMenu() {
    this.showFilter = false;
  }
}
