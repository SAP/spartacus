/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Node, SourceFile } from 'ts-morph';
import { getProvidersFromNamedObject } from './get-providers-array-from-named-object';

/**
 * Helper function to get the providers array from app.config.ts
 */
export function getAppConfigProviders(
  sourceFile: SourceFile
): Node | undefined {
  return getProvidersFromNamedObject(sourceFile, 'appConfig');
}
