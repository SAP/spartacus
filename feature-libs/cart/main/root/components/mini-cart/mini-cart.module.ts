import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { MiniCartComponentService } from './mini-cart-component.service';
import { MiniCartComponent } from './mini-cart.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, IconModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MiniCartComponent: {
          component: MiniCartComponent,
          providers: [{ provide: MiniCartComponentService }],
        },
      },
    }),
  ],
  declarations: [MiniCartComponent],
  exports: [MiniCartComponent],
})
export class MiniCartModule {}
