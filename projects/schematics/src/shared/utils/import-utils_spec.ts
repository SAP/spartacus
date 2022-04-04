import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import {
  CLI_CART_BASE_FEATURE,
  CLI_USER_ACCOUNT_FEATURE,
  CLI_USER_PROFILE_FEATURE,
} from '../libs-constants';
import { addFeatures } from './feature-utils';
import {
  collectDynamicImports,
  getDynamicImportCallExpression,
  getDynamicImportPropertyAccess,
} from './import-utils';
import { LibraryOptions } from './lib-utils';
import { createProgram } from './program';
import { getProjectTsConfigPaths } from './project-tsconfig-paths';
import { cartBaseFeatureModulePath } from './test-utils';

describe('Import utils', () => {
  const schematicRunner = new SchematicTestRunner(
    'schematics',
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
    tree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();
    tree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        tree
      )
      .toPromise();
    tree = await schematicRunner
      .runSchematicAsync(
        'add-spartacus',
        { ...spartacusDefaultOptions, name: 'schematics-test' },
        tree
      )
      .toPromise();

    buildPath = getProjectTsConfigPaths(tree, BASE_OPTIONS.project)
      .buildPaths[0];

    tree = await schematicRunner
      .callRule(
        addFeatures(BASE_OPTIONS, [
          CLI_USER_ACCOUNT_FEATURE,
          CLI_USER_PROFILE_FEATURE,
          CLI_CART_BASE_FEATURE,
        ]),
        tree
      )
      .toPromise();
  });

  describe('collectDynamicImports', () => {
    it('should collect all dynamic imports', async () => {
      const { program } = createProgram(tree, tree.root.path, buildPath);

      const spartacusFeaturesModule = program.getSourceFileOrThrow(
        cartBaseFeatureModulePath
      );

      const result = collectDynamicImports(spartacusFeaturesModule);
      expect(result.length).toBe(3);
      expect(result[0].print()).toEqual(
        "() => import('@spartacus/cart/base').then((m) => m.CartBaseModule)"
      );
      expect(result[1].print()).toEqual(
        "() => import('@spartacus/cart/base/components/mini-cart').then((m) => m.MiniCartModule)"
      );
      expect(result[2].print()).toEqual(
        "() => import('@spartacus/cart/base/components/add-to-cart').then((m) => m.AddToCartModule)"
      );
    });
  });

  describe('getDynamicImportCallExpression', () => {
    it('should return the import paths', async () => {
      const { program } = createProgram(tree, tree.root.path, buildPath);

      const spartacusFeaturesModule = program.getSourceFileOrThrow(
        cartBaseFeatureModulePath
      );

      const dynamicImports = collectDynamicImports(spartacusFeaturesModule);
      const result = getDynamicImportCallExpression(dynamicImports[0]);
      expect(result).toEqual('@spartacus/cart/base');
    });
  });

  describe('getDynamicImportModule', () => {
    it('should return the module name', async () => {
      const { program } = createProgram(tree, tree.root.path, buildPath);

      const spartacusFeaturesModule = program.getSourceFileOrThrow(
        cartBaseFeatureModulePath
      );

      const dynamicImports = collectDynamicImports(spartacusFeaturesModule);
      const result = getDynamicImportPropertyAccess(dynamicImports[0]);
      expect(result).toEqual('CartBaseModule');
    });
  });
});
