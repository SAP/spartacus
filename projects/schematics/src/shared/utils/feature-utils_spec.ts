import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import { UTF_8 } from '../constants';
import { USER_ACCOUNT_SCHEMATICS_CONFIG } from '../lib-configs/user-schematics-config';
import {
  CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
  CLI_USER_ACCOUNT_FEATURE,
  CLI_USER_PROFILE_FEATURE,
  SPARTACUS_SCHEMATICS,
} from '../libs-constants';
import {
  addFeatures,
  analyzeFeature,
  FeatureConfigurationOverrides,
} from './feature-utils';
import { LibraryOptions } from './lib-utils';
import { createProgram } from './program';
import { getProjectTsConfigPaths } from './project-tsconfig-paths';
import {
  spartacusFeaturesModulePath,
  userFeatureModulePath,
} from './test-utils';

describe('Feature utils', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    path.join(__dirname, '../../collection.json')
  );

  let appTree: Tree;
  let buildPath: string;

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

    buildPath = getProjectTsConfigPaths(appTree, BASE_OPTIONS.project)
      .buildPaths[0];
  });

  describe('addFeatures', () => {
    it('should generate feature modules for the given array of features', async () => {
      appTree = await schematicRunner
        .callRule(
          addFeatures(BASE_OPTIONS, [CLI_USER_ACCOUNT_FEATURE]),
          appTree
        )
        .toPromise();

      expect(
        appTree.read(userFeatureModulePath)?.toString(UTF_8)
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

      appTree = await schematicRunner
        .callRule(
          addFeatures(BASE_OPTIONS, [CLI_USER_ACCOUNT_FEATURE], overrides),
          appTree
        )
        .toPromise();

      expect(
        appTree.read(userFeatureModulePath)?.toString(UTF_8)
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

      appTree = await schematicRunner
        .callRule(
          addFeatures(BASE_OPTIONS, [CLI_USER_ACCOUNT_FEATURE], overrides),
          appTree
        )
        .toPromise();

      expect(
        appTree
          .read('src/app/spartacus/features/account/user-feature.module.ts')
          ?.toString(UTF_8)
      ).toMatchSnapshot();
    });
  });

  describe('analyzeFeature', () => {
    it('should correctly analyze the Spartacus feature module', async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...spartacusDefaultOptions,
            name: 'schematics-test',
            features: [CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE],
          },
          appTree
        )
        .toPromise();

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const spartacusFeatureModule = program.getSourceFileOrThrow(
        spartacusFeaturesModulePath
      );
      const result = analyzeFeature(spartacusFeatureModule);
      expect(result.core?.map((c) => c.print())).toMatchSnapshot();
      expect(result.features?.map((f) => f.feature)).toMatchSnapshot();
      expect(result.unrecognized).toEqual(undefined);
    });

    it('should correctly analyze the User feature module', async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...spartacusDefaultOptions,
            name: 'schematics-test',
            features: [CLI_USER_PROFILE_FEATURE],
          },
          appTree
        )
        .toPromise();

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const spartacusUserModule = program.getSourceFileOrThrow(
        userFeatureModulePath
      );
      const result = analyzeFeature(spartacusUserModule);

      expect(result.core).toEqual([]);
      expect(result.features?.map((f) => f.feature)).toEqual([
        CLI_USER_ACCOUNT_FEATURE,
        CLI_USER_PROFILE_FEATURE,
      ]);
      expect(result.unrecognized).toEqual(undefined);
    });
  });
});
