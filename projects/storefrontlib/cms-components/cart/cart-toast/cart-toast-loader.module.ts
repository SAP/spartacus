import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CartToastEnablerService } from './cart-toast-enabler.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: cartToastFactory,
      deps: [CartToastEnablerService],
      multi: true,
    },
  ],
})
export class CartToastLoaderModule {}

export function cartToastFactory(
  cartToastEnablerService: CartToastEnablerService
) {
  const isReady = () => {
    cartToastEnablerService.load();
  };
  return isReady;
}
