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
  LibraryOptions as SpartacusPersonalizationOptions,
  SpartacusOptions,
  SPARTACUS_SCHEMATICS,
} from '@spartacus/schematics';
import * as path from 'path';
import {
  CLI_PERSONALIZATION_FEATURE,
  CLI_TMS_AEP_FEATURE,
  CLI_TMS_GTM_FEATURE,
} from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const spartacusFeaturesModulePath =
  'src/app/spartacus/spartacus-features.module.ts';
const personalizationModulePath =
  'src/app/spartacus/features/tracking/personalization-feature.module.ts';
const tagManagementModulePath =
  'src/app/spartacus/features/tracking/tag-management-feature.module.ts';

describe('Spartacus Tracking schematics: ng-add', () => {
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

  const defaultFeatureOptions: SpartacusPersonalizationOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_PERSONALIZATION_FEATURE],
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
      expect(appTree.exists(personalizationModulePath)).toBeFalsy();
      expect(appTree.exists(tagManagementModulePath)).toBeFalsy();
    });
  });

  describe('Personalization feature', () => {
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

      it('should add the feature using the lazy loading syntax', async () => {
        const personalizationModule = appTree.readContent(
          personalizationModulePath
        );
        expect(personalizationModule).toMatchSnapshot();
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
        const module = appTree.readContent(personalizationModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });

  describe('Tag Management feature', () => {
    describe('GTM', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...defaultFeatureOptions,
              features: [CLI_TMS_GTM_FEATURE],
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

        it('should import appropriate modules (without lazy loaded syntax)', async () => {
          const tagManagementModule = appTree.readContent(
            tagManagementModulePath
          );
          expect(tagManagementModule).toMatchSnapshot();
        });
      });
    });

    describe('AEP', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...defaultFeatureOptions,
              features: [CLI_TMS_AEP_FEATURE],
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

        it('should import appropriate modules (without lazy loaded syntax)', async () => {
          const tagManagementModule = appTree.readContent(
            tagManagementModulePath
          );
          expect(tagManagementModule).toMatchSnapshot();
        });
      });
    });

    describe('GTM and AEP', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...defaultFeatureOptions,
              features: [CLI_TMS_GTM_FEATURE, CLI_TMS_AEP_FEATURE],
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

        it('should import appropriate modules (without lazy loaded syntax)', async () => {
          const tagManagementModule = appTree.readContent(
            tagManagementModulePath
          );
          expect(tagManagementModule).toMatchSnapshot();
        });
      });
    });
  });
});
