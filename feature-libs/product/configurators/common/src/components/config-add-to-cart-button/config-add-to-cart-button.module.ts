import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { ConfigAddToCartButtonComponent } from './config-add-to-cart-button.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationAddToCartButton: {
          component: ConfigAddToCartButtonComponent,
        },
      },
    }),
  ],
  declarations: [ConfigAddToCartButtonComponent],
  exports: [ConfigAddToCartButtonComponent],
  entryComponents: [ConfigAddToCartButtonComponent],
})
export class ConfigAddToCartButtonModule {}
