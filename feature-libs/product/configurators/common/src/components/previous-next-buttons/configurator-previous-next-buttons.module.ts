import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPreviousNextButtonsComponent } from './configurator-previous-next-buttons.component';

@NgModule({
  imports: [CommonModule, I18nModule, KeyboardFocusModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationPrevNext: {
          component: ConfiguratorPreviousNextButtonsComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorPreviousNextButtonsComponent],
  exports: [ConfiguratorPreviousNextButtonsComponent],
  entryComponents: [ConfiguratorPreviousNextButtonsComponent],
})
export class ConfiguratorPreviousNextButtonsModule {}
