import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { CART_BASE_MODULE } from '../shared/lib-configs/cart-schematics-config';
import { CHECKOUT_BASE_MODULE } from '../shared/lib-configs/checkout-schematics-config';
import { CLI_CHECKOUT_BASE_FEATURE } from '../shared/libs-constants';
import { LibraryOptions } from '../shared/utils/lib-utils';
import { createProgram } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import {
  cartBaseFeatureModulePath,
  checkoutFeatureModulePath,
  checkoutWrapperModulePath,
} from '../shared/utils/test-utils';
import { Schema as SpartacusWrapperOptions } from '../wrapper-module/schema';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus Wrapper Module Schematics: ng g @spartacus/schematics:wrapper-module', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

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

  const defaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_CHECKOUT_BASE_FEATURE],
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
        'ng-add',
        { ...defaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();

    buildPath = getProjectTsConfigPaths(appTree, BASE_OPTIONS.project)
      .buildPaths[0];
  });

  describe('Checkout - One dynamic import in the file', () => {
    it('should generate appropriate feature module', async () => {
      const checkoutOptions: SpartacusWrapperOptions = {
        project: 'schematics-test',
        featureModuleName: CHECKOUT_BASE_MODULE,
      };
      appTree = await schematicRunner
        .runSchematicAsync('wrapper-module', checkoutOptions, appTree)
        .toPromise();

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const checkoutFeaturesModule = program.getSourceFileOrThrow(
        checkoutFeatureModulePath
      );
      const checkoutWrapperModule = program.getSourceFileOrThrow(
        checkoutWrapperModulePath
      );

      expect(checkoutFeaturesModule.print()).toMatchSnapshot();
      expect(checkoutWrapperModule.print()).toMatchSnapshot();
    });
  });

  describe('Cart - multiple dynamic imports in the file', () => {
    it('should generate appropriate feature module', async () => {
      const checkoutOptions: SpartacusWrapperOptions = {
        project: 'schematics-test',
        featureModuleName: CART_BASE_MODULE,
      };
      appTree = await schematicRunner
        .runSchematicAsync('wrapper-module', checkoutOptions, appTree)
        .toPromise();

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const cartFeaturesModule = program.getSourceFileOrThrow(
        cartBaseFeatureModulePath
      );
      const cartWrapperModule = program.getSourceFileOrThrow(
        'src/app/spartacus/features/cart/cart-base-wrapper.module.ts'
      );

      expect(cartFeaturesModule.print()).toMatchSnapshot();
      expect(cartWrapperModule.print()).toMatchSnapshot();
    });
  });

  describe('double execution', () => {
    it('should not change anything', async () => {
      const checkoutOptions: SpartacusWrapperOptions = {
        project: 'schematics-test',
        featureModuleName: 'CheckoutModule',
      };
      appTree = await schematicRunner
        .runSchematicAsync('wrapper-module', checkoutOptions, appTree)
        .toPromise();
      appTree = await schematicRunner
        .runSchematicAsync('wrapper-module', checkoutOptions, appTree)
        .toPromise();

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const checkoutFeaturesModule = program.getSourceFileOrThrow(
        checkoutFeatureModulePath
      );
      const checkoutWrapperModule = program.getSourceFileOrThrow(
        checkoutWrapperModulePath
      );

      expect(checkoutFeaturesModule.print()).toMatchSnapshot();
      expect(checkoutWrapperModule.print()).toMatchSnapshot();
    });
  });
});
