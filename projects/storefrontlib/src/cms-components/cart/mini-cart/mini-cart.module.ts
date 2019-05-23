import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CartModule,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '../../misc/icon/index';
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
    UrlModule,
    IconModule,
    I18nModule,
  ],
  declarations: [MiniCartComponent],
  entryComponents: [MiniCartComponent],
})
export class MiniCartModule {}
