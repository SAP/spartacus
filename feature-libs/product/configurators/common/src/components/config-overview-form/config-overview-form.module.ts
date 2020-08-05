import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { ConfigOverviewAttributeModule } from './../config-overview-attribute/config-overview-attribute.module';
import { ConfigOverviewFormComponent } from './config-overview-form.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigOverviewAttributeModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationOverview: {
          component: ConfigOverviewFormComponent,
        },
      },
    }),
  ],
  declarations: [ConfigOverviewFormComponent],
  exports: [ConfigOverviewFormComponent],
  entryComponents: [ConfigOverviewFormComponent],
})
export class ConfigOverviewFormModule {}
