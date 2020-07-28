import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfigPreviousNextButtonsComponent } from './config-previous-next-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    KeyboardFocusModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationPrevNext: {
          component: ConfigPreviousNextButtonsComponent,
        },
      },
    }),
  ],
  declarations: [ConfigPreviousNextButtonsComponent],
  exports: [ConfigPreviousNextButtonsComponent],
  entryComponents: [ConfigPreviousNextButtonsComponent],
})
export class ConfigPreviousNextButtonsModule {}
