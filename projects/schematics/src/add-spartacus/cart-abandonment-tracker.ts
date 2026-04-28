/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getProjectFromWorkspace } from '../shared/utils/workspace-utils';
import { Schema as SpartacusOptions } from './schema';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Installs the Cart Abandonment Tracker JavaScript file and configures the project
 */
export function installCartAbandonmentTracker(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    context.logger.info(`⌛️ Installing Cart Abandonment Tracker...`);

    const project = getProjectFromWorkspace(tree, options);

    // Debug: Log project information
    context.logger.info(`📍 Debug Info:`);
    context.logger.info(`  - Project type: ${project.projectType}`);
    context.logger.info(`  - Project root: '${project.root}'`);
    context.logger.info(`  - Source root: ${project.sourceRoot}`);

    // Path to the JavaScript tracker file in the schematics assets
    const trackerScriptSource = join(
      __dirname,
      'assets',
      'cart-abandonment-tracker.js'
    );

    // Destination paths - handle empty project.root (workspace root project)
    const projectRoot = project.root || '';
    const publicScriptsDir = projectRoot ? `${projectRoot}/public/scripts` : 'public/scripts';
    const trackerScriptTarget = `${publicScriptsDir}/cart-abandonment-tracker.js`;

    // Path to index.html
    const indexHtmlPath = projectRoot ? `${projectRoot}/src/index.html` : 'src/index.html';

    context.logger.info(`  - Public scripts dir: ${publicScriptsDir}`);
    context.logger.info(`  - Target JS path: ${trackerScriptTarget}`);
    context.logger.info(`  - Index HTML path: ${indexHtmlPath}`);
    context.logger.info(`  - Source exists: ${require('fs').existsSync(trackerScriptSource)}`);

    try {
      // Create public/scripts directory if it doesn't exist
      if (!tree.exists(publicScriptsDir)) {
        context.logger.info(`  - Creating directory: ${publicScriptsDir}`);
        tree.create(`${publicScriptsDir}/.gitkeep`, '');
      }

      // Copy the tracker script file
      if (tree.exists(trackerScriptTarget)) {
        context.logger.warn(
          `Cart Abandonment Tracker script already exists at ${trackerScriptTarget}`
        );
      } else {
        const trackerScriptContent = readFileSync(trackerScriptSource, 'utf-8');
        tree.create(trackerScriptTarget, trackerScriptContent);
        context.logger.info(`✓ Created ${trackerScriptTarget}`);
      }

      // Update index.html to include the script tag
      updateIndexHtml(tree, indexHtmlPath, context);

      if (options.debug) {
        context.logger.info(`✅ Cart Abandonment Tracker installation complete.`);
      }
    } catch (error) {
      context.logger.error(
        `Failed to install Cart Abandonment Tracker: ${error}`
      );
    }

    return tree;
  };
}

/**
 * Update index.html to include the tracker script tag
 */
function updateIndexHtml(
  tree: Tree,
  indexHtmlPath: string,
  context: SchematicContext
): void {
  const indexHtmlBuffer = tree.read(indexHtmlPath);

  if (!indexHtmlBuffer) {
    context.logger.warn(`Could not read ${indexHtmlPath}`);
    return;
  }

  let indexHtmlContent = indexHtmlBuffer.toString();

  // Check if the script tag is already present
  const scriptTag = '<script src="scripts/cart-abandonment-tracker.js"></script>';
  if (indexHtmlContent.includes('cart-abandonment-tracker.js')) {
    context.logger.info(`✓ Cart Abandonment Tracker script already in ${indexHtmlPath}`);
    return;
  }

  // Add the script tag before the closing </head> tag
  const headCloseTag = '</head>';
  if (indexHtmlContent.includes(headCloseTag)) {
    indexHtmlContent = indexHtmlContent.replace(
      headCloseTag,
      `  ${scriptTag}\n  ${headCloseTag}`
    );
    tree.overwrite(indexHtmlPath, indexHtmlContent);
    context.logger.info(`✓ Added Cart Abandonment Tracker script tag to ${indexHtmlPath}`);
  } else {
    context.logger.warn(`Could not find ${headCloseTag} in ${indexHtmlPath}`);
  }
}
