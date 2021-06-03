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
  CLI_CDS_FEATURE,
  CLI_TRACKING_PERSONALIZATION_FEATURE,
  LibraryOptions,
  SpartacusOptions,
  SPARTACUS_SCHEMATICS,
  SPARTACUS_TRACKING,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../../package.json';
import { Schema as SpartacusCdsOptions } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');
const featureModulePath =
  'src/app/spartacus/features/cds/cds-feature.module.ts';

describe('Spartacus CDS schematics: ng-add', () => {
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

  const libraryNoFeaturesOptions: SpartacusCdsOptions = {
    project: 'schematics-test',
    features: [],
    lazy: true,
    tenant: 'my-tenant',
    baseUrl: 'my-base-url.com',
  };

  const cdsFeatureOptions: SpartacusCdsOptions = {
    ...libraryNoFeaturesOptions,
    features: [CLI_CDS_FEATURE],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      SPARTACUS_SCHEMATICS,
      '../../projects/schematics/src/collection.json'
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
  });

  describe('CDS feature', () => {
    describe('without Profile tag', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync('ng-add', cdsFeatureOptions, appTree)
            .toPromise();
        });

        it('should create the feature module', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });

        it('should run the proper installation tasks', async () => {
          const tasks = schematicRunner.tasks
            .filter((task) => task.name === 'run-schematic')
            .map(
              (task) => task.options as RunSchematicTaskOptions<LibraryOptions>
            );
          expect(tasks.length).toEqual(2);

          const trackingTask = tasks[0];
          expect(trackingTask).toBeTruthy();
          expect(trackingTask.name).toEqual('add-spartacus-library');
          expect(trackingTask.options).toHaveProperty(
            'collection',
            SPARTACUS_TRACKING
          );
          expect(trackingTask.options.options?.features).toEqual([]);

          const trackingTaskWithSubFeatures = tasks[1];
          expect(trackingTaskWithSubFeatures).toBeTruthy();
          expect(trackingTaskWithSubFeatures.name).toEqual(
            'add-spartacus-library'
          );
          expect(trackingTaskWithSubFeatures.options).toHaveProperty(
            'collection',
            SPARTACUS_TRACKING
          );
          expect(
            trackingTaskWithSubFeatures.options.options?.features
          ).toEqual([CLI_TRACKING_PERSONALIZATION_FEATURE]);
        });
      });

      describe('validation', () => {
        let firstMessage: string | undefined;
        beforeEach(async () => {
          schematicRunner.logger.subscribe((log) => {
            if (!firstMessage) {
              firstMessage = log.message;
            }
          });

          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              { ...cdsFeatureOptions, profileTagConfigUrl: 'xxx' },
              appTree
            )
            .toPromise();
        });

        it('show the warning', () => {
          expect(firstMessage).toEqual(
            `Profile tag will not be added. Please run the schematic again, and make sure you provide both profile tag options.`
          );
        });
      });
    });

    describe('with Profile tag configured', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...cdsFeatureOptions,
              profileTagConfigUrl: 'profile-tag-config-url.com',
              profileTagLoadUrl: 'profile-tag-load-url.com',
            },
            appTree
          )
          .toPromise();
      });

      describe('general setup', () => {
        it('should create the feature module', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });
      });
    });
  });
});
