import { NgModule } from '@angular/core';
import { WishlistComponent } from './components/wish-list/wishlist.component';
import { CommonModule } from '@angular/common';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { ProductListModule } from '../product/product-list';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        WishListComponent: {
          component: WishlistComponent,
        },
      },
    }),
    ProductListModule,
  ],
  declarations: [WishlistComponent],
  entryComponents: [WishlistComponent],
  exports: [WishlistComponent],
})
export class WishListModule {}
