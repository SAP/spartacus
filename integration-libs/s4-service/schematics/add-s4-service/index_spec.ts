/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import {
  S4_SERVICE_FEATURE_NAME,
  SPARTACUS_SCHEMATICS,
  SPARTACUS_S4_SERVICE,
  LibraryOptions as S4ServiceOptions,
  SpartacusOptions,
  s4ServiceFeatureModulePath,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus S/4HANA Service Integration Schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_S4_SERVICE,
    collectionPath
  );

  let appTree: UnitTestTree;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
    standalone: false,
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const libraryNoFeaturesOptions: S4ServiceOptions = {
    project: 'schematics-test',
    lazy: false,
    features: [],
  };

  const s4ServiceFeatureOptions: S4ServiceOptions = {
    ...libraryNoFeaturesOptions,
    features: [S4_SERVICE_FEATURE_NAME],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      SPARTACUS_SCHEMATICS,
      path.join(
        __dirname,
        '../../../../projects/schematics/src/collection.json'
      )
    );

    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );

    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      appTree
    );

    appTree = await schematicRunner.runExternalSchematic(
      SPARTACUS_SCHEMATICS,
      'ng-add',
      { ...spartacusDefaultOptions, name: 'schematics-test' },
      appTree
    );
  });

  describe('Without features', () => {
    beforeEach(async () => {
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        libraryNoFeaturesOptions,
        appTree
      );
    });

    it('should not create any of the feature modules', () => {
      expect(appTree.exists(s4ServiceFeatureModulePath)).toBeFalsy();
    });
  });

  describe('S/4HANA Service Integration feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          {
            ...s4ServiceFeatureOptions,
          },
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          s4ServiceFeatureOptions,
          appTree
        );
      });

      it('should install necessary Spartacus libraries', () => {
        const packageJson = JSON.parse(appTree.readContent('package.json'));
        let dependencies: Record<string, string> = {};
        dependencies = { ...packageJson.dependencies };
        dependencies = { ...dependencies, ...packageJson.devDependencies };

        for (const toAdd in peerDependencies) {
          if (
            !peerDependencies.hasOwnProperty(toAdd) ||
            toAdd === SPARTACUS_SCHEMATICS
          ) {
            continue;
          }
          const expectedDependency = dependencies[toAdd];
          expect(expectedDependency).toBeTruthy();
        }
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(s4ServiceFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          {
            ...s4ServiceFeatureOptions,
          },
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...s4ServiceFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(s4ServiceFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });
});
