import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlTranslationModule, ConfigModule, CmsConfig } from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { CartTotalsComponent } from './cart-totals.component';
import { CartSharedModule } from '../cart-shared/cart-shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlTranslationModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CartTotalsComponent: {
          selector: 'cx-cart-totals'
        }
      }
    }),
    CartSharedModule
  ],
  declarations: [CartTotalsComponent],
  exports: [CartTotalsComponent],
  entryComponents: [CartTotalsComponent]
})
export class CartTotalsModule {}
