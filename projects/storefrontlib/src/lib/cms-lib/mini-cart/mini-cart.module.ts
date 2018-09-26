import { MediaModule } from './../../ui/components/media/media.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MiniCartComponent } from './mini-cart.component';

import { BannerModule } from '../banner/banner.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    BannerModule,
    MediaModule
  ],
  declarations: [MiniCartComponent],
  entryComponents: [MiniCartComponent],
  exports: [MiniCartComponent]
})
export class MiniCartModule {}
