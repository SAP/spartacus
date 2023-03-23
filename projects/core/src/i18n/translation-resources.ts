/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationResourceKey {
  [key: string]: any;
}

export interface TranslationResources {
  [lang: string]: {
    [chunkName: string]: TranslationResourceKey;
  };
}
export interface TranslationChunksConfig {
  [chunk: string]: string[];
}
