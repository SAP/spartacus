import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfigAddToCartButtonComponent } from './config-add-to-cart-button.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
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
