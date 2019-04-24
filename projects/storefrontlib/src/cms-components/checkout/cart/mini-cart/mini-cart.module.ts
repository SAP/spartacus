import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CartModule,
  CmsConfig,
  ConfigModule,
  UrlTranslationModule,
} from '@spartacus/core';
import { BannerModule } from '../../../../lib/cms-lib/banner/banner.module';
import { MediaModule } from '../../../../lib/ui/components/media/media.module';
import { MiniCartComponent } from './mini-cart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BannerModule,
    MediaModule,
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
  exports: [MiniCartComponent],
})
export class MiniCartModule {}
