import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConfigModule, CmsConfig, UrlTranslationModule } from '@spartacus/core';
import { ResponsiveBannerComponent } from './responsive-banner.component';
import { GenericLinkModule } from '../../ui/components/generic-link/generic-link.module';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { BannerComponent } from './banner.component';
import { BannerComponentService } from './banner.component.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GenericLinkModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SimpleResponsiveBannerComponent: {
          selector: 'cx-responsive-banner',
          providers: [
            {
              provide: BannerComponentService,
              useClass: BannerComponentService,
              deps: [CmsComponentData, CmsConfig]
            }
          ]
        },
        BannerComponent: {
          selector: 'cx-banner',
          providers: [
            {
              provide: BannerComponentService,
              useClass: BannerComponentService,
              deps: [CmsComponentData, CmsConfig]
            }
          ]
        },
        SimpleBannerComponent: {
          selector: 'cx-banner',
          providers: [
            {
              provide: BannerComponentService,
              useClass: BannerComponentService,
              deps: [CmsComponentData, CmsConfig]
            }
          ]
        }
      }
    }),
    UrlTranslationModule
  ],
  declarations: [BannerComponent, ResponsiveBannerComponent],
  exports: [BannerComponent, ResponsiveBannerComponent],
  entryComponents: [BannerComponent, ResponsiveBannerComponent]
})
export class BannerModule {}
