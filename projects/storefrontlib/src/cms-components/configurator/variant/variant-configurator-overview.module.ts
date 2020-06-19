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
import { GenericConfiguratorModule } from '../generic/generic-configurator.module';
import { VariantConfiguratorModule } from './variant-configurator.module';
import { ConfigOverviewLoadingComponent } from '../commons/config-overview-loading/config-overview-loading.component';

@NgModule({
  imports: [
    CommonModule,
    GenericConfiguratorModule,
    VariantConfiguratorModule,
    RouterModule.forChild([
      {
        path:
          'configureOverviewCPQCONFIGURATOR/:ownerType/entityKey/:entityKey/displayOnly/:displayOnly',
        component: PageLayoutComponent,
        data: { pageLabel: '/configureOverviewCPQCONFIGURATOR' },
        canActivate: [CmsPageGuard],
      },
      {
        path:
          'configureOverviewCPQCONFIGURATOR/:ownerType/entityKey/:entityKey',
        component: PageLayoutComponent,
        data: { pageLabel: '/configureOverviewCPQCONFIGURATOR' },
        canActivate: [CmsPageGuard],
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationOverviewLoading: {
          component: ConfigOverviewLoadingComponent,
          guards: [],
        },
        VariantConfigurationTabBar: {
          component: ConfigTabBarComponent,
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
              'VariantConfigOverviewLoading',
              'VariantConfigOverviewHeader',
              'VariantConfigOverviewContent',
              'VariantConfigOverviewBottombar',
            ],
          },
          xs: {
            slots: [
              'VariantConfigOverviewLoading',
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

  declarations: [
    ConfigOverviewLoadingComponent,
    ConfigOverviewFormComponent,
    ConfigOverviewAttributeComponent,
  ],
  exports: [
    ConfigOverviewLoadingComponent,
    ConfigOverviewFormComponent,
    ConfigOverviewAttributeComponent,
  ],
  providers: [UserService],
  entryComponents: [
    ConfigOverviewLoadingComponent,
    ConfigOverviewFormComponent,
    ConfigOverviewAttributeComponent,
  ],
})
export class VariantConfiguratorOverviewModule {}
