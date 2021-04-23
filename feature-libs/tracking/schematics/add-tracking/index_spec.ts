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
} from '@spartacus/schematics';
import * as path from 'path';
import {
  CLI_PERSONALIZATION_FEATURE,
  CLI_TMS_AEP_FEATURE,
  CLI_TMS_GTM_FEATURE,
} from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
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

  const defaultOptions: SpartacusPersonalizationOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_PERSONALIZATION_FEATURE],
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

  describe('Without features', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          { ...defaultOptions, features: [] },
          appTree
        )
        .toPromise();
    });

    it('should not add any modules', () => {
      expect(appTree.exists(personalizationModulePath)).toBeFalsy();
      expect(appTree.exists(tagManagementModulePath)).toBeFalsy();
    });
  });

  describe('Personalization feature', () => {
    describe('general setup', () => {
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

      it('should import appropriate modules (no lazy loaded syntax)', async () => {
        const personalizationModule = appTree.readContent(
          personalizationModulePath
        );
        expect(personalizationModule).toMatchSnapshot();
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import appropriate modules (with lazy loaded syntax)', async () => {
        const personalizationModule = appTree.readContent(
          personalizationModulePath
        );
        expect(personalizationModule).toMatchSnapshot();
      });
    });
  });

  describe('Tag Management feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...defaultOptions, features: [CLI_TMS_GTM_FEATURE] },
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
    });

    describe('GTM', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...defaultOptions,
              features: [CLI_TMS_GTM_FEATURE],
            },
            appTree
          )
          .toPromise();
      });
      it('should import appropriate modules (no lazy loaded syntax)', async () => {
        const tagManagementModule = appTree.readContent(
          tagManagementModulePath
        );
        expect(tagManagementModule).toMatchSnapshot();
      });
    });

    describe('AEP', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...defaultOptions,
              features: [CLI_TMS_AEP_FEATURE],
            },
            appTree
          )
          .toPromise();
      });
      it('should import appropriate modules (no lazy loaded syntax)', async () => {
        const tagManagementModule = appTree.readContent(
          tagManagementModulePath
        );
        expect(tagManagementModule).toMatchSnapshot();
      });
    });

    describe('GTM and AEP', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...defaultOptions,
              features: [CLI_TMS_GTM_FEATURE, CLI_TMS_AEP_FEATURE],
            },
            appTree
          )
          .toPromise();
      });
      it('should import appropriate modules (no lazy loaded syntax)', async () => {
        const tagManagementModule = appTree.readContent(
          tagManagementModulePath
        );
        expect(tagManagementModule).toMatchSnapshot();
      });
    });
  });
});
