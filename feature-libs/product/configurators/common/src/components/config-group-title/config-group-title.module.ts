import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { ConfigGroupTitleComponent } from './config-group-title.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationGroupTitle: {
          component: ConfigGroupTitleComponent,
        },
      },
    }),
  ],
  declarations: [ConfigGroupTitleComponent],
  exports: [ConfigGroupTitleComponent],
  entryComponents: [ConfigGroupTitleComponent],
})
export class ConfigGroupTitleModule {}
