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
  LibraryOptions as SpartacusCdcOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';
import featureLibPackageJson from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const cdcModulePath = 'src/app/spartacus/features/cdc/cdc-feature.module.ts';

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

  const defaultOptions: SpartacusCdcOptions = {
    project: 'schematics-test',
    lazy: true,
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

  describe('CDC feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should install @spartacus/asm and @spartacus/user', async () => {
        const packageJson = JSON.parse(appTree.readContent('package.json'));
        expect(packageJson.dependencies['@spartacus/asm']).toEqual(
          `^${featureLibPackageJson.peerDependencies['@spartacus/asm']}`
        );
        expect(packageJson.dependencies['@spartacus/user']).toEqual(
          `^${featureLibPackageJson.peerDependencies['@spartacus/user']}`
        );
      });

      it('should import feature module in SpartacusFeaturesModule', () => {
        const spartacusFeaturesModulePath = appTree.readContent(
          'src/app/spartacus/spartacus-features.module.ts'
        );
        expect(spartacusFeaturesModulePath).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...defaultOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import correct modules (without lazy loaded syntax)', async () => {
        const cdcModule = appTree.readContent(cdcModulePath);
        expect(cdcModule).toMatchSnapshot();
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import correct modules (with lazy loaded syntax)', async () => {
        const cdcModule = appTree.readContent(cdcModulePath);
        expect(cdcModule).toMatchSnapshot();
      });
    });
  });
});
