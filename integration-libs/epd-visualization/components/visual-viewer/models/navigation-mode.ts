/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export enum NavigationMode {
  /**
   * Left mouse button drag causes turntable rotation.
   */
  Turntable = 0,
  /**
   * Left mouse button drag performs panning.
   */
  Pan = 2,
  /**
   * Left mouse button drag performs zooming.
   */
  Zoom = 3,
}
