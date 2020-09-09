import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorGroupTitleComponent } from './configurator-group-title.component';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationGroupTitle: {
          component: ConfiguratorGroupTitleComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorGroupTitleComponent],
  exports: [ConfiguratorGroupTitleComponent],
  entryComponents: [ConfiguratorGroupTitleComponent],
})
export class ConfiguratorGroupTitleModule {}
