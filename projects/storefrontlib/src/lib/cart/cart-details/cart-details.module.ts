import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartDetailsComponent } from './cart-details.component';
import { UrlTranslationModule, ConfigModule, CmsConfig } from '@spartacus/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    RouterModule,
    UrlTranslationModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CartComponent: {
          selector: 'cx-cart-details'
        }
      }
    })
  ],
  declarations: [CartDetailsComponent],
  exports: [CartDetailsComponent],
  entryComponents: [CartDetailsComponent]
})
export class CartDetailsModule {}
