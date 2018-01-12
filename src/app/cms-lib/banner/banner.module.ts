import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './banner.component';
import { ResponsiveBannerComponent } from './responsive-banner.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, RouterModule, FlexLayoutModule],
  declarations: [BannerComponent, ResponsiveBannerComponent],
  exports: [BannerComponent, ResponsiveBannerComponent],
  entryComponents: [BannerComponent, ResponsiveBannerComponent]
})
export class BannerModule {}
