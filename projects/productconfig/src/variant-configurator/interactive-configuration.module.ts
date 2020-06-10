import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  Config,
  ConfigModule,
  I18nModule,
  ProductModule,
  UrlModule,
  UserService,
} from '@spartacus/core';
import {
  CmsPageGuard,
  ConfigAddToCartButtonComponent,
  ConfigFormComponent,
  ConfigGroupMenuComponent,
  ConfigGroupTitleComponent,
  ConfigPreviousNextButtonsComponent,
  ConfigPriceSummaryComponent,
  ConfigProductTitleComponent,
  ConfigTabBarComponent,
  ConfigurationMessageLoaderModule,
  DefaultMessageConfig,
  GenericConfiguratorModule,
  HamburgerMenuModule,
  IconModule,
  MessageConfig,
  PageLayoutComponent,
  SpinnerModule,
} from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    GenericConfiguratorModule,
    ProductModule,
    ConfigurationMessageLoaderModule,
    RouterModule.forChild([
      {
        path: 'configureCPQCONFIGURATOR/:ownerType/entityKey/:entityKey',
        data: { pageLabel: '/configureCPQCONFIGURATOR' },
        component: PageLayoutComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
    ConfigModule.withConfig(DefaultMessageConfig),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationTabBar: {
          component: ConfigTabBarComponent,
          guards: [],
        },
        VariantConfigurationTitle: {
          component: ConfigProductTitleComponent,
          guards: [],
        },
        VariantConfigurationGroupTitle: {
          component: ConfigGroupTitleComponent,
          guards: [],
        },
        VariantConfigurationForm: {
          component: ConfigFormComponent,
          guards: [],
        },
        VariantConfigurationMenu: {
          component: ConfigGroupMenuComponent,
          guards: [],
        },
        VariantConfigurationPriceSummary: {
          component: ConfigPriceSummaryComponent,
          guards: [],
        },
        VariantConfigurationPrevNext: {
          component: ConfigPreviousNextButtonsComponent,
          guards: [],
        },
        VariantConfigurationAddToCartButton: {
          component: ConfigAddToCartButtonComponent,
          guards: [],
        },
      },
      layoutSlots: {
        VariantConfigurationTemplate: {
          header: {
            md: {
              slots: [
                'PreHeader',
                'SiteContext',
                'SiteLinks',
                'SiteLogo',
                'SearchBox',
                'SiteLogin',
                'MiniCart',
              ],
            },
            xs: {
              slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
            },
          },

          navigation: {
            xs: {
              slots: [
                'SiteLogin',
                'SiteContext',
                'SiteLinks',
                'VariantConfigMenu',
              ],
            },
          },

          md: {
            slots: [
              'VariantConfigHeader',
              'VariantConfigMenu',
              'VariantConfigContent',
              'VariantConfigBottombar',
            ],
          },
          xs: {
            slots: [
              'VariantConfigHeader',
              'VariantConfigContent',
              'VariantConfigBottombar',
            ],
          },
        },
      },
    }),

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    UrlModule,
    HamburgerMenuModule,
    I18nModule,
    IconModule,
    SpinnerModule,
  ],

  declarations: [],
  exports: [],
  providers: [UserService, { provide: MessageConfig, useExisting: Config }],
  entryComponents: [],
})
export class InteractiveConfigurationModule {}
