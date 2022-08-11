import { JsonObject } from '@angular-devkit/core';
import * as path from 'path';

export interface PackageInfo {
  name: string;
  private: boolean;
  packageJson: JsonObject;
  version: string;
}
export interface PackageMap {
  [name: string]: PackageInfo;
}

function loadPackageJson(p: string) {
  const pkg = require(p);

  for (const key of Object.keys(pkg)) {
    switch (key) {
      // Keep the following keys from the package.json of the package itself.
      case 'bin':
      case 'description':
      case 'dependencies':
      case 'name':
      case 'main':
      case 'peerDependencies':
      case 'optionalDependencies':
      case 'typings':
      case 'version':
      case 'private':
      case 'workspaces':
      case 'resolutions':
        continue;

      // Remove the following keys from the package.json.
      case 'devDependencies':
      case 'scripts':
        delete pkg[key];
        continue;
      case 'keywords':
        pkg[key] = pkg[key] || [];
        break;
      default:
    }
  }

  return pkg;
}

// Fixed list of our packages
const packageJsonPaths = [
  path.join(__dirname, '..', 'projects', 'core', 'package.json'),
  path.join(__dirname, '..', 'projects', 'storefrontlib', 'package.json'),
  path.join(__dirname, '..', 'projects', 'storefrontstyles', 'package.json'),
  path.join(__dirname, '..', 'projects', 'assets', 'package.json'),
  path.join(__dirname, '..', 'projects', 'schematics', 'package.json'),
  path.join(__dirname, '..', 'integration-libs', 'cds', 'package.json'),
  path.join(__dirname, '..', 'core-libs', 'setup', 'package.json'),
  path.join(__dirname, '..', 'feature-libs', 'user', 'package.json'),
  path.join(__dirname, '..', 'feature-libs', 'organization', 'package.json'),
  path.join(__dirname, '..', 'feature-libs', 'product', 'package.json'),
  path.join(__dirname, '..', 'feature-libs', 'storefinder', 'package.json'),
  path.join(__dirname, '..', 'feature-libs', 'checkout', 'package.json'),
  path.join(__dirname, '..', 'feature-libs', 'asm', 'package.json'),
  path.join(__dirname, '..', 'feature-libs', 'smartedit', 'package.json'),
  path.join(__dirname, '..', 'feature-libs', 'tracking', 'package.json'),
  path.join(__dirname, '..', 'feature-libs', 'qualtrics', 'package.json'),
  path.join(__dirname, '..', 'integration-libs', 'cdc', 'package.json'),
  path.join(__dirname, '..', 'feature-libs', 'cart', 'package.json'),
  path.join(__dirname, '..', 'feature-libs', 'order', 'package.json'),
  path.join(__dirname, '..', 'integration-libs', 'digital-payments', 'package.json'),
  path.join(__dirname, '..', 'integration-libs', 'epd-visualization', 'package.json'),
];

// All the supported packages. Go through the packages directory and create a map of
// name => PackageInfo. This map is partial as it lacks some information that requires the
// map itself to finish building.
export const packages: PackageMap = packageJsonPaths.reduce(
  (projectPackages: PackageMap, pkgJsonPath: string) => {
    const packageJson = loadPackageJson(pkgJsonPath);
    const name = packageJson['name'];
    if (!name) {
      // Only build the entry if there's a package name.
      return projectPackages;
    }

    projectPackages[name] = {
      private: packageJson.private,
      name,
      packageJson,
      version: packageJson.version || '0.0.0',
    };

    return projectPackages;
  },
  {}
);
