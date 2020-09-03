import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfigGroupMenuComponent } from './config-group-menu.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationMenu: {
          component: ConfigGroupMenuComponent,
        },
      },
    }),
  ],
  declarations: [ConfigGroupMenuComponent],
  exports: [ConfigGroupMenuComponent],
  entryComponents: [ConfigGroupMenuComponent],
})
export class ConfigGroupMenuModule {}
