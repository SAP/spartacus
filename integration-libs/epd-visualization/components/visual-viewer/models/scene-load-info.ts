/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ContentType } from '@spartacus/epd-visualization/root';
import { SceneLoadState } from './scene-load-state';

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
export interface LoadedSceneInfo {
  sceneId: string;
  contentType: ContentType;
}

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
export interface SceneLoadInfo {
  sceneLoadState: SceneLoadState;
  loadedSceneInfo?: LoadedSceneInfo;
  errorMessage?: string;
}
