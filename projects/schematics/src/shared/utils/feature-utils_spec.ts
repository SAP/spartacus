import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import { NGRX_STORE, UTF_8 } from '../constants';
import {
  CDS_FEATURE_NAME,
  CHECKOUT_B2B_FEATURE_NAME,
  CHECKOUT_BASE_FEATURE_NAME,
  CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME,
  DIGITAL_PAYMENTS_FEATURE_NAME,
  ORDER_FEATURE_NAME,
  SPARTACUS_CHECKOUT,
  SPARTACUS_SCHEMATICS,
  USER_ACCOUNT_FEATURE_NAME,
  USER_PROFILE_FEATURE_NAME,
} from '../libs-constants';
import {
  addFeatures,
  analyzeFeature,
  getDynamicallyImportedLocalSourceFile,
  orderFeatures,
} from './feature-utils';
import { collectDynamicImports } from './import-utils';
import { LibraryOptions } from './lib-utils';
import { addModuleImport, ensureModuleExists } from './new-module-utils';
import { createProgram } from './program';
import { getProjectTsConfigPaths } from './project-tsconfig-paths';
import {
  cdsFeatureModulePath,
  checkoutFeatureModulePath,
  checkoutWrapperModulePath,
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
          addFeatures(BASE_OPTIONS, [USER_ACCOUNT_FEATURE_NAME]),
          appTree
        )
        .toPromise();

      expect(
        appTree.read(userFeatureModulePath)?.toString(UTF_8)
      ).toMatchSnapshot();
    });
  });

  describe('analyzeFeature', () => {
    it(`should correctly analyze the Spartacus feature module`, async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...spartacusDefaultOptions,
            name: 'schematics-test',
            features: [CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME],
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
      expect(result.unrecognized).toEqual([]);
      expect(result.empty).toEqual([]);
    });

    it(`should correctly analyze the User feature module`, async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...spartacusDefaultOptions,
            name: 'schematics-test',
            features: [USER_PROFILE_FEATURE_NAME],
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
        USER_ACCOUNT_FEATURE_NAME,
        USER_PROFILE_FEATURE_NAME,
      ]);
      expect(result.unrecognized).toEqual([]);
    });

    it(`should correctly analyze the CDS' forRoot() feature module`, async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...spartacusDefaultOptions,
            name: 'schematics-test',
            features: [CDS_FEATURE_NAME],
          },
          appTree
        )
        .toPromise();

      const { program } = createProgram(appTree, appTree.root.path, buildPath);

      const spartacusCdsModule =
        program.getSourceFileOrThrow(cdsFeatureModulePath);
      const result = analyzeFeature(spartacusCdsModule);

      expect(result.core).toEqual([]);
      expect(result.features?.map((f) => f.feature)).toEqual([
        CDS_FEATURE_NAME,
      ]);
      expect(result.unrecognized).toEqual([]);
    });

    describe(`when an unrecognized module is found in the spartacus features module`, () => {
      it(`should stop the analysis`, async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...spartacusDefaultOptions,
              name: 'schematics-test',
              features: [CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME],
            },
            appTree
          )
          .toPromise();

        const { program } = createProgram(
          appTree,
          appTree.root.path,
          buildPath
        );

        const spartacusFeatureModule = program.getSourceFileOrThrow(
          spartacusFeaturesModulePath
        );
        addModuleImport(spartacusFeatureModule, {
          import: {
            moduleSpecifier: NGRX_STORE,
            namedImports: ['StoreModule'],
          },
          content: 'StoreModule',
        });

        const result = analyzeFeature(spartacusFeatureModule);
        expect(result.unrecognized).toEqual(['StoreModule']);
      });
    });

    describe(`when an unrecognized module is found in a feature module's imports`, () => {
      it(`should stop the analysis`, async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...spartacusDefaultOptions,
              name: 'schematics-test',
              features: [CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME],
            },
            appTree
          )
          .toPromise();

        const { program } = createProgram(
          appTree,
          appTree.root.path,
          buildPath
        );

        const spartacusUserModule = program.getSourceFileOrThrow(
          userFeatureModulePath
        );
        addModuleImport(spartacusUserModule, {
          import: {
            moduleSpecifier: NGRX_STORE,
            namedImports: ['StoreModule'],
          },
          content: 'StoreModule',
        });

        const spartacusFeatureModule = program.getSourceFileOrThrow(
          spartacusFeaturesModulePath
        );

        const result = analyzeFeature(spartacusFeatureModule);
        expect(result.unrecognized).toEqual(['UserFeatureModule']);
      });
    });

    describe(`when a custom feature module is found in spartacus feature module's imports`, () => {
      describe(`and it doesn't have any imports in it`, () => {
        it(`should still perform the analysis`, async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              {
                ...spartacusDefaultOptions,
                name: 'schematics-test',
                features: [
                  CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME,
                  DIGITAL_PAYMENTS_FEATURE_NAME,
                ],
              },
              appTree
            )
            .toPromise();

          const { program } = createProgram(
            appTree,
            appTree.root.path,
            buildPath
          );

          const spartacusFeatureModule = program.getSourceFileOrThrow(
            spartacusFeaturesModulePath
          );

          const result = analyzeFeature(spartacusFeatureModule);
          expect(result.unrecognized).toEqual([]);
        });
      });

      describe(`and it contains some unrecognized modules`, () => {
        it(`should stop the analysis`, async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              {
                ...spartacusDefaultOptions,
                name: 'schematics-test',
                features: [CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME],
              },
              appTree
            )
            .toPromise();
          appTree = await schematicRunner
            .callRule(
              ensureModuleExists({
                name: 'xxx',
                path: 'app/spartacus',
                project: spartacusDefaultOptions.project,
                module: 'spartacus-features',
              }),
              appTree
            )
            .toPromise();

          const { program } = createProgram(
            appTree,
            appTree.root.path,
            buildPath
          );

          const customFeatureModule = program.getSourceFileOrThrow(
            'src/app/spartacus/xxx.module.ts'
          );
          addModuleImport(customFeatureModule, {
            import: {
              moduleSpecifier: NGRX_STORE,
              namedImports: ['StoreModule'],
            },
            content: 'StoreModule',
          });
          const spartacusFeatureModule = program.getSourceFileOrThrow(
            spartacusFeaturesModulePath
          );

          const result = analyzeFeature(spartacusFeatureModule);
          expect(result.unrecognized).toEqual(['XxxModule']);
        });
      });
    });
  });

  describe('orderFeatures', () => {
    it('should sort the spartacus feature module imports correctly', async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...spartacusDefaultOptions,
            name: 'schematics-test',
            features: [CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME],
          },
          appTree
        )
        .toPromise();
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...spartacusDefaultOptions,
            name: 'schematics-test',
            features: [DIGITAL_PAYMENTS_FEATURE_NAME],
          },
          appTree
        )
        .toPromise();

      const { program } = createProgram(appTree, appTree.root.path, buildPath);
      const spartacusFeaturesModule = program.getSourceFileOrThrow(
        spartacusFeaturesModulePath
      );

      const analysis = analyzeFeature(spartacusFeaturesModule);
      const result = orderFeatures(analysis);
      expect(result).toMatchInlineSnapshot(`
        Array [
          "AuthModule.forRoot()",
          "LogoutModule",
          "LoginRouteModule",
          "HamburgerMenuModule",
          "SiteContextSelectorModule",
          "LinkModule",
          "BannerModule",
          "CmsParagraphModule",
          "TabParagraphContainerModule",
          "BannerCarouselModule",
          "CategoryNavigationModule",
          "NavigationModule",
          "FooterNavigationModule",
          "BreadcrumbModule",
          "ScrollToTopModule",
          "PageTitleModule",
          "UserModule",
          "UserOccModule",
          "AddressBookModule",
          "PaymentMethodsModule",
          "NotificationPreferenceModule",
          "MyInterestsModule",
          "StockNotificationModule",
          "ConsentManagementModule",
          "MyCouponsModule",
          "AnonymousConsentsModule.forRoot()",
          "AnonymousConsentsDialogModule",
          "AnonymousConsentManagementBannerModule",
          "ProductModule.forRoot()",
          "ProductOccModule",
          "ProductDetailsPageModule",
          "ProductListingPageModule",
          "ProductListModule",
          "SearchBoxModule",
          "ProductFacetNavigationModule",
          "ProductTabsModule",
          "ProductCarouselModule",
          "ProductReferencesModule",
          "ProductImagesModule",
          "ProductSummaryModule",
          "ProductIntroModule",
          "CostCenterOccModule",
          "NavigationEventModule",
          "HomePageEventModule",
          "ProductPageEventModule",
          "ExternalRoutesModule.forRoot()",
          "UserFeatureModule",
          "CartBaseFeatureModule",
          "OrderFeatureModule",
          "CheckoutFeatureModule",
          "DigitalPaymentsFeatureModule",
        ]
      `);
    });

    it('should sort the checkout wrapper module imports correctly', async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...spartacusDefaultOptions,
            name: 'schematics-test',
            features: [
              CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME,
              DIGITAL_PAYMENTS_FEATURE_NAME,
            ],
          },
          appTree
        )
        .toPromise();

      const { program } = createProgram(appTree, appTree.root.path, buildPath);
      const checkoutWrapperModule = program.getSourceFileOrThrow(
        checkoutWrapperModulePath
      );

      const analysis = analyzeFeature(checkoutWrapperModule);
      const result = orderFeatures(analysis);
      expect(result).toMatchInlineSnapshot(`
        Array [
          "CheckoutModule",
          "CheckoutB2BModule",
          "CheckoutScheduledReplenishmentModule",
          "DigitalPaymentsModule",
        ]
      `);
    });
  });

  describe('getDynamicallyImportedLocalSourceFile', () => {
    it('should return falsy if not local import', async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...spartacusDefaultOptions,
            name: 'schematics-test',
            features: [USER_ACCOUNT_FEATURE_NAME],
          },
          appTree
        )
        .toPromise();

      const { program } = createProgram(appTree, appTree.root.path, buildPath);
      const userFeatureModule = program.getSourceFileOrThrow(
        userFeatureModulePath
      );
      const dynamicImport = collectDynamicImports(userFeatureModule)[0];

      const result = getDynamicallyImportedLocalSourceFile(dynamicImport);
      expect(result).toBeFalsy();
    });

    it('should return the locally referenced source file', async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          {
            ...spartacusDefaultOptions,
            name: 'schematics-test',
            features: [CHECKOUT_B2B_FEATURE_NAME],
          },
          appTree
        )
        .toPromise();

      const { program } = createProgram(appTree, appTree.root.path, buildPath);
      const checkoutFeatureModule = program.getSourceFileOrThrow(
        checkoutFeatureModulePath
      );
      const dynamicImport = collectDynamicImports(checkoutFeatureModule)[0];

      const result = getDynamicallyImportedLocalSourceFile(dynamicImport);
      expect(result?.print()).toMatchSnapshot();
    });
  });

  describe('analyzeApplication', () => {
    describe('dependent features check', () => {
      it('should throw when a feature is not configured during dirty installation', async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...spartacusDefaultOptions,
              name: 'schematics-test',
              features: [CHECKOUT_BASE_FEATURE_NAME],
            },
            appTree
          )
          .toPromise();
        try {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              {
                ...spartacusDefaultOptions,
                name: 'schematics-test',
                features: [CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME],
              },
              appTree
            )
            .toPromise();
        } catch (e) {
          expect(e).toBeTruthy();
        }
      });

      it('should throw when a feature is not configured, but library is present in package.json', async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...spartacusDefaultOptions,
              name: 'schematics-test',
              features: [ORDER_FEATURE_NAME],
            },
            appTree
          )
          .toPromise();

        const packageJson = JSON.parse(
          appTree.read('package.json')?.toString(UTF_8) ?? ''
        );
        packageJson.dependencies[SPARTACUS_CHECKOUT] = '9.9.9';
        appTree.overwrite('package.json', JSON.stringify(packageJson, null, 2));

        try {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              {
                ...spartacusDefaultOptions,
                name: 'schematics-test',
                features: [CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE_NAME],
              },
              appTree
            )
            .toPromise();
        } catch (e) {
          expect(e).toBeTruthy();
        }
      });

      it('should succeed when a feature is not configured, but package is missing in package.json during dirty installation', async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...spartacusDefaultOptions,
              name: 'schematics-test',
              features: [ORDER_FEATURE_NAME],
            },
            appTree
          )
          .toPromise();
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...spartacusDefaultOptions,
              name: 'schematics-test',
              features: [DIGITAL_PAYMENTS_FEATURE_NAME],
            },
            appTree
          )
          .toPromise();

        const { program } = createProgram(
          appTree,
          appTree.root.path,
          buildPath
        );
        const checkoutWrapperModule = program.getSourceFileOrThrow(
          checkoutWrapperModulePath
        );
        const checkoutFeatureModule = program.getSourceFileOrThrow(
          checkoutFeatureModulePath
        );
        expect(checkoutWrapperModule.print()).toMatchSnapshot();
        expect(checkoutFeatureModule.print()).toMatchSnapshot();
      });

      describe('when the dependent feature is eagerly configured', () => {
        it('should succeed', async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              {
                ...spartacusDefaultOptions,
                name: 'schematics-test',
                features: [CHECKOUT_BASE_FEATURE_NAME],
                lazy: false,
              },
              appTree
            )
            .toPromise();
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              {
                ...spartacusDefaultOptions,
                name: 'schematics-test',
                features: [DIGITAL_PAYMENTS_FEATURE_NAME],
              },
              appTree
            )
            .toPromise();

          const { program } = createProgram(
            appTree,
            appTree.root.path,
            buildPath
          );
          const checkoutFeatureModule = program.getSourceFileOrThrow(
            checkoutFeatureModulePath
          );
          expect(checkoutFeatureModule.print()).toMatchSnapshot();
        });
      });
      describe('when the dependent feature is lazily configured', () => {
        it('should succeed', async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              {
                ...spartacusDefaultOptions,
                name: 'schematics-test',
                features: [CHECKOUT_BASE_FEATURE_NAME],
              },
              appTree
            )
            .toPromise();
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              {
                ...spartacusDefaultOptions,
                name: 'schematics-test',
                features: [DIGITAL_PAYMENTS_FEATURE_NAME],
              },
              appTree
            )
            .toPromise();

          const { program } = createProgram(
            appTree,
            appTree.root.path,
            buildPath
          );
          const checkoutWrapperModule = program.getSourceFileOrThrow(
            checkoutWrapperModulePath
          );
          const checkoutFeatureModule = program.getSourceFileOrThrow(
            checkoutFeatureModulePath
          );
          expect(checkoutWrapperModule.print()).toMatchSnapshot();
          expect(checkoutFeatureModule.print()).toMatchSnapshot();
        });
      });
    });
  });
});
