import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { MiniCartComponent } from './mini-cart.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, IconModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MiniCartComponent: {
          component: MiniCartComponent,
        },
      },
    }),
  ],
  declarations: [MiniCartComponent],
  exports: [MiniCartComponent],
})
export class MiniCartModule {}
