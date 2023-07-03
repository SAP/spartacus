/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExportFileOptions {
  /**
   * File name for exported file.
   */
  fileName: string;
  /**
   * Extension for exported file.
   */
  extension: string;
  /**
   * Mime/type for exported file.
   */
  type: string;
}
