import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
  UserService,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms-structure/page/page-layout/page-layout.component';
import { IconModule } from '../../misc/icon/icon.module';
import { ConfigAddToCartButtonComponent } from '../commons/config-add-to-cart-button/config-add-to-cart-button.component';
import { ConfigOverviewAttributeComponent } from '../commons/config-overview-attribute/config-overview-attribute.component';
import { ConfigOverviewFormComponent } from '../commons/config-overview-form/config-overview-form.component';
import { ConfigPriceSummaryComponent } from '../commons/config-price-summary/config-price-summary.component';
import { ConfigTabBarComponent } from '../commons/config-tab-bar/config-tab-bar.component';
import { ConfigTitleComponent } from '../commons/config-title/config-title.component';
import { ConfigureProductModule } from '../commons/configure-product/configure-product.module';
import { VariantConfiguratorModule } from './variant-configurator.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigureProductModule,
    VariantConfiguratorModule,
    RouterModule.forChild([
      {
        path: 'configureOverviewCPQCONFIGURATOR/:ownerType',
        children: [
          {
            path: 'entityKey/:entityKey',
            component: PageLayoutComponent,
            data: { pageLabel: '/configureOverviewCPQCONFIGURATOR' },
          },
        ],
        canActivate: [CmsPageGuard],
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationTabBar: {
          component: ConfigTabBarComponent,
          guards: [],
        },
        VariantConfigurationOverviewTitle: {
          component: ConfigTitleComponent,
          guards: [],
        },
        VariantConfigurationOverview: {
          component: ConfigOverviewFormComponent,
          guards: [],
        },
        VariantConfigurationPriceSummary: {
          component: ConfigPriceSummaryComponent,
          guards: [],
        },
        VariantConfigurationAddToCartButton: {
          component: ConfigAddToCartButtonComponent,
          guards: [],
        },
      },
      layoutSlots: {
        VariantConfigurationOverviewTemplate: {
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
              slots: ['SiteLogin', 'SiteContext', 'SiteLinks'],
            },
          },

          md: {
            slots: [
              'VariantConfigOverviewHeader',
              'VariantConfigOverviewContent',
              'VariantConfigOverviewBottombar',
            ],
          },
          xs: {
            slots: [
              'VariantConfigOverviewHeader',
              'VariantConfigOverviewContent',
              'VariantConfigOverviewBottombar',
            ],
          },
        },
      },
    }),

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    IconModule,
  ],

  declarations: [ConfigOverviewFormComponent, ConfigOverviewAttributeComponent],
  exports: [ConfigOverviewFormComponent, ConfigOverviewAttributeComponent],
  providers: [UserService],
  entryComponents: [
    ConfigOverviewFormComponent,
    ConfigOverviewAttributeComponent,
  ],
})
export class VariantConfiguratorOverviewModule {}
