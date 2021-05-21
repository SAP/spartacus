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
  CLI_CDC_FEATURE,
  CLI_USER_PROFILE_FEATURE,
  LibraryOptions,
  LibraryOptions as SpartacusCdcOptions,
  SpartacusOptions,
  SPARTACUS_ASM,
  SPARTACUS_SCHEMATICS,
  SPARTACUS_USER,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const featureModulePath =
  'src/app/spartacus/features/cdc/cdc-feature.module.ts';

describe('Spartacus CDC schematics: ng-add', () => {
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
    configuration: 'b2c',
    lazy: true,
    features: [],
  };

  const libraryNoFeaturesOptions: SpartacusCdcOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const cdcFeatureOptions: SpartacusCdcOptions = {
    ...libraryNoFeaturesOptions,
    features: [CLI_CDC_FEATURE],
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
      SPARTACUS_ASM,
      require.resolve('../../../../feature-libs/asm/schematics/collection.json')
    );
    schematicRunner.registerCollection(
      SPARTACUS_USER,
      path.join(
        __dirname,
        '../../../../feature-libs/user/schematics/collection.json'
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

  describe('CDC feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', cdcFeatureOptions, appTree)
          .toPromise();
      });

      it('should install necessary Spartacus libraries', () => {
        const packageJson = JSON.parse(appTree.readContent('package.json'));
        let dependencies: Record<string, string> = {};
        dependencies = { ...packageJson.dependencies };
        dependencies = { ...dependencies, ...packageJson.devDependencies };

        for (const toAdd in peerDependencies) {
          // skip the SPARTACUS_SCHEMATICS, as those are added only when running by the Angular CLI, and not in the testing environment
          if (
            !peerDependencies.hasOwnProperty(toAdd) ||
            toAdd === SPARTACUS_SCHEMATICS
          ) {
            continue;
          }
          // TODO: after 4.0: use this test, as we'll have synced versions between lib's and root package.json
          // const expectedVersion = (peerDependencies as Record<
          //   string,
          //   string
          // >)[toAdd];
          const expectedDependency = dependencies[toAdd];
          expect(expectedDependency).toBeTruthy();
          // expect(expectedDependency).toEqual(expectedVersion);
        }
      });

      it('should run the proper installation tasks', async () => {
        const tasks = schematicRunner.tasks
          .filter((task) => task.name === 'run-schematic')
          .map(
            (task) => task.options as RunSchematicTaskOptions<LibraryOptions>
          );
        expect(tasks.length).toEqual(3);

        const asmTask = tasks[0];
        expect(asmTask).toBeTruthy();
        expect(asmTask.name).toEqual('add-spartacus-library');
        expect(asmTask.options).toHaveProperty('collection', SPARTACUS_ASM);
        expect(asmTask.options.options?.features).toEqual([]);

        const userTask = tasks[1];
        expect(userTask).toBeTruthy();
        expect(userTask.name).toEqual('add-spartacus-library');
        expect(userTask.options).toHaveProperty('collection', SPARTACUS_USER);
        expect(userTask.options.options?.features).toEqual([]);

        const userTaskWithSubFeatures = tasks[2];
        expect(userTaskWithSubFeatures).toBeTruthy();
        expect(userTaskWithSubFeatures.name).toEqual('add-spartacus-library');
        expect(userTaskWithSubFeatures.options).toHaveProperty(
          'collection',
          SPARTACUS_USER
        );
        expect(userTaskWithSubFeatures.options.options?.features).toEqual([
          CLI_USER_PROFILE_FEATURE,
        ]);
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(featureModulePath);
        expect(module).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...cdcFeatureOptions, lazy: false },
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
