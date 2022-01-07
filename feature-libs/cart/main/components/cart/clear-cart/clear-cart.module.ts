import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  provideConfig,
} from '@spartacus/core';
import { ClearCartComponent } from './clear-cart.component';
import { ClearCartDialogModule } from '../clear-cart/clear-cart-dialog/clear-cart-dialog.module';
import { defaultClearCartLayoutConfig } from '../clear-cart/clear-cart-dialog';

@NgModule({
  declarations: [ClearCartComponent],
  exports: [ClearCartComponent],
  imports: [CommonModule, I18nModule, ClearCartDialogModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ClearCartComponent: {
          component: ClearCartComponent,
        },
      },
    }),
    provideConfig(defaultClearCartLayoutConfig),
  ],
})
export class ClearCartModule {}
