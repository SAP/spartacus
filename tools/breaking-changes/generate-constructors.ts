/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import deepEqual from 'deep-equal';
import * as common from './common';

/**
 * This script generated the constructor deprecation schematics entries.
 *
 * Input: Breaking change data returned by readBreakingChangeFile().  Likely is is ./data/X_0/breaking-change.json.  The folder depends on the new version config.`
 * Output: A file whose path is in OUTPUT_FILE_PATH const.  The file is a ts file that contains migration data ready to be imported by the schematics.
 *
 * Some use cases need a manual review/fixing after the generation.
 *
 * - params renamed + other legit braking changs (renamed params will be present as breaking changes in in both added params and removed params)
 * - params with anonymous types, like: `someParam: { customerId: string, cart:Cart }`
 * - deleted constructor ( In some cases, the tool can't match the new constructor and flags chaanged constructor as deleted ).
 *
 * How to spot the cases for manual review:
 * - look for empty import paths in the generated code.  Search for [importPath: '']
 * - look for `warning:` occurences in the generated code.  Search for "warning:"
 * - look for CONSTRUCTOR_DELETED occurences in the braking change list
 *
 */

/**
 * -----------
 * Main logic
 * -----------
 */
const OUTPUT_FILE_PATH = `${common.MIGRATION_SCHEMATICS_HOME}/constructor-deprecations/data/generated-constructor.migration.ts`;
const OUTPUT_FILE_TEMPLATE_PATH = `generate-constructors.out.template`;

const breakingChangesData = common.readBreakingChangeFile();

const apiElementsWithConstructorChanges = breakingChangesData.filter(
  (apiElement: any) => {
    // Skip elements without breakingChanges array
    if (!apiElement || !Array.isArray(apiElement.breakingChanges)) {
      return false;
    }
    return getConstructorChanges(apiElement).length > 0;
  }
);
console.log(
  `Found ${apiElementsWithConstructorChanges.length} api elements with constructor changes.`
);

// Known false positives - classes with duplicate names in different files
// that the comparison tool incorrectly flags as changed
const KNOWN_FALSE_POSITIVES = [
  { name: 'LoadPermissions', importPath: '@spartacus/organization/administration/core' },
  { name: 'LoadPermissionsFail', importPath: '@spartacus/organization/administration/core' },
  { name: 'LoadPermissionsSuccess', importPath: '@spartacus/organization/administration/core' },
];

function isKnownFalsePositive(apiElement: any): boolean {
  return KNOWN_FALSE_POSITIVES.some(fp =>
    fp.name === apiElement.name && fp.importPath === apiElement.entryPoint
  );
}

const constructorSchematics = [];

apiElementsWithConstructorChanges.forEach((apiElement: any) => {
  if (isKnownFalsePositive(apiElement)) {
    console.log(
      `Warning: Skipped known false positive for ${apiElement.kind} ${apiElement.name} (duplicate class names in different files).`
    );
    return;
  }

  getConstructorChanges(apiElement).forEach((constructorChange: any) => {
    if (schematicsParamsAreEqual(constructorChange)) {
      console.log(
        `Warning: Skipped one migration schematic for ${apiElement.kind} ${apiElement.name} because before and after params are the same for schematics.`
      );
      // Schematics only care about param type changes.  If the only changes are with other
      // changes (param variable name, genericss type changes), there is a chance the before and after would be the same
      // for schematics.
      return;
    }
    constructorSchematics.push(
      getSchematicsData(apiElement, constructorChange)
    );
  });
});

console.log(
  `Generated ${constructorSchematics.length} constructor schematics entries.`
);

common.writeSchematicsDataOutput(
  OUTPUT_FILE_PATH,
  OUTPUT_FILE_TEMPLATE_PATH,
  constructorSchematics
);
/**
 * -----------
 * Functions
 * -----------
 */
function getConstructorChanges(apiElement: any): any[] {
  if (!apiElement || !Array.isArray(apiElement.breakingChanges)) {
    return [];
  }
  return apiElement.breakingChanges.filter((breakingChange: any) => {
    return (
      breakingChange.change === 'CONSTRUCTOR_CHANGED' &&
      !breakingChange.skipSchematics
    );
  });
}

function getSchematicsData(apiElement: any, constructorChanges: any): any {
  const schematicsData: any = {};
  schematicsData.class = apiElement.name;
  schematicsData.importPath = apiElement.entryPoint;
  schematicsData.deprecatedParams =
    constructorChanges.old.parameters.map(toSchematicsParam);
  schematicsData.removeParams =
    constructorChanges.old.parameters.map(toSchematicsParam);
  schematicsData.addParams =
    constructorChanges.new.parameters.map(toSchematicsParam);

  return schematicsData;
}

function toSchematicsParam(param: any) {
  return {
    className: param.shortType || param.type,
    importPath: param.importPath,
  };
}

/**
 * Normalize type by removing JSDoc comments and extra whitespace.
 * JSDoc changes are not breaking changes.
 */
function normalizeType(type: string): string {
  if (!type) return type;

  // Replace literal \n with actual newlines for regex to work
  let normalized = type.replace(/\\n/g, '\n');

  // Remove JSDoc comments (/** ... */)
  normalized = normalized.replace(/\/\*\*[\s\S]*?\*\//g, '');

  // Normalize whitespace - replace multiple spaces/newlines with single space
  normalized = normalized.replace(/\s+/g, ' ').trim();

  return normalized;
}

function schematicsParamsAreEqual(constructorChanges: any): boolean {
  const oldParams = constructorChanges.old.parameters.map(toSchematicsParam);
  const newParams = constructorChanges.new.parameters.map(toSchematicsParam);

  // Normalize types before comparison to ignore JSDoc changes
  const normalizedOld = oldParams.map((p: any) => ({
    ...p,
    className: normalizeType(p.className)
  }));
  const normalizedNew = newParams.map((p: any) => ({
    ...p,
    className: normalizeType(p.className)
  }));

  return deepEqual(normalizedOld, normalizedNew);
}
