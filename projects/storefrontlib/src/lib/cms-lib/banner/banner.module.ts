import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './banner.component';
import { ResponsiveBannerComponent } from './responsive-banner.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GenericLinkModule } from '../../ui/components/generic-link/generic-link.module';

@NgModule({
  imports: [CommonModule, RouterModule, FlexLayoutModule, GenericLinkModule],
  declarations: [BannerComponent, ResponsiveBannerComponent],
  exports: [BannerComponent, ResponsiveBannerComponent],
  entryComponents: [BannerComponent, ResponsiveBannerComponent]
})
export class BannerModule {}
