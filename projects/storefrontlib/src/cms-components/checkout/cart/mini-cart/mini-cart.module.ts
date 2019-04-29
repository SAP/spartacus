import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CartModule,
  CmsConfig,
  ConfigModule,
  UrlTranslationModule,
} from '@spartacus/core';
import { MiniCartComponent } from './mini-cart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CartModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MiniCartComponent: { selector: 'cx-mini-cart' },
      },
    }),
    UrlTranslationModule,
  ],
  declarations: [MiniCartComponent],
  entryComponents: [MiniCartComponent],
})
export class MiniCartModule {}
