/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import {
  cdsTranslations as originaCdsTranslations,
  cdsTranslationChunksConfig as originalCdsTranslationChunksConfig,
} from '@spartacus/cds/assets';

/** @deprecated  Use @spartacus/cds/assets instead */
export const cdsTranslations: TranslationResources = originaCdsTranslations;

/** @deprecated  Use @spartacus/cds/assets instead */
export const cdsTranslationChunksConfig: TranslationChunksConfig =
  originalCdsTranslationChunksConfig;
