import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './banner.component';
import { ResponsiveBannerComponent } from './responsive-banner.component';
import { GenericLinkModule } from '../../ui/components/generic-link/generic-link.module';
import { ConfigModule } from '@spartacus/core';
import { CmsModuleConfig } from '../../cms/cms-module-config';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GenericLinkModule,
    ConfigModule.withConfig(<CmsModuleConfig>{
      cmsComponents: {
        SimpleResponsiveBannerComponent: { selector: 'cx-responsive-banner' },
        SimpleBannerComponent: { selector: 'cx-banner' }
      }
    })
  ],
  declarations: [BannerComponent, ResponsiveBannerComponent],
  exports: [BannerComponent, ResponsiveBannerComponent],
  entryComponents: [BannerComponent, ResponsiveBannerComponent]
})
export class BannerModule {}
