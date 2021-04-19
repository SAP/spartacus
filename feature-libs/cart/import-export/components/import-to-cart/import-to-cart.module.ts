import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { ImportToCartComponent } from './import-to-cart.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ImportProductsLinkComponent: {
          component: ImportToCartComponent,
        },
      },
    }),
  ],
  exports: [ImportToCartComponent],
  declarations: [ImportToCartComponent],
  entryComponents: [ImportToCartComponent],
})
export class ImportToCartModule {}
