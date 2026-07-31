/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RobotsTxtOptions {
  /**
   * Set to false to skip registering the /robots.txt route entirely.
   * Default: true.
   */
  enabled?: boolean;

  /**
   * Custom robots.txt content to serve.
   * When omitted, the Spartacus default content is used.
   */
  content?: string;
}
