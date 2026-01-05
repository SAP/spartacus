/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import {
  cdsTranslations as originalCdsTranslations,
  cdsTranslationChunksConfig as originalCdsTranslationChunksConfig,
} from '@spartacus/cds/assets';

/** @deprecated  Use @spartacus/cds/assets instead */
export const cdsTranslations: TranslationResources = originalCdsTranslations;

/** @deprecated  Use @spartacus/cds/assets instead */
export const cdsTranslationChunksConfig: TranslationChunksConfig =
  originalCdsTranslationChunksConfig;
