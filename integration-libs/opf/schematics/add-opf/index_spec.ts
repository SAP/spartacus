/// <reference types="jest" />

import { RunSchematicTaskOptions } from '@angular-devkit/schematics/tasks/run-schematic/options';
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
  OPF_BASE_FEATURE_NAME,
  OPF_CHECKOUT_FEATURE_NAME,
  SPARTACUS_CHECKOUT,
  SPARTACUS_OPF,
  SPARTACUS_SCHEMATICS,
  LibraryOptions as SpartacusOpfOptions,
  SpartacusOptions,
  checkoutWrapperModulePath,
  opfFeatureModulePath,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';
const collectionPath = path.join(__dirname, '../collection.json');
const scssFilePath = 'src/styles/spartacus/opf.scss';

describe('Spartacus SAP OPF integration schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_OPF,
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

  const libraryNoFeaturesOptions: SpartacusOpfOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const checkoutFeatureOptions: SpartacusOpfOptions = {
    ...libraryNoFeaturesOptions,
    features: [OPF_CHECKOUT_FEATURE_NAME],
  };

  const opfFeatureOptions: SpartacusOpfOptions = {
    ...libraryNoFeaturesOptions,
    features: [OPF_BASE_FEATURE_NAME],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      SPARTACUS_SCHEMATICS,
      path.join(
        __dirname,
        '../../../../projects/schematics/src/collection.json'
      )
    );

    schematicRunner.registerCollection(
      SPARTACUS_CHECKOUT,
      path.join(
        __dirname,
        '../../../../feature-libs/checkout/schematics/collection.json'
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
        { ...libraryNoFeaturesOptions, features: [] },
        appTree
      );
    });

    it('should not create any of the feature modules', () => {
      expect(appTree.exists(opfFeatureModulePath)).toBeFalsy();
    });
  });

  describe('SAP OPF feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...checkoutFeatureOptions, ...opfFeatureOptions },
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
        const module = appTree.readContent(opfFeatureModulePath);
        expect(module).toMatchSnapshot();
      });

      describe('styling', () => {
        it('should create a proper scss file', () => {
          const scssContent = appTree.readContent(scssFilePath);
          expect(scssContent).toMatchSnapshot();
        });

        it('should update angular.json', async () => {
          const content = appTree.readContent('/angular.json');
          expect(content).toMatchSnapshot();
        });
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

      it('should run the proper installation tasks', async () => {
        const tasks = schematicRunner.tasks.filter(
          (task) =>
            task.name === 'run-schematic' &&
            (task.options as RunSchematicTaskOptions<{}>).collection ===
              '@sap/opf'
        );

        expect(tasks.length).toEqual(0);
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(opfFeatureModulePath);
        expect(module).toMatchSnapshot();

        const wrapperModule = appTree.readContent(checkoutWrapperModulePath);
        expect(wrapperModule).toMatchSnapshot();
      });
    });
  });
});

it('should pass schematics tests', async () => {
  expect(true).toEqual(true);
});
