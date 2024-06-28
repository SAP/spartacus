/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { Tab } from '../tab.model';

@Component({
  selector: 'cx-tab-panel',
  templateUrl: './tab-panel.component.html',
})
export class TabPanelComponent {
  /**
   * Tab object to display content and set attributes to.
   */
  @Input() tab: Tab;
}
