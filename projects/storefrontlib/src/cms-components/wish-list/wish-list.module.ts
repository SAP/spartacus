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
import { WishListComponent } from './components/wish-list/wish-list.component';
import { WishListItemComponent } from './components/wish-list-item/wish-list-item.component';

@NgModule({
  imports: [
    AddToCartModule,
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        WishListComponent: {
          component: WishListComponent,
        },
      },
    }),
    I18nModule,
    MediaModule,
    RouterModule,
    StarRatingModule,
    UrlModule,
  ],
  declarations: [WishListComponent, WishListItemComponent],
  entryComponents: [WishListComponent],
  exports: [WishListComponent, WishListItemComponent],
})
export class WishListModule {}
