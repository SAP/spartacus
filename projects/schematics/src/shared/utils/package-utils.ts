/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { normalize } from 'path';
import semver from 'semver';
import { version } from '../../../package.json';
import collectedDependencies from '../../dependencies.json';
import { UTF_8 } from '../constants';
import {
  CORE_SPARTACUS_SCOPES,
  FEATURES_LIBS_SKIP_SCOPES,
  SPARTACUS_ASSETS,
  SPARTACUS_CORE,
  SPARTACUS_SCHEMATICS,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_STYLES,
} from '../libs-constants';
import { getServerTsPath } from './file-utils';
import { addPackageJsonDependencies, dependencyExists } from './lib-utils';
import {
  getDefaultProjectNameFromWorkspace,
  getWorkspace,
} from './workspace-utils';

const DEV_DEPENDENCIES_KEYWORDS = [
  'schematics',
  'parse5',
  'typescript',
  '@angular-devkit/core',
  '@angular/compiler',
  'jsonc-parser',
];

export function createSpartacusDependencies(
  dependencyObject: Record<string, string>
): NodeDependency[] {
  const spartacusVersion = getPrefixedSpartacusSchematicsVersion();
  return createDependencies(dependencyObject, {
    skipScopes: CORE_SPARTACUS_SCOPES,
    onlyIncludeScopes: FEATURES_LIBS_SKIP_SCOPES,
    version: spartacusVersion,
  });
}

export function createDependencies(
  dependencyObject: Record<string, string>,
  options: {
    /**
     * skip the scopes that start with any of the given scopes
     */
    skipScopes: string[];
    /**
     * create and return dependencies only listed in the given array
     */
    onlyIncludeScopes?: string[];
    /** dependency version which to set. If not provided, the one from the given `dependencyObject` will be used. */
    version?: string;
    /** Overwrite the dependencies */
    overwrite?: boolean;
  } = {
    skipScopes: FEATURES_LIBS_SKIP_SCOPES,
  }
): NodeDependency[] {
  const dependencies: NodeDependency[] = [];
  for (const dependencyName in dependencyObject) {
    if (!dependencyObject.hasOwnProperty(dependencyName)) {
      continue;
    }

    if (options.skipScopes.some((scope) => dependencyName.startsWith(scope))) {
      continue;
    }

    if (
      // if `onlyIncludeScopes` is not defined, always include the dependency
      !options.onlyIncludeScopes ||
      // if defined, check if the current dependency is in the given array
      options.onlyIncludeScopes.some((scope) =>
        dependencyName.startsWith(scope)
      )
    ) {
      dependencies.push(
        mapPackageToNodeDependencies(
          dependencyName,
          options.version ?? dependencyObject[dependencyName],
          options.overwrite
        )
      );
    }
  }

  return dependencies;
}

export function mapPackageToNodeDependencies(
  packageName: string,
  pkgVersion: string,
  overwrite = false
): NodeDependency {
  const type = DEV_DEPENDENCIES_KEYWORDS.some((keyword) =>
    packageName.includes(keyword)
  )
    ? NodeDependencyType.Dev
    : NodeDependencyType.Default;
  return {
    type,
    overwrite,
    name: packageName,
    version: pkgVersion,
  };
}

export function cleanSemverVersion(versionString: string): string {
  if (isNaN(Number(versionString.charAt(0)))) {
    return versionString.substring(1, versionString.length);
  }
  return versionString;
}

export function getMajorVersionNumber(versionString: string): number {
  const cleanVersion = cleanSemverVersion(versionString);
  return Number(cleanVersion.charAt(0));
}

export function getSpartacusSchematicsVersion(): string {
  return version;
}

export function getPrefixedSpartacusSchematicsVersion(): string {
  return `~${getSpartacusSchematicsVersion()}`;
}

export function getSpartacusCurrentFeatureLevel(): string {
  return version.split('.').slice(0, 2).join('.');
}

export function checkIfSSRIsUsed(tree: Tree): boolean {
  const projectName = getDefaultProjectNameFromWorkspace(tree);
  const { workspace: angularJson } = getWorkspace(tree);
  const isServerConfiguration =
    !!angularJson?.projects[projectName]?.architect?.['server'];

  const serverFileLocation = getServerTsPath(tree);

  if (!serverFileLocation) {
    return false;
  }

  const serverBuffer = tree.read(serverFileLocation);
  const serverFileBuffer = serverBuffer?.toString(UTF_8);
  const isServerSideAvailable = serverFileBuffer && !!serverFileBuffer.length;

  return !!(isServerConfiguration && isServerSideAvailable);
}

interface ApplicationBuilderWorkspaceArchitect {
  build?: {
    builder: string;
    options?: {
      server?: string;
      prerender?: boolean;
      ssr?: {
        entry?: string;
      };
    };
  };
}

/**
 * Checks if Server-Side Rendering (SSR) is configured and used with the new Angular application builder.
 *
 * @param tree - The file tree to check for SSR configuration
 * @returns true if SSR is configured and the server file exists, false otherwise
 */
