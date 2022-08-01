import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { ConfiguratorOverviewAttributeModule } from '../overview-attribute/configurator-overview-attribute.module';
import { ConfiguratorOverviewBundleAttributeModule } from '../overview-bundle-attribute/configurator-overview-bundle-attribute.module';
import { ConfiguratorOverviewFormComponent } from './configurator-overview-form.component';
import { ProductFacetNavigationModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorOverviewAttributeModule,
    ConfiguratorOverviewBundleAttributeModule,
    I18nModule,
    FeaturesConfigModule,
    ProductFacetNavigationModule
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorOverviewForm: {
          component: ConfiguratorOverviewFormComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorOverviewFormComponent],
  exports: [ConfiguratorOverviewFormComponent],
})
export class ConfiguratorOverviewFormModule {}
