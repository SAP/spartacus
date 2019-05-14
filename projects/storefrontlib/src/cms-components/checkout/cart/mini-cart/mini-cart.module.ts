import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CartModule,
  CmsConfig,
  ConfigModule,
  UrlModule,
  I18nModule,
} from '@spartacus/core';
import { IconModule } from '../../../../cms-components/misc/icon/index';
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