export function checkIfSSRIsUsedWithApplicationBuilder(tree: Tree): boolean {
  const projectName = getDefaultProjectNameFromWorkspace(tree);
  const { workspace: angularJson } = getWorkspace(tree);
  const architect = angularJson.projects[projectName]
    .architect as ApplicationBuilderWorkspaceArchitect;
  const builderType = architect?.build?.builder;
  const buildOptions = architect?.build?.options;

  if (
    typeof builderType !== 'string' ||
    builderType !== '@angular-devkit/build-angular:application'
  ) {
    return false;
  }

  // Check if SSR is configured in build options
  const hasSSRConfig = buildOptions?.server && buildOptions?.ssr?.entry;
  if (!hasSSRConfig) {
    return false;
  }

  const serverFileLocation = getServerTsPathForApplicationBuilder(tree);
  if (!serverFileLocation) {
    return false;
  }

  const serverBuffer = tree.read(serverFileLocation);
  const serverFileBuffer = serverBuffer?.toString(UTF_8);
  return Boolean(serverFileBuffer?.length);
}

/**
 * Gets the path to the server.ts file for applications using the Angular application builder.
 * Looks up the configured server entry point in angular.json and verifies it exists.
 *
 * @param tree - The file tree to check for the server file
 * @returns The normalized path to the server.ts file if found, null otherwise
 */
export function getServerTsPathForApplicationBuilder(
  tree: Tree
): string | null {
  const projectName = getDefaultProjectNameFromWorkspace(tree);
  const { workspace: angularJson } = getWorkspace(tree);
  const architect = angularJson.projects[projectName]
    .architect as ApplicationBuilderWorkspaceArchitect;
  const buildOptions = architect?.build?.options;

  // Get server file path from SSR configuration
  if (buildOptions?.ssr?.entry) {
    const configuredPath = normalize(buildOptions.ssr.entry);
    if (tree.exists(configuredPath)) {
      return configuredPath;
    }
  }
  return null;
}

export function prepareSpartacusDependencies(): NodeDependency[] {
  const spartacusVersion = getPrefixedSpartacusSchematicsVersion();

  const spartacusDependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_CORE,
    },
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_STOREFRONTLIB,
    },
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_ASSETS,
    },
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_STYLES,
    },
  ];

  return spartacusDependencies;
}

export function prepare3rdPartyDependencies(): NodeDependency[] {
  const thirdPartyDependencies = createDependencies({
    ...collectedDependencies[SPARTACUS_CORE],
    ...collectedDependencies[SPARTACUS_STOREFRONTLIB],
    ...collectedDependencies[SPARTACUS_STYLES],
    ...collectedDependencies[SPARTACUS_ASSETS],
    ...collectedDependencies[SPARTACUS_SCHEMATICS],
  });
  return thirdPartyDependencies;
}

export function updatePackageJsonDependencies(
  dependencies: NodeDependency[],
  packageJson: any
): Rule {
  return (tree: Tree, context: SchematicContext): Rule => {
    const dependenciesToAdd: NodeDependency[] = [];

    for (const dependency of dependencies) {
      const currentVersion = getCurrentDependencyVersion(
        dependency,
        packageJson
      );
      if (!currentVersion) {
        dependenciesToAdd.push(dependency);
        continue;
      }

      if (semver.satisfies(currentVersion, dependency.version)) {
        continue;
      }

      const versionToUpdate = semver.parse(
        cleanSemverVersion(dependency.version)
      );
      if (!versionToUpdate || semver.eq(versionToUpdate, currentVersion)) {
        continue;
      }

      addPackageJsonDependency(tree, { ...dependency, overwrite: true });
      const change = semver.gt(versionToUpdate, currentVersion)
        ? 'Upgrading'
        : 'Downgrading';
      context.logger.info(
        `🩹 ${change} '${dependency.name}' to ${dependency.version} (was ${currentVersion.raw})`
      );
    }

    return addPackageJsonDependencies(dependenciesToAdd, packageJson);
  };
}

function getCurrentDependencyVersion(
  dependency: NodeDependency,
  packageJson: any
): semver.SemVer | null {
  if (!dependencyExists(dependency, packageJson)) {
    return null;
  }
  const dependencies = packageJson[dependency.type];
  const currentVersion = dependencies[dependency.name];
  return semver.parse(cleanSemverVersion(currentVersion));
}

/**
 * Reads and parses the package.json file from the root of the project.
 *
 * @param tree - The virtual file tree provided by the Angular schematics
 * @returns The parsed package.json content as an object
 * @throws SchematicsException if package.json cannot be found or parsed
 */
export function readPackageJson(tree: Tree): any {
  const pkgPath = '/package.json';
  const buffer = tree.read(pkgPath);
  if (!buffer) {
    throw new SchematicsException('Could not find package.json');
  }

  return JSON.parse(buffer.toString(UTF_8));
}
