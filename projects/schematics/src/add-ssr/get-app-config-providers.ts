/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrayLiteralExpression, SourceFile } from 'ts-morph';
import { getProvidersFromNamedObject } from './get-providers-array-from-named-object';

/**
 * Helper function to get the providers array from app.config.ts
 */
export function getAppConfigProviders(
  sourceFile: SourceFile
): ArrayLiteralExpression | undefined {
  return getProvidersFromNamedObject(sourceFile, 'appConfig');
}
