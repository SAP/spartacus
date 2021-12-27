import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  ItemCounterModule,
  MediaModule,
  PageComponentModule,
  StarRatingModule,
} from '@spartacus/storefront';
import { AddToWishListModule } from './add-to-wishlist/add-to-wish-list.module';
import { WishListItemComponent } from './wish-list-item/wish-list-item.component';
import { WishListComponent } from './wish-list/wish-list.component';

@NgModule({
  imports: [
    AddToWishListModule,
    CommonModule,
    I18nModule,
    MediaModule,
    RouterModule,
    StarRatingModule,
    UrlModule,
    ItemCounterModule,
    PageComponentModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        WishListComponent: {
          component: WishListComponent,
          data: {
            composition: {
              inner: ['ProductAddToCartComponent'],
            },
          },
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [WishListComponent, WishListItemComponent],
  exports: [WishListComponent, WishListItemComponent],
})
export class WishListComponentsModule {}
