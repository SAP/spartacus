import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import { AddToSavedCartComponent } from './add-to-saved-cart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PageComponentModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AddToSavedCartsComponent: {
          component: AddToSavedCartComponent,
        },
      },
    }),
    I18nModule,
    UrlModule,
  ],
  exports: [AddToSavedCartComponent],
  declarations: [AddToSavedCartComponent],
})
export class AddToSavedCartModule {}
