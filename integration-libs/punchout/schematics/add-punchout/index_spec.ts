/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  generateDefaultWorkspace,
  punchoutFeatureModulePath,
  SPARTACUS_PUNCHOUT,
  LibraryOptions as SpartacusPunchoutOptions,
} from '@spartacus/schematics';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus Punchout schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_PUNCHOUT,
    collectionPath
  );

  let appTree: UnitTestTree;

  const libraryNoFeaturesOptions: SpartacusPunchoutOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  describe('Without features', () => {
    beforeAll(async () => {
      appTree = await generateDefaultWorkspace(schematicRunner, appTree);

      appTree = await schematicRunner.runSchematic(
        'ng-add',
        libraryNoFeaturesOptions,
        appTree
      );
    });

    it('should not create any of the feature modules', () => {
      expect(appTree.exists(punchoutFeatureModulePath)).toBeFalsy();
    });
  });
});
