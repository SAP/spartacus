import deepEqual from 'deep-equal';
import * as fs from 'fs';
import stringifyObject from 'stringify-object';

/**
 * This script generated the constructor deprecation schematics entries.
 *
 * Input: A breaking changes file, likely `./data/breaking-changes.json`
 * Output: A file, `generate-constructors.out.ts`, that contains a ConstructorDeprecation[] array to paste over in the migration schematics code.
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

const breakingChangesFile = process.argv[2];

const breakingChangesData = JSON.parse(
  fs.readFileSync(breakingChangesFile, 'utf-8')
);

console.log(
  `Read: ${breakingChangesFile}, ${breakingChangesData.length} entries`
);

const apiElementsWithConstructorChanges = breakingChangesData.filter(
  (apiElement: any) => {
    return getConstructorChanges(apiElement).length > 0;
  }
);
console.log(
  `Found ${apiElementsWithConstructorChanges.length} api elements with constructor changes.`
);

const constructorSchematics = [];

apiElementsWithConstructorChanges.forEach((apiElement: any) => {
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
fs.writeFileSync(
  `generate-constructors.out.ts`,
  stringifyObject(constructorSchematics)
);

/**
 * -----------
 * Functions
 * -----------
 */
function getConstructorChanges(apiElement: any): any[] {
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
    constructorChanges.details.oldParams.map(toSchematicsParam);
  schematicsData.removeParams =
    constructorChanges.details.oldParams.map(toSchematicsParam);
  schematicsData.addParams =
    constructorChanges.details.newParams.map(toSchematicsParam);

  return schematicsData;
}

function toSchematicsParam(param: any) {
  return {
    className: param.shortType || param.type,
    importPath: param.importPath,
  };
}

function schematicsParamsAreEqual(constructorChanges: any): boolean {
  return deepEqual(
    constructorChanges.details.oldParams.map(toSchematicsParam),
    constructorChanges.details.newParams.map(toSchematicsParam)
  );
}
