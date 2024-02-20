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
  CDP_FEATURE_NAME,
  SPARTACUS_SCHEMATICS,
  SPARTACUS_CDP,
  LibraryOptions as CdpOptions,
  SpartacusOptions,
  CUSTOMER_TICKETING_FEATURE_NAME,
  cdpFeatureModulePath,
  customerTicketingFeatureModulePath,
  customerTicketingWrapperModulePath,
} from '@spartacus/schematics';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus CDP schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_CDP,
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

  const libraryNoFeaturesOptions: CdpOptions = {
    project: 'schematics-test',
    lazy: false,
    features: [],
  };

  const cdpFeatureOptions: CdpOptions = {
    ...libraryNoFeaturesOptions,
    features: [CDP_FEATURE_NAME],
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

  describe('Without CDP features', () => {
    beforeEach(async () => {
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        libraryNoFeaturesOptions,
        appTree
      );
    });

    it('should not create any of the feature modules', () => {
      expect(appTree.exists(cdpFeatureModulePath)).toBeFalsy();
    });
  });

  describe('With CDP feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          {
            ...cdpFeatureOptions,
            features: [CUSTOMER_TICKETING_FEATURE_NAME],
          },
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          cdpFeatureOptions,
          appTree
        );
      });

      it('should install necessary Spartacus libraries', () => {
        const packageJson = JSON.parse(appTree.readContent('package.json'));
        let dependencies: Record<string, string> = {};
        dependencies = { ...packageJson.dependencies };
        dependencies = { ...dependencies, ...packageJson.devDependencies };

        for (const toAdd in dependencies) {
          if (
            !dependencies.hasOwnProperty(toAdd) ||
            toAdd === SPARTACUS_SCHEMATICS
          ) {
            continue;
          }
          const expectedVersion = (dependencies as Record<string, string>)[
            toAdd
          ];
          const expectedDependency = dependencies[toAdd];
          expect(expectedDependency).toBeTruthy();
          expect(expectedDependency).toEqual(expectedVersion);
        }
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(cdpFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
      it('should install the appropriate dependencies', async () => {
        const customerTicketingWrapperModule = appTree.readContent(
          customerTicketingWrapperModulePath
        );
        expect(customerTicketingWrapperModule).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          {
            ...cdpFeatureOptions,
            features: [CUSTOMER_TICKETING_FEATURE_NAME],
          },
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...cdpFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(cdpFeatureModulePath);
        expect(module).toMatchSnapshot();
        expect(
          appTree.readContent(customerTicketingFeatureModulePath)
        ).toBeTruthy();
      });
    });
  });
});
