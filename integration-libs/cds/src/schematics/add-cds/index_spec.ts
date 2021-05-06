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
import { CLI_CDS_FEATURE, SpartacusOptions } from '@spartacus/schematics';
import * as path from 'path';
import { Schema as SpartacusCdsOptions } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');
const spartacusCdsFeatureModulePath =
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
      '@spartacus/schematics',
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

  describe('When no features are provided', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          { ...defaultFeatureOptions, features: [] },
          appTree
        )
        .toPromise();
    });

    it('should not create the feature module', () => {
      const featureModule = appTree.readContent(spartacusCdsFeatureModulePath);
      expect(featureModule).toBeFalsy();
    });
    it('should not add the feature to the feature module', () => {
      const spartacusFeaturesModule = appTree.readContent(
        'src/app/spartacus/spartacus-features.module.ts'
      );
      expect(spartacusFeaturesModule).toMatchSnapshot();
    });
  });

  describe('CDS feature', () => {
    describe('general setup without ProfileTag', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultFeatureOptions, appTree)
          .toPromise();
      });

      it('should import feature module in SpartacusFeaturesModule', () => {
        const spartacusFeaturesModulePath = appTree.readContent(
          'src/app/spartacus/spartacus-features.module.ts'
        );
        expect(spartacusFeaturesModulePath).toMatchSnapshot();
      });

      it('should generate CDS feature module without ProfileTag config', () => {
        const cdsFeatureModule = appTree.readContent(
          spartacusCdsFeatureModulePath
        );
        expect(cdsFeatureModule).toMatchSnapshot();
      });
    });

    describe('general setup with ProfileTag', () => {
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

      it('should import feature module in SpartacusFeaturesModule', () => {
        const spartacusFeaturesModulePath = appTree.readContent(
          'src/app/spartacus/spartacus-features.module.ts'
        );
        expect(spartacusFeaturesModulePath).toMatchSnapshot();
      });
      it('should generate CDS feature module with ProfileTag config', () => {
        const cdsFeatureModule = appTree.readContent(
          spartacusCdsFeatureModulePath
        );
        expect(cdsFeatureModule).toMatchSnapshot();
      });
    });
  });
});
