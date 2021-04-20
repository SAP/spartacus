import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { ImportToCartComponent } from './import-to-cart.component';
import { ImportToCartService } from './import-to-cart.service';

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
  providers: [ImportToCartService, SavedCartService],
})
export class ImportToCartModule {}
