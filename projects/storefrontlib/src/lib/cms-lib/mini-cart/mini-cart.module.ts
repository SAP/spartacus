import { MediaModule } from './../../ui/components/media/media.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material.module';

import { MiniCartComponent } from './mini-cart.component';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

import { BannerModule } from '../banner/banner.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    BannerModule,
    MediaModule
  ],
  declarations: [MiniCartComponent, CartDialogComponent],
  entryComponents: [MiniCartComponent, CartDialogComponent],
  exports: [MiniCartComponent]
})
export class MiniCartModule {}
