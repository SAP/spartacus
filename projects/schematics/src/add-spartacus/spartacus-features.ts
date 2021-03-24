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
      addModuleImport(sourceFile, {
        // WHEN UPDATING THE IMPORTS LIST, DON'T FORGET TO UPDATE THE ACTUAL MODULE'S IMPORT ARRAY!
        import: [
          {
            moduleSpecifier: SPARTACUS_CORE,
            namedImports: [
              'AuthModule',
              'AnonymousConsentsModule',
              'AsmOccModule',
              'AuthModule',
              'CartModule',
              'CartOccModule',
              'CheckoutModule',
              'CheckoutOccModule',
              'CostCenterOccModule',
              'ProductModule',
              'ProductOccModule',
              'UserModule',
              'UserOccModule',
            ],
          },
          {
            moduleSpecifier: SPARTACUS_STOREFRONTLIB,
            namedImports: [
              'AddressBookModule',
              'AnonymousConsentManagementBannerModule',
              'AnonymousConsentsDialogModule',
              'AsmModule',
              'BannerCarouselModule',
              'BannerModule',
              'BreadcrumbModule',
              'CartComponentModule',
              'CartPageEventModule',
              'CategoryNavigationModule',
              'CheckoutComponentModule',
              'CloseAccountModule',
              'CmsParagraphModule',
              'ConsentManagementModule',
              'FooterNavigationModule',
              'ForgotPasswordModule',
              'HamburgerMenuModule',
              'HomePageEventModule',
              'LinkModule',
              'MyCouponsModule',
              'MyInterestsModule',
              'NavigationEventModule',
              'NavigationModule',
              'NotificationPreferenceModule',
              'OrderCancellationModule',
              'OrderConfirmationModule',
              'OrderDetailsModule',
              'OrderHistoryModule',
              'OrderReturnModule',
              'PaymentMethodsModule',
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
              'ProductVariantsModule',
              'ReplenishmentOrderConfirmationModule',
              'ReplenishmentOrderDetailsModule',
              'ReplenishmentOrderHistoryModule',
              'ResetPasswordModule',
              'ReturnRequestDetailModule',
              'ReturnRequestListModule',
              'SearchBoxModule',
              'SiteContextSelectorModule',
              'StockNotificationModule',
              'TabParagraphContainerModule',
              'UpdateEmailModule',
              'UpdatePasswordModule',
              'UpdateProfileModule',
              'UserComponentModule',
              'WishListModule',
            ],
          },
        ],
        content: `
        // Auth Core
        AuthModule.forRoot(),

        // Basic Cms Components
        HamburgerMenuModule,
        SiteContextSelectorModule,
        LinkModule,
        BannerModule,
        CmsParagraphModule,
        TabParagraphContainerModule,
        BannerCarouselModule,
        CategoryNavigationModule,
        NavigationModule,
        FooterNavigationModule,
        BreadcrumbModule,

        // User Core
        UserModule.forRoot(),
        UserOccModule,
        // User UI
        UserComponentModule,
        AddressBookModule,
        UpdateEmailModule,
        UpdatePasswordModule,
        UpdateProfileModule,
        CloseAccountModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        PaymentMethodsModule,
        NotificationPreferenceModule,
        MyInterestsModule,
        StockNotificationModule,
        ConsentManagementModule,
        MyCouponsModule,

        // Anonymous Consents Core
        AnonymousConsentsModule.forRoot(),
        // Anonymous Consents UI
        AnonymousConsentsDialogModule,
        AnonymousConsentManagementBannerModule,

        // Product Core
        ProductModule.forRoot(),
        ProductOccModule,

        // Product UI
        ProductDetailsPageModule,
        ProductListingPageModule,
        ProductListModule,
        SearchBoxModule,
        ProductFacetNavigationModule,
        ProductTabsModule,
        ProductCarouselModule,
        ProductReferencesModule,
        ProductImagesModule,
        ProductSummaryModule,
        ProductVariantsModule,
        ProductIntroModule,

        // Cart Core
        CartModule.forRoot(),
        CartOccModule,
        // Cart UI
        CartComponentModule,
        WishListModule,

        // Checkout Core
        CheckoutModule.forRoot(),
        CheckoutOccModule,
        CostCenterOccModule,
        // Checkout UI
        CheckoutComponentModule,
        OrderConfirmationModule,

        // Order
        OrderHistoryModule,
        OrderDetailsModule,
        OrderCancellationModule,
        OrderReturnModule,
        ReturnRequestListModule,
        ReturnRequestDetailModule,
        ReplenishmentOrderHistoryModule,
        ReplenishmentOrderDetailsModule,
        ReplenishmentOrderConfirmationModule,

        // Asm Core
        AsmOccModule,
        // Asm UI
        AsmModule,

        // Page Events
        NavigationEventModule,
        HomePageEventModule,
        CartPageEventModule,
        ProductPageEventModule,
        `,
      });

      saveAndFormat(sourceFile);

      break;
    }
  }
}
