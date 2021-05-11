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
  CLI_QUALTRICS_FEATURE,
  LibraryOptions as SpartacusQualtricsOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');
const qualtricsModulePath =
  'src/app/spartacus/features/qualtrics/qualtrics-feature.module.ts';
const scssFilePath = 'src/styles/spartacus/qualtrics-embedded-feedback.scss';

// TODO: Improve tests after lib-util test update
describe('Spartacus Qualtrics schematics: ng-add', () => {
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

  const defaultFeatureOptions: SpartacusQualtricsOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_QUALTRICS_FEATURE],
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
      const featureModule = appTree.readContent(qualtricsModulePath);
      expect(featureModule).toBeFalsy();
    });
    it('should not add the feature to the feature module', () => {
      const spartacusFeaturesModulePath = appTree.readContent(
        'src/app/spartacus/spartacus-features.module.ts'
      );
      expect(spartacusFeaturesModulePath).toMatchSnapshot();
    });
  });

  describe('Qualtrics feature', () => {
    describe('styling', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultFeatureOptions, appTree)
          .toPromise();
      });

      it('should create a proper scss file', () => {
        const scssContent = appTree.readContent(scssFilePath);
        expect(scssContent).toMatchSnapshot();
      });

      it('should update angular.json', async () => {
        const content = appTree.readContent('/angular.json');
        expect(content).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...defaultFeatureOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import appropriate modules', async () => {
        const qualtricsModule = appTree.readContent(qualtricsModulePath);
        expect(qualtricsModule).toContain(
          `import { QualtricsRootModule } from "@spartacus/qualtrics/root";`
        );
        expect(qualtricsModule).toContain(
          `import { QualtricsModule } from "@spartacus/qualtrics";`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const qualtricsModule = appTree.readContent(qualtricsModulePath);
        expect(qualtricsModule).not.toContain(
          `import('@spartacus/qualtrics').then(`
        );
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultFeatureOptions, appTree)
          .toPromise();
      });

      it('should import QualtricsRootModule and contain the lazy loading syntax', async () => {
        const qualtricsModule = appTree.readContent(qualtricsModulePath);
        expect(qualtricsModule).toContain(
          `import { QualtricsRootModule, QUALTRICS_FEATURE } from "@spartacus/qualtrics/root";`
        );
        expect(qualtricsModule).toContain(
          `import('@spartacus/qualtrics').then(`
        );
      });

      it('should not contain the QualtricsModule import', () => {
        const qualtricsModule = appTree.readContent(qualtricsModulePath);
        expect(qualtricsModule).not.toContain(
          `import { QualtricsModule } from "@spartacus/qualtrics";`
        );
      });
    });
  });
});
