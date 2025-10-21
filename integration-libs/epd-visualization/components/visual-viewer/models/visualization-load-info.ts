/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { VisualizationInfo } from '@spartacus/epd-visualization/root';

/**
 * @deprecated since v221121.3.0 - The epd-visualization integration library will be removed in the future.
 */
export enum VisualizationLookupResult {
  UniqueMatchFound = 'UniqueMatchFound',
  NoMatchFound = 'NoMatchFound',
  MultipleMatchesFound = 'MultipleMatchesFound',
  UnexpectedError = 'UnexpectedError',
}

/**
 * @deprecated since v221121.3.0 - The epd-visualization integration library will be removed in the future.
 */
export enum VisualizationLoadStatus {
  NotStarted = 'NotStarted',
  Loading = 'Loading',
  Loaded = 'Loaded',
  UnexpectedError = 'UnexpectedError',
}

/**
 * @deprecated since v221121.3.0 - The epd-visualization integration library will be removed in the future.
 */
export interface VisualizationLoadInfo {
  lookupResult: VisualizationLookupResult;
  loadStatus: VisualizationLoadStatus;
  matches?: VisualizationInfo[];
  visualization?: VisualizationInfo;
  errorMessage?: string;
}
