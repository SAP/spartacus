/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { Tab, TAB_MODE } from '../tab.model';

@Component({
  selector: 'cx-tab-panel',
  templateUrl: './tab-panel.component.html',
changeDetection: ChangeDetectionStrategy.OnPush // Optimizes performance by reducing unnecessary checks
export class TabPanelComponent {
  TAB_MODE = TAB_MODE;

  /**
   * Tab object to display content and set attributes to.
   */
  @Input() tab: Tab;

  @Input() mode: TAB_MODE;
}
