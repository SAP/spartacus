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
  CLI_CDS_FEATURE,
  SpartacusOptions,
  SPARTACUS_SCHEMATICS,
} from '@spartacus/schematics';
import * as path from 'path';
import { Schema as SpartacusCdsOptions } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');
const spartacusFeaturesModulePath =
  'src/app/spartacus/spartacus-features.module.ts';
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

  const defaultFeatureOptions: SpartacusCdsOptions = {
    project: 'schematics-test',
    features: [CLI_CDS_FEATURE],
    lazy: true,
    tenant: 'my-tenant',
    baseUrl: 'my-base-url.com',
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
        '@spartacus/schematics',
        'ng-add',
        { ...spartacusDefaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  describe('Without features', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          { ...defaultFeatureOptions, features: [] },
          appTree
        )
        .toPromise();
    });

    it('should not add the feature to the feature module', () => {
      const spartacusFeaturesModule = appTree.readContent(
        spartacusFeaturesModulePath
      );
      expect(spartacusFeaturesModule).toMatchSnapshot();
    });
    it('should not add create any of the modules', () => {
      expect(appTree.exists(featureModulePath)).toBeFalsy();
    });
  });

  describe('CDS feature', () => {
    describe('without Profile tag', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync('ng-add', defaultFeatureOptions, appTree)
            .toPromise();
        });
        it('should install necessary Spartacus libraries', async () => {
          const packageJson = appTree.readContent('package.json');
          expect(packageJson).toMatchSnapshot();
        });

        it('should import feature module to SpartacusFeaturesModule', () => {
          const spartacusFeaturesModule = appTree.readContent(
            spartacusFeaturesModulePath
          );
          expect(spartacusFeaturesModule).toMatchSnapshot();
        });

        it('should create the feature module', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
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
              { ...defaultFeatureOptions, profileTagConfigUrl: 'xxx' },
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
              ...defaultFeatureOptions,
              profileTagConfigUrl: 'profile-tag-config-url.com',
              profileTagLoadUrl: 'profile-tag-load-url.com',
            },
            appTree
          )
          .toPromise();
      });

      describe('general setup', () => {
        it('should install necessary Spartacus libraries', async () => {
          const packageJson = appTree.readContent('package.json');
          expect(packageJson).toMatchSnapshot();
        });

        it('should import feature module to SpartacusFeaturesModule', () => {
          const spartacusFeaturesModule = appTree.readContent(
            spartacusFeaturesModulePath
          );
          expect(spartacusFeaturesModule).toMatchSnapshot();
        });

        it('should create the feature module', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });
      });
    });
  });
});
