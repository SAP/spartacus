/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
export interface NodesResponse {
  nodes?: TreeNode[];
}

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
export interface TreeNode {
  sid: string;
  usageIds?: UsageId[];
}

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
export interface UsageId {
  name: string;
  keys: UsageIdKey[];
}

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
export interface UsageIdKey {
  name: string;
  value: string;
}
