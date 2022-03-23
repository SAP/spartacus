import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { userFeatureModulePath } from '.';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import { UTF_8 } from '../constants';
import { USER_ACCOUNT_SCHEMATICS_CONFIG } from '../lib-configs/user-schematics-config';
import { CLI_USER_ACCOUNT_FEATURE } from '../libs-constants';
import { addFeatures, FeatureConfigurationOverrides } from './feature-utils';
import { LibraryOptions } from './lib-utils';

describe('Lib utils', () => {
  const schematicRunner = new SchematicTestRunner(
    'schematics',
    path.join(__dirname, '../../collection.json')
  );

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

  const BASE_OPTIONS: LibraryOptions = {
    project: 'schematics-test',
    lazy: true,
  };

  beforeEach(async () => {
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
      .runSchematicAsync(
        'add-spartacus',
        { ...spartacusDefaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  describe('addFeatures', () => {
    it('should generate feature modules for the given array of features', async () => {
      const tree = await schematicRunner
        .callRule(
          addFeatures(BASE_OPTIONS, [CLI_USER_ACCOUNT_FEATURE]),
          appTree
        )
        .toPromise();

      expect(
        tree.read(userFeatureModulePath)?.toString(UTF_8)
      ).toMatchSnapshot();
    });

    it('should override the options', async () => {
      const overrides: Record<string, FeatureConfigurationOverrides> = {
        [CLI_USER_ACCOUNT_FEATURE]: {
          options: {
            ...BASE_OPTIONS,
            lazy: false,
          },
        },
      };

      const tree = await schematicRunner
        .callRule(
          addFeatures(BASE_OPTIONS, [CLI_USER_ACCOUNT_FEATURE], overrides),
          appTree
        )
        .toPromise();

      expect(
        tree.read(userFeatureModulePath)?.toString(UTF_8)
      ).toMatchSnapshot();
    });

    it('should override the schematics config', async () => {
      const overrides: Record<string, FeatureConfigurationOverrides> = {
        [CLI_USER_ACCOUNT_FEATURE]: {
          schematics: {
            ...USER_ACCOUNT_SCHEMATICS_CONFIG,
            folderName: 'account',
          },
        },
      };

      const tree = await schematicRunner
        .callRule(
          addFeatures(BASE_OPTIONS, [CLI_USER_ACCOUNT_FEATURE], overrides),
          appTree
        )
        .toPromise();

      expect(
        tree
          .read('src/app/spartacus/features/account/user-feature.module.ts')
          ?.toString(UTF_8)
      ).toMatchSnapshot();
    });
  });
});
