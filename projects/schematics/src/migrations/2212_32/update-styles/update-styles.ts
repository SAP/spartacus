/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { normalize, Path } from '@angular-devkit/core';
import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import postcss from 'postcss';
import * as postscss from 'postcss-scss';

function replaceImportsWithUse(content: string): string {
  const root = postscss.parse(content);
  let result = content;

  root.walkAtRules('import', (atRule) => {
    // Get the original quotes used
    const match = atRule.params.match(/^(['"])(.*)\1$/);
    if (match) {
      const [, quote, path] = match;
      // Create a new @use rule preserving the original quote style
      const useRule = postcss.atRule({
        name: 'use',
        params: `${quote}${path}${quote}`,
        source: atRule.source,
      });
      result = result.replace(atRule.toString(), useRule.toString());
    }
  });

  return result;
}

function updateFileContent(
  tree: Tree,
  filePath: Path,
  context: SchematicContext,
  debug = false
): void {
  const content = tree.read(filePath);
  if (!content) {
    if (debug) {
      context.logger.warn(`⚠️ Could not read file: ${filePath}`);
    }
    return;
  }

  const originalContent = content.toString('utf-8');
  const updatedContent = replaceImportsWithUse(originalContent);

  if (originalContent !== updatedContent) {
    tree.overwrite(filePath, updatedContent);
    if (debug) {
      context.logger.info(`✅ Updated imports in ${filePath}`);
    }
  } else if (debug) {
    context.logger.info(`ℹ️ No imports to update in ${filePath}`);
  }
}

function updateAppStyles(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (context.debug) {
      context.logger.info(`⌛️ Processing styles in src/app/styles...`);
    }

    tree.visit((filePath) => {
      if (filePath.startsWith('/src/styles/') && filePath.endsWith('.scss')) {
        updateFileContent(tree, filePath, context, context.debug);
      }
    });

    if (context.debug) {
      context.logger.info(`✅ Completed processing src/app/styles`);
    }
    return tree;
  };
}

function updateRootStyles(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const rootStylePath = normalize('/src/styles.scss');

    if (context.debug) {
      context.logger.info(`⌛️ Processing root styles file...`);
    }

    if (tree.exists(rootStylePath)) {
      updateFileContent(tree, rootStylePath, context, context.debug);
    } else if (context.debug) {
      context.logger.warn(`⚠️ Root styles file not found at ${rootStylePath}`);
    }

    if (context.debug) {
      context.logger.info(`✅ Completed processing root styles file`);
    }
    return tree;
  };
}

export function migrate(): Rule {
  return chain([updateAppStyles(), updateRootStyles()]);
}
