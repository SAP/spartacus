import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { SyntaxKind } from 'ts-morph';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { CART_BASE_MODULE } from '../shared/lib-configs/cart-schematics-config';
import { CHECKOUT_BASE_MODULE } from '../shared/lib-configs/checkout-schematics-config';
import {
  CART_BASE_FEATURE_NAME,
  CHECKOUT_B2B_FEATURE_NAME,
  CHECKOUT_BASE_FEATURE_NAME,
  CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME,
  DIGITAL_PAYMENTS_FEATURE_NAME,
  SPARTACUS_CHECKOUT_BASE,
  SPARTACUS_SCHEMATICS,
} from '../shared/libs-constants';
import { findDynamicImport } from '../shared/utils/import-utils';
import { LibraryOptions } from '../shared/utils/lib-utils';
import { Import, addModuleImport } from '../shared/utils/new-module-utils';
import { createProgram, saveAndFormat } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import {
  cartBaseFeatureModulePath,
  cartBaseWrapperModulePath,
  checkoutFeatureModulePath,
  checkoutWrapperModulePath,
  digitalPaymentsFeatureModulePath,
  spartacusFeaturesModulePath,
} from '../shared/utils/test-utils';
import { Schema as SpartacusWrapperOptions } from '../wrapper-module/schema';
import { cleanupConfig } from './index';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus Wrapper Module Schematics: ng g @spartacus/schematics:wrapper-module', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
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
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
    standalone: false,
  };

  const defaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const BASE_OPTIONS: LibraryOptions = {
    project: 'schematics-test',
    lazy: true,
  };

  beforeEach(async () => {
    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );

    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      appTree
    );

    buildPath = getProjectTsConfigPaths(appTree, BASE_OPTIONS.project)
      .buildPaths[0];
  });

  describe('One dynamic import in the file', () => {
    it('should generate appropriate feature module', async () => {
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        {
          ...defaultOptions,
          features: [CHECKOUT_B2B_FEATURE_NAME],
          name: 'schematics-test',
        },
        appTree
      );

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const checkoutFeatureModule = program.getSourceFileOrThrow(
        checkoutFeatureModulePath
      );
      const checkoutWrapperModule = program.getSourceFileOrThrow(
        checkoutWrapperModulePath
      );

      expect(checkoutFeatureModule.print()).toMatchSnapshot();
      expect(checkoutWrapperModule.print()).toMatchSnapshot();
    });
  });

  describe('Multiple dynamic imports in the file', () => {
    it('should generate appropriate feature module', async () => {
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        {
          ...defaultOptions,
          features: [CART_BASE_FEATURE_NAME],
          name: 'schematics-test',
        },
        appTree
      );

      const options: SpartacusWrapperOptions = {
        project: 'schematics-test',
        markerModuleName: CART_BASE_MODULE,
        featureModuleName: CART_BASE_MODULE,
      };
      appTree = await schematicRunner.runSchematic(
        'wrapper-module',
        options,
        appTree
      );

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const cartFeatureModule = program.getSourceFileOrThrow(
        cartBaseFeatureModulePath
      );
      const cartWrapperModule = program.getSourceFileOrThrow(
        cartBaseWrapperModulePath
      );

      expect(cartFeatureModule.print()).toMatchSnapshot();
      expect(cartWrapperModule.print()).toMatchSnapshot();
    });
  });

  describe('Double execution', () => {
    it('should not change anything', async () => {
      // first execution happens under the hood
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        {
          ...defaultOptions,
          features: [CHECKOUT_BASE_FEATURE_NAME],
          name: 'schematics-test',
        },
        appTree
      );

      const options: SpartacusWrapperOptions = {
        project: 'schematics-test',
        markerModuleName: CHECKOUT_BASE_MODULE,
        featureModuleName: CHECKOUT_BASE_MODULE,
      };
      // the second execution
      appTree = await schematicRunner.runSchematic(
        'wrapper-module',
        options,
        appTree
      );

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const checkoutFeatureModule = program.getSourceFileOrThrow(
        checkoutFeatureModulePath
      );
      const checkoutWrapperModule = program.getSourceFileOrThrow(
        checkoutWrapperModulePath
      );

      expect(checkoutFeatureModule.print()).toMatchSnapshot();
      expect(checkoutWrapperModule.print()).toMatchSnapshot();
    });
  });

  describe('Checkout Scheduled Replenishment', () => {
    it('should create the checkout wrapper module and import Checkout features', async () => {
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        {
          ...defaultOptions,
          name: 'schematics-test',
          features: [CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME],
        },
        appTree
      );

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const checkoutFeatureModule = program.getSourceFileOrThrow(
        checkoutFeatureModulePath
      );
      const checkoutWrapperModule = program.getSourceFileOrThrow(
        checkoutWrapperModulePath
      );

      expect(checkoutFeatureModule.print()).toMatchSnapshot();
      expect(checkoutWrapperModule.print()).toMatchSnapshot();
    });
  });

  describe('Digital Payments', () => {
    it('should create the checkout wrapper module and import Base Checkout and DP', async () => {
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        {
          ...defaultOptions,
          name: 'schematics-test',
          features: [DIGITAL_PAYMENTS_FEATURE_NAME],
        },
        appTree
      );

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const checkoutWrapperModule = program.getSourceFileOrThrow(
        checkoutWrapperModulePath
      );
      const checkoutFeatureModule = program.getSourceFileOrThrow(
        checkoutFeatureModulePath
      );
      const dpFeaturesModule = program.getSourceFileOrThrow(
        digitalPaymentsFeatureModulePath
      );

      expect(checkoutWrapperModule.print()).toMatchSnapshot();
      expect(checkoutFeatureModule.print()).toMatchSnapshot();
      expect(dpFeaturesModule.print()).toMatchSnapshot();
    });
  });

  describe('Checkout and DP', () => {
    let program: any;

    beforeEach(async () => {
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        {
          ...defaultOptions,
          name: 'schematics-test',
          features: [
            CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME,
            DIGITAL_PAYMENTS_FEATURE_NAME,
          ],
        },
        appTree
      );

      program = createProgram(appTree, appTree.root.path, buildPath).program;
    });

    it('Should order the imports in the Spartacus features module - DP after checkout', async () => {
      const spartacusFeaturesModule = program.getSourceFileOrThrow(
        spartacusFeaturesModulePath
      );

      const spartacusFeaturesModuleContent = spartacusFeaturesModule.getText();
      const importsArrayStart =
        spartacusFeaturesModuleContent.indexOf('imports: [');

      const checkoutFeatureModuleIndex = spartacusFeaturesModuleContent.indexOf(
        'CheckoutFeatureModule',
        importsArrayStart
      );
      const dpFeatureModuleIndex = spartacusFeaturesModuleContent.indexOf(
        'DigitalPaymentsFeatureModule',
        importsArrayStart
      );
      expect(checkoutFeatureModuleIndex).toBeLessThan(dpFeatureModuleIndex);
    });

    it('Should order the imports in the wrapper module - DP after Checkout', async () => {
      const checkoutWrapperModule = program.getSourceFileOrThrow(
        checkoutWrapperModulePath
      );

      expect(checkoutWrapperModule.print()).toMatchSnapshot();
    });

    it('Should create DP feature module', async () => {
      const dpFeaturesModule = program.getSourceFileOrThrow(
        digitalPaymentsFeatureModulePath
      );

      expect(dpFeaturesModule.print()).toMatchSnapshot();
    });

    it('Should create checkout feature module', async () => {
      const checkoutFeatureModule = program.getSourceFileOrThrow(
        checkoutFeatureModulePath
      );

      expect(checkoutFeatureModule.print()).toMatchSnapshot();
    });
  });

  describe('wrapper module already exists', () => {
    beforeEach(async () => {
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        {
          ...defaultOptions,
          name: 'schematics-test',
          features: [CHECKOUT_BASE_FEATURE_NAME],
        },
        appTree
      );

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const spartacusFeaturesModule = program.getSourceFileOrThrow(
        spartacusFeaturesModulePath
      );
      const checkoutImport: Import = {
        moduleSpecifier: SPARTACUS_CHECKOUT_BASE,
        namedImports: [CHECKOUT_BASE_MODULE],
      };
      // import CheckoutModule statically, making the spartacus-features module a wrapper module
      addModuleImport(spartacusFeaturesModule, {
        import: checkoutImport,
        content: CHECKOUT_BASE_MODULE,
      });
      saveAndFormat(spartacusFeaturesModule);

      const checkoutFeatureModule = program.getSourceFileOrThrow(
        checkoutFeatureModulePath
      );
      const spartacusProvider = findDynamicImport(
        checkoutFeatureModule,
        checkoutImport
      )?.getFirstAncestorByKindOrThrow(SyntaxKind.CallExpression);
      if (!spartacusProvider) {
        throw new Error('Could not find the spartacus provider');
      }
      // remove the dynamic import
      cleanupConfig(spartacusProvider);
      saveAndFormat(checkoutFeatureModule);

      appTree = await schematicRunner.runSchematic(
        'ng-add',
        {
          ...defaultOptions,
          name: 'schematics-test',
          features: [DIGITAL_PAYMENTS_FEATURE_NAME],
        },
        appTree
      );
    });

    it('should append the feature module after it, and not add a dynamic import to the feature module', () => {
      const { program } = createProgram(appTree, appTree.root.path, buildPath);
      const checkoutFeatureModule = program.getSourceFileOrThrow(
        checkoutFeatureModulePath
      );
      expect(program.getSourceFile(checkoutWrapperModulePath)).toBeFalsy();
      expect(checkoutFeatureModule.print()).toMatchSnapshot();
    });

    it('Should order the imports in the Spartacus features module - DP after checkout', async () => {
      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const spartacusFeaturesModule = program.getSourceFileOrThrow(
        spartacusFeaturesModulePath
      );

      const spartacusFeaturesModuleContent = spartacusFeaturesModule.getText();
      const importsArrayStart =
        spartacusFeaturesModuleContent.indexOf('imports: [');

      const checkoutFeatureModuleIndex = spartacusFeaturesModuleContent.indexOf(
        'CheckoutFeatureModule',
        importsArrayStart
      );
      const dpFeatureModuleIndex = spartacusFeaturesModuleContent.indexOf(
        'DigitalPaymentsFeatureModule',
        importsArrayStart
      );
      expect(checkoutFeatureModuleIndex).toBeLessThan(dpFeatureModuleIndex);
    });
  });
});
