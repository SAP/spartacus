import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { GenericLinkModule } from '../../../shared/components/generic-link/generic-link.module';
import { MediaModule } from '../../../shared/components/media/media.module';
import { BannerComponent } from './banner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GenericLinkModule,
    MediaModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SimpleResponsiveBannerComponent: {
          selector: 'cx-banner',
          component: BannerComponent,
        },
        BannerComponent: {
          selector: 'cx-banner',
          component: BannerComponent,
        },
        SimpleBannerComponent: {
          selector: 'cx-banner',
          component: BannerComponent,
        },
      },
    }),
  ],
  declarations: [BannerComponent],
  entryComponents: [BannerComponent],
})
export class BannerModule {}
