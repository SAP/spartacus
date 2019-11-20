import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { MediaModule, StarRatingModule } from '../../shared/index';
import { AddToCartModule } from '../cart/index';
import { WishlistComponent, WishListItemComponent } from './index';

@NgModule({
  imports: [
    AddToCartModule,
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        WishListComponent: {
          component: WishlistComponent,
        },
      },
    }),
    I18nModule,
    MediaModule,
    RouterModule,
    StarRatingModule,
    UrlModule,
  ],
  declarations: [WishlistComponent, WishListItemComponent],
  entryComponents: [WishlistComponent],
  exports: [WishlistComponent, WishListItemComponent],
})
export class WishListModule {}
