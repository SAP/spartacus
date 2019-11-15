import { NgModule } from '@angular/core';
import { WishlistComponent } from './components/wishlist.component';
import { CommonModule } from '@angular/common';
import { CmsConfig, ConfigModule } from '@spartacus/core';

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
  ],
  declarations: [WishlistComponent],
  entryComponents: [WishlistComponent],
  exports: [WishlistComponent],
})
export class WishListModule {}
