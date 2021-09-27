import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '../../misc/icon/icon.module';
import { AddToWishListComponent } from './add-to-wish-list.component';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
@NgModule({
  imports: [CommonModule, I18nModule, IconModule, RouterModule, UrlModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AddToWishListComponent: {
          component: AddToWishListComponent,
        },
      },
    }),
  ],
  declarations: [AddToWishListComponent],
  exports: [AddToWishListComponent],
})
export class AddToWishListModule {}
