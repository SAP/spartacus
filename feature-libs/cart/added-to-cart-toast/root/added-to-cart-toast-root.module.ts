import { NgModule } from '@angular/core';
import { provideConfig, provideDefaultConfig } from '@spartacus/core';
import { defaultAddedToCartToastLayoutConfig } from '../components/default-added-to-cart-toast-layout.config';
import { defaultAddedToCartToastConfig } from '../default-added-to-cart-toast-config';
import { AddedToCartToastLoaderModule } from './added-to-cart-toast-loader.module';

@NgModule({
  imports: [AddedToCartToastLoaderModule],
  providers: [
    provideConfig(defaultAddedToCartToastLayoutConfig),
    provideDefaultConfig(defaultAddedToCartToastConfig),
  ],
})
export class AddedToCartToastRootModule {}
