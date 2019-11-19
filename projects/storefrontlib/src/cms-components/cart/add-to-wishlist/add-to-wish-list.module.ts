import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
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
  ],
  declarations: [AddToWishListComponent],
  entryComponents: [AddToWishListComponent],
  exports: [AddToWishListComponent],
})
export class AddToWishListModule {}
