/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsComponent } from '@spartacus/core';

export interface GigyaRaasComponentData extends CmsComponent {
  /** Unique identifier of the Component */
  uid?: string;

  /** Name of the Component */
  name?: string;

  /** Name of the Screen set which is to be displayed */
  screenSet?: string;

  /** Determines if screen is for profile edit */
  profileEdit?: string;

  /** Display screen in embed way */
  embed?: string;

  /** Starting screen which will be displayed on rendering the screen set */
  startScreen?: string;

  /** Container name in which CDC screen will be displayed */
  containerID?: string;

  /** Text of the button for the screen set when rendered in pop-up way */
  linkText?: string;

  /** Advanced configuration for the screen set */
  advancedConfiguration?: string;

  /** Decides whether screenset should be visible for anonymous user */
  showAnonymous?: string;

  /** Decides whether screenset should be visible for logged in user */
  showLoggedIn?: string;
}
