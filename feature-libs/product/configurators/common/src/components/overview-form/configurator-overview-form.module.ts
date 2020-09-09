import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorOverviewAttributeModule } from '../overview-attribute/configurator-overview-attribute.module';
import { ConfiguratorOverviewFormComponent } from './configurator-overview-form.component';

@NgModule({
  imports: [CommonModule, ConfiguratorOverviewAttributeModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationOverview: {
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
