/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { insertImport } from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import { parseTsFileContent } from '../../../shared/utils/file-utils';
import { SchematicContext } from '@angular-devkit/schematics';

/**
 * Adds new imports to server.ts file, to align with Angular v17 standards.
 *
 * ```diff
 * + import { APP_BASE_HREF } from '@angular/common';
 * + import {
 * +   NgExpressEngineDecorator,
 * +   ngExpressEngine as engine,
 * + } from '@spartacus/setup/ssr';
 * + import express from 'express';
 * + import { dirname, join, resolve } from 'node:path';
 * + import { fileURLToPath } from 'node:url';
 * + import AppServerModule from './src/main.server';
```
 */
export function addImportsToServerTs(
  updatedContent: string,
  context: SchematicContext
): string {
  const sourceFile = parseTsFileContent(updatedContent);

  // List of new imports to add
  const importsToAdd: {
    importPath: string;
    symbolName: string;
    isDefault?: boolean;
    asName?: string;
  }[] = [
    {
      importPath: 'express',
      symbolName: 'express',
      isDefault: true,
    },
    {
      importPath: 'node:path',
      symbolName: 'dirname',
    },
    {
      importPath: 'node:path',
      symbolName: 'join',
    },
    {
      importPath: 'node:path',
      symbolName: 'resolve',
    },
    {
      importPath: 'node:url',
      symbolName: 'fileURLToPath',
    },
    {
      importPath: './src/main.server',
      symbolName: 'AppServerModule',
      isDefault: true,
    },
  ];

  context.logger.info('  ↳ Adding new imports');
  const importAdditionChanges: Change[] = importsToAdd.map((imp) => {
    context.logger.info(
      `    ↳ Importing "${
        imp.symbolName ? imp.symbolName + ' from ' : ''
      }${imp.importPath}"`
    );
    return insertImport(
      sourceFile,
      '',
      imp.symbolName,
      imp.importPath,
      imp.isDefault,
      imp.asName
    );
  });

  importAdditionChanges.forEach((change) => {
    if (change instanceof InsertChange) {
      const start = change.pos;
      updatedContent =
        updatedContent.slice(0, start) +
        change.toAdd +
        updatedContent.slice(start);
    }
  });

  return updatedContent;
}
