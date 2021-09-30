import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AddedToCartToastEnablerService } from './services/added-to-cart-toast-enabler.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: cartToastFactory,
      deps: [AddedToCartToastEnablerService],
      multi: true,
    },
  ],
})
export class AddedToCartToastLoaderModule {}

export function cartToastFactory(
  cartToastEnablerService: AddedToCartToastEnablerService
) {
  const isReady = () => {
    cartToastEnablerService.load();
  };
  return isReady;
}
