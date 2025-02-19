/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SchematicContext } from '@angular-devkit/schematics';
import { removeImportFromContent } from '../../../shared/utils/file-utils';

/**
 * Removes imports from server.ts file, to align with Angular v17 standards.
 *
 * ```diff
 * - import 'zone.js/node';
 *
 * - import { ngExpressEngine as engine } from - '@spartacus/setup/ssr';
 * - import { NgExpressEngineDecorator } from - '@spartacus/setup/ssr';
 * - import * as express from 'express';
 * - import { join } from 'path';
 *
 * - import { AppServerModule } from './src/main.- server';
 * - import { APP_BASE_HREF } from '@angular/common';
 * - import { existsSync } from 'fs';
 * ```
 */
export function removeImportsFromServerTs(
  updatedContent: string,
  context: SchematicContext
): string {
  const importsToRemove: { symbolName?: string; importPath: string }[] = [
    { importPath: 'zone.js/node' },
    { symbolName: 'express', importPath: 'express' },
    { symbolName: 'join', importPath: 'path' },
    { symbolName: 'AppServerModule', importPath: './src/main.server' },
    { symbolName: 'existsSync', importPath: 'fs' },
  ];

  context.logger.info('  ↳ Removing old imports');
  importsToRemove.forEach((importToRemove) => {
    context.logger.info(
      `    ↳ Removing import of "${
        importToRemove.symbolName ? importToRemove.symbolName + ' from ' : ''
      }${importToRemove.importPath}"`
    );
    updatedContent = removeImportFromContent(updatedContent, importToRemove);
  });

  return updatedContent;
}
