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
import {
  CLI_CART_BASE_FEATURE,
  CLI_CDC_FEATURE,
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
  CLI_DIGITAL_PAYMENTS_FEATURE,
} from '../shared/libs-constants';
import { LibraryOptions } from '../shared/utils/lib-utils';
import { createProgram } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import {
  cartBaseFeatureModulePath,
  cdcFeatureModulePath,
  checkoutFeatureModulePath,
  checkoutWrapperModulePath,
  digitalPaymentsFeatureModulePath,
  spartacusFeaturesModulePath,
  userFeatureModulePath,
  userWrapperModulePath,
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

    buildPath = getProjectTsConfigPaths(appTree, BASE_OPTIONS.project)
      .buildPaths[0];
  });

  describe('One dynamic import in the file', () => {
    it('should generate appropriate feature module', async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...defaultOptions,
            features: [CLI_CHECKOUT_BASE_FEATURE],
            name: 'schematics-test',
          },
          appTree
        )
        .toPromise();

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
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...defaultOptions,
            features: [CLI_CART_BASE_FEATURE],
            name: 'schematics-test',
          },
          appTree
        )
        .toPromise();
      const options: SpartacusWrapperOptions = {
        project: 'schematics-test',
        markerModuleName: CART_BASE_MODULE,
        featureModuleName: CART_BASE_MODULE,
      };
      appTree = await schematicRunner
        .runSchematicAsync('wrapper-module', options, appTree)
        .toPromise();

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const cartFeatureModule = program.getSourceFileOrThrow(
        cartBaseFeatureModulePath
      );
      const cartWrapperModule = program.getSourceFileOrThrow(
        'src/app/spartacus/features/cart/cart-base-wrapper.module.ts'
      );

      expect(cartFeatureModule.print()).toMatchSnapshot();
      expect(cartWrapperModule.print()).toMatchSnapshot();
    });
  });

  describe('Double execution', () => {
    it('should not change anything', async () => {
      // first execution happens under the hood
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...defaultOptions,
            features: [CLI_CHECKOUT_BASE_FEATURE],
            name: 'schematics-test',
          },
          appTree
        )
        .toPromise();

      const options: SpartacusWrapperOptions = {
        project: 'schematics-test',
        markerModuleName: CHECKOUT_BASE_MODULE,
        featureModuleName: CHECKOUT_BASE_MODULE,
      };
      // the second execution
      appTree = await schematicRunner
        .runSchematicAsync('wrapper-module', options, appTree)
        .toPromise();

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
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...defaultOptions,
            name: 'schematics-test',
            features: [CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE],
          },
          appTree
        )
        .toPromise();

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
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...defaultOptions,
            name: 'schematics-test',
            features: [CLI_DIGITAL_PAYMENTS_FEATURE],
          },
          appTree
        )
        .toPromise();

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

  describe('CDC', () => {
    it('should create the User wrapper module and import User Profile and CDC', async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...defaultOptions,
            name: 'schematics-test',
            features: [CLI_CDC_FEATURE],
          },
          appTree
        )
        .toPromise();

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const userWrapperModule = program.getSourceFileOrThrow(
        userWrapperModulePath
      );
      const userFeatureModule = program.getSourceFileOrThrow(
        userFeatureModulePath
      );
      const cdcFeaturesModule =
        program.getSourceFileOrThrow(cdcFeatureModulePath);

      expect(userWrapperModule.print()).toMatchSnapshot();
      expect(userFeatureModule.print()).toMatchSnapshot();
      expect(cdcFeaturesModule.print()).toMatchSnapshot();
    });
  });

  // TODO:#schematics - will make the snapshots update once the ordering happens in the wrapper module
  describe('DP and Checkout', () => {
    it('Should order the imports in the wrapper and Spartacus features modules', async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...defaultOptions,
            name: 'schematics-test',
            features: [CLI_DIGITAL_PAYMENTS_FEATURE],
          },
          appTree
        )
        .toPromise();

      let { program } = createProgram(appTree, appTree.root.path, buildPath);

      let spartacusFeaturesModule = program.getSourceFileOrThrow(
        spartacusFeaturesModulePath
      );
      let checkoutFeatureModule = program.getSourceFileOrThrow(
        checkoutFeatureModulePath
      );
      let checkoutWrapperModule = program.getSourceFileOrThrow(
        checkoutWrapperModulePath
      );
      let dpFeaturesModule = program.getSourceFileOrThrow(
        digitalPaymentsFeatureModulePath
      );
      expect(spartacusFeaturesModule.print()).toMatchSnapshot();
      expect(checkoutFeatureModule.print()).toMatchSnapshot();
      expect(checkoutWrapperModule.print()).toMatchSnapshot();
      expect(dpFeaturesModule.print()).toMatchSnapshot();

      // add b2b and repl features after the DP
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...defaultOptions,
            name: 'schematics-test',
            features: [CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE],
          },
          appTree
        )
        .toPromise();

      program = createProgram(appTree, appTree.root.path, buildPath).program;

      spartacusFeaturesModule = program.getSourceFileOrThrow(
        spartacusFeaturesModulePath
      );
      checkoutFeatureModule = program.getSourceFileOrThrow(
        checkoutFeatureModulePath
      );
      checkoutWrapperModule = program.getSourceFileOrThrow(
        checkoutWrapperModulePath
      );
      dpFeaturesModule = program.getSourceFileOrThrow(
        digitalPaymentsFeatureModulePath
      );
      expect(spartacusFeaturesModule.print()).toMatchSnapshot();
      expect(checkoutFeatureModule.print()).toMatchSnapshot();
      expect(checkoutWrapperModule.print()).toMatchSnapshot();
      expect(dpFeaturesModule.print()).toMatchSnapshot();
    });
  });
});
