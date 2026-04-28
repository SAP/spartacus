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

      // Add script to angular.json/project.json scripts array
      addScriptToWorkspaceConfig(tree, project, trackerScriptTarget, context);

      // Add APP_INITIALIZER provider to app configuration
      addAppInitializer(tree, projectRoot, context);

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
 * Add script to angular.json or project.json scripts array
 */
function addScriptToWorkspaceConfig(
  tree: Tree,
  project: any,
  scriptPath: string,
  context: SchematicContext
): void {
  // Try project.json first (Nx projects)
  const projectJsonPath = project.root ? `${project.root}/project.json` : 'project.json';
  
  if (tree.exists(projectJsonPath)) {
    addScriptToProjectJson(tree, projectJsonPath, scriptPath, context);
    return;
  }

  // Fallback to angular.json (standard Angular CLI)
  addScriptToAngularJson(tree, project, scriptPath, context);
}

/**
 * Add script to project.json
 */
function addScriptToProjectJson(
  tree: Tree,
  projectJsonPath: string,
  scriptPath: string,
  context: SchematicContext
): void {
  const projectJsonBuffer = tree.read(projectJsonPath);
  if (!projectJsonBuffer) {
    context.logger.warn(`Could not read ${projectJsonPath}`);
    return;
  }

  const projectJson = JSON.parse(projectJsonBuffer.toString());
  const buildTarget = projectJson.targets?.build;

  if (!buildTarget || !buildTarget.options) {
    context.logger.warn(`Could not find build target in ${projectJsonPath}`);
    return;
  }

  // Initialize scripts array if it doesn't exist
  if (!buildTarget.options.scripts) {
    buildTarget.options.scripts = [];
  }

  // Add the script if not already present
  if (!buildTarget.options.scripts.includes(scriptPath)) {
    buildTarget.options.scripts.push(scriptPath);
    tree.overwrite(projectJsonPath, JSON.stringify(projectJson, null, 2));
    context.logger.info(`✓ Added cart-abandonment-tracker.js to ${projectJsonPath} scripts array`);
  } else {
    context.logger.info(`✓ Script already configured in ${projectJsonPath}`);
  }
}

/**
 * Add script to angular.json
 */
function addScriptToAngularJson(
  tree: Tree,
  project: any,
  scriptPath: string,
  context: SchematicContext
): void {
  const angularJsonPath = 'angular.json';
  const angularJsonBuffer = tree.read(angularJsonPath);

  if (!angularJsonBuffer) {
    context.logger.warn(`Could not read ${angularJsonPath}`);
    return;
  }

  const angularJson = JSON.parse(angularJsonBuffer.toString());
  const projectName = project.name || Object.keys(angularJson.projects)[0];
  const buildOptions = angularJson.projects?.[projectName]?.architect?.build?.options;

  if (!buildOptions) {
    context.logger.warn(`Could not find build options for project ${projectName} in ${angularJsonPath}`);
    return;
  }

  // Initialize scripts array if it doesn't exist
  if (!buildOptions.scripts) {
    buildOptions.scripts = [];
  }

  // Add the script if not already present
  if (!buildOptions.scripts.includes(scriptPath)) {
    buildOptions.scripts.push(scriptPath);
    tree.overwrite(angularJsonPath, JSON.stringify(angularJson, null, 2));
    context.logger.info(`✓ Added cart-abandonment-tracker.js to ${angularJsonPath} scripts array`);
  } else {
    context.logger.info(`✓ Script already configured in ${angularJsonPath}`);
  }
}

/**
 * Add APP_INITIALIZER provider for cart abandonment tracker
 */
function addAppInitializer(
  tree: Tree,
  projectRoot: string,
  context: SchematicContext
): void {
  // Try to find spartacus-features.module.ts (most common location)
  const featuresModulePath = projectRoot
    ? `${projectRoot}/src/app/spartacus/spartacus-features.module.ts`
    : 'src/app/spartacus/spartacus-features.module.ts';

  if (!tree.exists(featuresModulePath)) {
    context.logger.warn(
      `Could not find ${featuresModulePath}. ` +
      `You may need to manually add APP_INITIALIZER for CartAbandonmentTrackerService.`
    );
    return;
  }

  const featuresModuleBuffer = tree.read(featuresModulePath);
  if (!featuresModuleBuffer) {
    context.logger.warn(`Could not read ${featuresModulePath}`);
    return;
  }

  let content = featuresModuleBuffer.toString();

  // Check if already configured
  if (content.includes('CartAbandonmentTrackerService') || content.includes('initializeCartAbandonmentTracker')) {
    context.logger.info(`✓ Cart Abandonment Tracker already configured in ${featuresModulePath}`);
    return;
  }

  // Add imports at the top (after existing imports)
  const importStatement = `import { APP_INITIALIZER } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import {
  CartAbandonmentTrackerService,
  initializeCartAbandonmentTracker,
} from '@spartacus/storefront';`;

  // Find the last import statement
  // Use [\s\S] instead of . with /s flag for compatibility
  const lastImportMatch = content.match(/(import[\s\S]+?;[\r\n]+)(?![\s\S]*import)/);
  if (lastImportMatch) {
    const insertPosition = lastImportMatch.index! + lastImportMatch[0].length;
    content = content.slice(0, insertPosition) + '\n' + importStatement + '\n' + content.slice(insertPosition);
  } else {
    // If no imports found, add at the beginning
    content = importStatement + '\n\n' + content;
  }

  // Add providers to @NgModule
  // Find the providers array
  const providersMatch = content.match(/providers:\s*\[([\s\S]*?)\]/);
  if (providersMatch) {
    const providersContent = providersMatch[1];
    const providersEndIndex = providersMatch.index! + providersMatch[0].length - 1;

    // Add APP_INITIALIZER provider
    const providerCode = `
    // Cart Abandonment Tracker initialization
    {
      provide: APP_INITIALIZER,
      useFactory: initializeCartAbandonmentTracker,
      deps: [CartAbandonmentTrackerService, WindowRef],
      multi: true,
    },`;

    // Insert before the closing bracket
    content = content.slice(0, providersEndIndex) +
      (providersContent.trim() ? ',' : '') +
      providerCode +
      '\n  ' +
      content.slice(providersEndIndex);
  } else {
    // If no providers array, add one
    const ngModuleMatch = content.match(/@NgModule\(\{([\s\S]*?)\}\)/);
    if (ngModuleMatch) {
      const ngModuleEndIndex = ngModuleMatch.index! + ngModuleMatch[0].length - 2;

      const providerCode = `,
  providers: [
    // Cart Abandonment Tracker initialization
    {
      provide: APP_INITIALIZER,
      useFactory: initializeCartAbandonmentTracker,
      deps: [CartAbandonmentTrackerService, WindowRef],
      multi: true,
    },
  ]`;

      content = content.slice(0, ngModuleEndIndex) + providerCode + '\n' + content.slice(ngModuleEndIndex);
    }
  }

  tree.overwrite(featuresModulePath, content);
  context.logger.info(`✓ Added Cart Abandonment Tracker APP_INITIALIZER to ${featuresModulePath}`);
}
