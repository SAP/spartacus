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
import { SpartacusOptions } from '@spartacus/schematics';
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

  const defaultOptions: SpartacusCdsOptions = {
    project: 'schematics-test',
    lazy: true,
    tenant: 'my-tenant',
    baseUrl: 'my-base-url.com',
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    configuration: 'b2c',
    lazy: true,
    features: [],
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

  describe('CDS feature', () => {
    describe('general setup without ProfileTag', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
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
              ...defaultOptions,
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
