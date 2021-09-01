import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideConfig,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { MediaModule } from 'projects/storefrontlib/src/shared';
import { CartToastComponent } from './cart-toast.component';
import { CartToastService } from './cart-toast.service';
import { defaultCartToastConfig } from './default-cart-toast-configs';
import { defaultCartToastLayoutConfig } from './default-cart-toast-layout.config';

@NgModule({
  imports: [CommonModule, MediaModule, RouterModule, UrlModule],
  declarations: [CartToastComponent],
  providers: [
    CartToastService,
    provideConfig(defaultCartToastLayoutConfig),
    provideDefaultConfig(defaultCartToastConfig),
  ],
})
export class CartToastModule {}
