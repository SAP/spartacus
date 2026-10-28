/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  callRule,
  chain,
  mergeWith,
  noop,
  url,
} from '@angular-devkit/schematics';
import {
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { SPARTACUS_SETUP } from '../shared/libs-constants';
import {
  addPackageJsonDependencies,
  installPackageJsonDependencies,
} from '../shared/utils/lib-utils';
import {
  getPrefixedSpartacusSchematicsVersion,
  readPackageJson,
} from '../shared/utils/package-utils';
import { addProxyConf } from './add-proxy-conf';
import { updateAppConfig } from './update-app-config';
import { updateMainTs } from './update-main-ts';
import { updateServerTs } from './update-server-ts';

function createConfigJsonFile(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const configJsonPath = `config.json`;

    if (tree.exists(configJsonPath)) {
      if (options.debug) {
        context.logger.info(
          `⏭️ Skipping config.json creation — file already exists at ${configJsonPath}`
        );
      }
      return;
    }

    return callRule(mergeWith(apply(url('./files'), [])), tree, context);
  };
}

function addSetupDependency(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    const version = getPrefixedSpartacusSchematicsVersion();

    return addPackageJsonDependencies(
      [{ type: NodeDependencyType.Default, name: SPARTACUS_SETUP, version }],
      packageJson
    )(tree, context);
  };
}

export function addRuntimeConfig(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!options.runtimeConfig) {
      return noop()(tree, context);
    }

    if (options.debug) {
      context.logger.info(`⌛️ Adding runtime config support...`);
    }

    return chain([
      addSetupDependency(),
      installPackageJsonDependencies(),
      updateMainTs(options),
      updateAppConfig(options),
      options.ssr ? updateServerTs(options) : noop(),
      createConfigJsonFile(options),
      addProxyConf(options),
    ])(tree, context);
  };
}
