import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { GenericLinkModule } from '../../ui/components/generic-link/generic-link.module';
import { MediaModule } from '../../ui/components/media/media.module';
import { BannerComponent } from './banner.component';
import { BannerComponentService } from './banner.component.service';
import { ResponsiveBannerComponent } from './responsive-banner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GenericLinkModule,
    MediaModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SimpleResponsiveBannerComponent: {
          selector: 'cx-responsive-banner',
          providers: [
            {
              provide: BannerComponentService,
              useClass: BannerComponentService,
              deps: [CmsComponentData, CmsConfig],
            },
          ],
        },
        BannerComponent: {
          selector: 'cx-banner',
          providers: [
            {
              provide: BannerComponentService,
              useClass: BannerComponentService,
              deps: [CmsComponentData, CmsConfig],
            },
          ],
        },
        SimpleBannerComponent: {
          selector: 'cx-banner',
          providers: [
            {
              provide: BannerComponentService,
              useClass: BannerComponentService,
              deps: [CmsComponentData, CmsConfig],
            },
          ],
        },
      },
    }),
  ],
  declarations: [BannerComponent, ResponsiveBannerComponent],
  exports: [BannerComponent, ResponsiveBannerComponent],
  entryComponents: [BannerComponent, ResponsiveBannerComponent],
})
export class BannerModule {}
