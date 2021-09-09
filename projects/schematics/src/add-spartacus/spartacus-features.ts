import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  SPARTACUS_CORE,
  SPARTACUS_FEATURES_MODULE,
  SPARTACUS_FEATURES_NG_MODULE,
  SPARTACUS_STOREFRONTLIB,
} from '../shared/constants';
import { addModuleImport } from '../shared/utils/new-module-utils';
import { createProgram, saveAndFormat } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';

/** Migration which ensures the spartacus features are being correctly set up */
export function setupSpartacusFeaturesModule(project: string): Rule {
  return (tree: Tree): Tree => {
    const { buildPaths } = getProjectTsConfigPaths(tree, project);

    if (!buildPaths.length) {
      throw new SchematicsException(
        `Could not find any tsconfig file. Cannot configure ${SPARTACUS_FEATURES_NG_MODULE}.`
      );
    }

    const basePath = process.cwd();
    for (const tsconfigPath of buildPaths) {
      configureSpartacusModules(tree, tsconfigPath, basePath);
    }
    return tree;
  };
}

function configureSpartacusModules(
  tree: Tree,
  tsconfigPath: string,
  basePath: string
): void {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

  for (const sourceFile of appSourceFiles) {
    if (
      sourceFile
        .getFilePath()
        .includes(`${SPARTACUS_FEATURES_MODULE}.module.ts`)
    ) {
      [
        `// Auth Core
        AuthModule.forRoot(),`,
        'LogoutModule,',
        'LoginRouteModule,',
      ].forEach((content) => {
        addModuleImport(sourceFile, {
          import: [
            {
              moduleSpecifier: SPARTACUS_CORE,
              namedImports: ['AuthModule'],
            },
            {
              moduleSpecifier: SPARTACUS_STOREFRONTLIB,
              namedImports: ['LogoutModule', 'LoginRouteModule'],
            },
          ],
          content,
        });
      });

      [
        `// Basic Cms Components
        HamburgerMenuModule,`,
        'SiteContextSelectorModule,',
        'LinkModule,',
        'BannerModule,',
        'CmsParagraphModule,',
        'TabParagraphContainerModule,',
        'BannerCarouselModule,',
        'CategoryNavigationModule,',
        'NavigationModule,',
        'FooterNavigationModule,',
        'BreadcrumbModule,',
      ].forEach((content) => {
        addModuleImport(sourceFile, {
          import: [
            {
              moduleSpecifier: SPARTACUS_STOREFRONTLIB,
              namedImports: [
                'HamburgerMenuModule',
                'SiteContextSelectorModule',
                'LinkModule',
                'BannerModule',
                'CmsParagraphModule',
                'TabParagraphContainerModule',
                'BannerCarouselModule',
                'CategoryNavigationModule',
                'FooterNavigationModule',
                'NavigationModule',
                'BreadcrumbModule',
              ],
            },
          ],
          content,
        });
      });

      [
        `// User Core,
        UserTransitional_4_2_Module,`,
        'UserOccTransitional_4_2_Module,',
        `// User UI,
        AddressBookModule,`,
        'PaymentMethodsModule,',
        'NotificationPreferenceModule,',
        'MyInterestsModule,',
        'StockNotificationModule,',
        'ConsentManagementModule,',
        'MyCouponsModule,',
      ].forEach((content) => {
        addModuleImport(sourceFile, {
          import: [
            {
              moduleSpecifier: SPARTACUS_CORE,
              namedImports: [
                'UserTransitional_4_2_Module',
                'UserOccTransitional_4_2_Module',
              ],
            },
            {
              moduleSpecifier: SPARTACUS_STOREFRONTLIB,
              namedImports: [
                'AddressBookModule',
                'PaymentMethodsModule',
                'NotificationPreferenceModule',
                'MyInterestsModule',
                'StockNotificationModule',
                'ConsentManagementModule',
                'MyCouponsModule',
              ],
            },
          ],
          content,
        });
      });

      [
        `// Anonymous Consents Core,
        AnonymousConsentsModule.forRoot(),`,
        `// Anonymous Consents UI,
        AnonymousConsentsDialogModule,`,
        'AnonymousConsentManagementBannerModule,',
      ].forEach((content) => {
        addModuleImport(sourceFile, {
          import: [
            {
              moduleSpecifier: SPARTACUS_CORE,
              namedImports: ['AnonymousConsentsModule'],
            },
            {
              moduleSpecifier: SPARTACUS_STOREFRONTLIB,
              namedImports: [
                'AnonymousConsentManagementBannerModule',
                'AnonymousConsentsDialogModule',
              ],
            },
          ],
          content,
        });
      });

      [
        `// Product Core,
        ProductModule.forRoot(),`,
        'ProductOccModule,',
        `// Product UI,
        ProductDetailsPageModule,`,
        'ProductListingPageModule,',
        'ProductListModule,',
        'SearchBoxModule,',
        'ProductFacetNavigationModule,',
        'ProductTabsModule,',
        'ProductCarouselModule,',
        'ProductReferencesModule,',
        'ProductImagesModule,',
        'ProductSummaryModule,',
        'ProductIntroModule,',
      ].forEach((content) => {
        addModuleImport(sourceFile, {
          import: [
            {
              moduleSpecifier: SPARTACUS_CORE,
              namedImports: ['ProductModule', 'ProductOccModule'],
            },
            {
              moduleSpecifier: SPARTACUS_STOREFRONTLIB,
              namedImports: [
                'ProductCarouselModule',
                'ProductDetailsPageModule',
                'ProductFacetNavigationModule',
                'ProductImagesModule',
                'ProductIntroModule',
                'ProductListingPageModule',
                'ProductListModule',
                'ProductPageEventModule',
                'ProductReferencesModule',
                'ProductSummaryModule',
                'ProductTabsModule',
                'SearchBoxModule',
              ],
            },
          ],
          content,
        });
      });

      [
        `// Cart Core,
        CartModule.forRoot(),`,
        'CartOccModule,',
        `// Cart UI,
        CartComponentModule,`,
        'WishListModule,',
      ].forEach((content) => {
        addModuleImport(sourceFile, {
          import: [
            {
              moduleSpecifier: SPARTACUS_CORE,
              namedImports: ['CartModule', 'CartOccModule'],
            },
            {
              moduleSpecifier: SPARTACUS_STOREFRONTLIB,
              namedImports: ['CartComponentModule', 'WishListModule'],
            },
          ],
          content,
        });
      });

      ['CostCenterOccModule,'].forEach((content) => {
        addModuleImport(sourceFile, {
          import: [
            {
              moduleSpecifier: SPARTACUS_CORE,
              namedImports: ['CostCenterOccModule'],
            },
          ],
          content,
        });
      });

      [
        `// Order,
        OrderOccModule`,
      ].forEach((content) => {
        addModuleImport(sourceFile, {
          import: [
            {
              moduleSpecifier: SPARTACUS_CORE,
              namedImports: ['OrderOccModule'],
            },
          ],
          content,
        });
      });

      [
        `// Page Events,
        NavigationEventModule,`,
        'HomePageEventModule,',
        'CartPageEventModule,',
        'ProductPageEventModule,',
      ].forEach((content) => {
        addModuleImport(sourceFile, {
          import: [
            {
              moduleSpecifier: SPARTACUS_STOREFRONTLIB,
              namedImports: [
                'NavigationEventModule',
                'HomePageEventModule',
                'CartPageEventModule',
                'ProductPageEventModule',
              ],
            },
          ],
          content,
        });
      });

      [
        `// External routes,
      ExternalRoutesModule.forRoot(),`,
      ].forEach((content) => {
        addModuleImport(sourceFile, {
          import: [
            {
              moduleSpecifier: SPARTACUS_CORE,
              namedImports: ['ExternalRoutesModule'],
            },
          ],
          content,
        });
      });

      saveAndFormat(sourceFile);

      break;
    }
  }
}
