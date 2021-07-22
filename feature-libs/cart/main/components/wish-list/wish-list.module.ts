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
  AddToCartModule,
  ItemCounterModule,
  MediaModule,
  StarRatingModule,
} from '@spartacus/storefront';
import { WishListItemComponent } from './components/wish-list-item/wish-list-item.component';
import { WishListComponent } from './components/wish-list/wish-list.component';

@NgModule({
  imports: [
    AddToCartModule,
    CommonModule,
    I18nModule,
    MediaModule,
    RouterModule,
    StarRatingModule,
    UrlModule,
    ItemCounterModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        WishListComponent: {
          component: WishListComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [WishListComponent, WishListItemComponent],
  exports: [WishListComponent, WishListItemComponent],
})
export class WishListModule {}
