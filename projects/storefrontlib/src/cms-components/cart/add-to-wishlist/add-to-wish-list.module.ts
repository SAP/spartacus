import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '../../misc/icon/icon.module';
import { AddToWishListComponent } from './add-to-wish-list.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AddToWishListComponent: {
          component: AddToWishListComponent,
        },
      },
    }),
    I18nModule,
    IconModule,
    RouterModule,
    UrlModule,
  ],
  declarations: [AddToWishListComponent],
  entryComponents: [AddToWishListComponent],
  exports: [AddToWishListComponent],
})
export class AddToWishListModule {}
