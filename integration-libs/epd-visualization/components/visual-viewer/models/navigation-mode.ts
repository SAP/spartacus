/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
export enum NavigationMode {
  /**
   * Left mouse button drag causes turntable rotation.
   */
  Turntable = 'Turntable',
  /**
   * Left mouse button drag performs panning.
   */
  Pan = 'Pan',
  /**
   * Left mouse button drag performs zooming.
   */
  Zoom = 'Zoom',
}
