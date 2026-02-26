import { firstValueFrom } from 'rxjs';

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  FileNameStyleGuide,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import {
  APP_ROUTING_MODULE_CLASS,
  CART_BASE_FEATURE_NAME,
  SPARTACUS_SCHEMATICS,
  SPARTACUS_STOREFRONTLIB,
  USER_ACCOUNT_FEATURE_NAME,
  USER_PROFILE_FEATURE_NAME,
} from '../libs-constants';
import { addFeatures } from './feature-utils';
import { staticImportExists } from './import-utils';
import { LibraryOptions } from './lib-utils';
import { removeModuleImport } from './new-module-utils';
import { createProgram } from './program';
import { getProjectTsConfigPaths } from './project-tsconfig-paths';
import { appModulePath } from './test-utils';

describe('New Module utils', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    path.join(__dirname, '../../collection.json')
  );

  let tree: Tree;
  let buildPath: string;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
    zoneless: false,
    fileNameStyleGuide: FileNameStyleGuide.The2016,
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

  beforeAll(async () => {
    tree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );

    tree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      tree
    );

    tree = await schematicRunner.runSchematic(
      'add-spartacus',
      { ...spartacusDefaultOptions, name: 'schematics-test' },
      tree
    );

    buildPath = getProjectTsConfigPaths(tree, BASE_OPTIONS.project)
      .buildPaths[0];

    tree = await firstValueFrom(
      schematicRunner.callRule(
        addFeatures(BASE_OPTIONS, [
          USER_ACCOUNT_FEATURE_NAME,
          USER_PROFILE_FEATURE_NAME,
          CART_BASE_FEATURE_NAME,
        ]),
        tree
      )
    );
  });

  describe('removeModuleImport', () => {
    /**
     * Checks if the `imports` array (in NgModule decorator) contains the ModuleName
     *
     * It simply checks if `ModuleName` is placed between words `imports:` and either `providers:` or `})`
     * @example
     * ```
     * imports: [
     *   (...)
     *   ModuleName,
     *   (...)
     * ],
     * providers: (or })
     * ```
     */
    function doesNgModuleImportsContainModule(moduleName: string): RegExp {
      return new RegExp(
        `imports:[\\s\\S]*${moduleName}[\\s\\S]*(providers:|\\}\\))`
      );
    }

    it('should remove the specified imports', () => {
      const { program } = createProgram(tree, tree.root.path, buildPath);
      const appModule = program.getSourceFileOrThrow(appModulePath);

      expect(
        staticImportExists(
          appModule,
          SPARTACUS_STOREFRONTLIB,
          APP_ROUTING_MODULE_CLASS
        )
      ).toBeTruthy();
      expect(appModule.getText()).toMatch(
        doesNgModuleImportsContainModule(APP_ROUTING_MODULE_CLASS)
      );

      removeModuleImport(appModule, {
        content: APP_ROUTING_MODULE_CLASS,
        importPath: SPARTACUS_STOREFRONTLIB,
      });

      expect(
        staticImportExists(
          appModule,
          SPARTACUS_STOREFRONTLIB,
          APP_ROUTING_MODULE_CLASS
        )
      ).toBeFalsy();
      expect(appModule.getText()).not.toMatch(
        doesNgModuleImportsContainModule(APP_ROUTING_MODULE_CLASS)
      );
    });

    it('should not remove the specified imports when they do not exist', () => {
      const { program } = createProgram(tree, tree.root.path, buildPath);
      const appModule = program.getSourceFileOrThrow(appModulePath);

      const NON_EXISTING_PATH = 'non-existing/path';
      const NON_EXISTING_MODULE = 'nonExistingModule';

      expect(
        staticImportExists(appModule, NON_EXISTING_PATH, NON_EXISTING_MODULE)
      ).toBeFalsy();
      expect(appModule.getText()).not.toMatch(
        doesNgModuleImportsContainModule(NON_EXISTING_MODULE)
      );

      removeModuleImport(appModule, {
        content: NON_EXISTING_MODULE,
        importPath: NON_EXISTING_PATH,
      });

      expect(
        staticImportExists(appModule, NON_EXISTING_PATH, NON_EXISTING_MODULE)
      ).toBeFalsy();
      expect(appModule.getText()).not.toMatch(
        doesNgModuleImportsContainModule(NON_EXISTING_MODULE)
      );
    });
  });
});
