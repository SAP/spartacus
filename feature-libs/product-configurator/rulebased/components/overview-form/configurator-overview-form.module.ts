import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorOverviewBundleAttributeModule } from '../../cpq/index';
import { ConfiguratorOverviewAttributeModule } from '../overview-attribute/configurator-overview-attribute.module';
import { ConfiguratorOverviewFormComponent } from './configurator-overview-form.component';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorOverviewAttributeModule,
    ConfiguratorOverviewBundleAttributeModule,
    I18nModule,
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
  entryComponents: [ConfiguratorOverviewFormComponent],
})
export class ConfiguratorOverviewFormModule {}
