/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsComponent } from '@spartacus/core';

export interface CMSSAPCDCScreenSetComponent extends CmsComponent {
  /** Unique identifier of the Component */
  uid?: string;

  /** Name of the Component */
  name?: string;

  /** Name of the Screen set which is to be displayed */
  screenSet?: string;

  /** Name of the Screen which is to be displayed */
  startScreen?: string;

  /** Advanced configuration for the screen set */
  containerID?: string;

  /** Advanced configuration for the screen set */
  advancedConfiguration?: string;

}
