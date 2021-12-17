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
  CLI_DIGITAL_PAYMENTS_FEATURE,
  CLI_CHECKOUT_FEATURE,
  LibraryOptions,
  LibraryOptions as SpartacusDigitalPaymentsOptions,
  SpartacusOptions,
  SPARTACUS_CHECKOUT,
  SPARTACUS_SCHEMATICS,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const featureModulePath =
  'src/app/spartacus/features/digital-payments/digital-payments-feature.module.ts';

describe('Spartacus Digital-Payments schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

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
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const libraryNoFeaturesOptions: SpartacusDigitalPaymentsOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const digitalPaymentsFeatureOptions: SpartacusDigitalPaymentsOptions = {
    ...libraryNoFeaturesOptions,
    features: [CLI_DIGITAL_PAYMENTS_FEATURE],
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

    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        SPARTACUS_SCHEMATICS,
        'ng-add',
        { ...spartacusDefaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  describe('Without features', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync('ng-add', libraryNoFeaturesOptions, appTree)
        .toPromise();
    });

    it('should not create any of the feature modules', () => {
      expect(appTree.exists(featureModulePath)).toBeFalsy();
    });
  });

  describe('Digital-Payments feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', digitalPaymentsFeatureOptions, appTree)
          .toPromise();
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
        const tasks = schematicRunner.tasks
          .filter((task) => task.name === 'run-schematic')
          .map(
            (task) => task.options as RunSchematicTaskOptions<LibraryOptions>
          );
        expect(tasks.length).toEqual(2);

        const checkoutTask = tasks[0];
        expect(checkoutTask).toBeTruthy();
        expect(checkoutTask.name).toEqual('add-spartacus-library');
        expect(checkoutTask.options).toHaveProperty(
          'collection',
          SPARTACUS_CHECKOUT
        );
        expect(checkoutTask.options.options?.features).toEqual([]);

        const checkoutTaskWithSubFeatures = tasks[1];
        expect(checkoutTaskWithSubFeatures).toBeTruthy();
        expect(checkoutTaskWithSubFeatures.name).toEqual(
          'add-spartacus-library'
        );
        expect(checkoutTaskWithSubFeatures.options).toHaveProperty(
          'collection',
          SPARTACUS_CHECKOUT
        );
        expect(checkoutTaskWithSubFeatures.options.options?.features).toEqual([
          CLI_CHECKOUT_FEATURE,
        ]);
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...digitalPaymentsFeatureOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(featureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });
});
