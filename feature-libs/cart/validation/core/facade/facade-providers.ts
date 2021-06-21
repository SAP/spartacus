import { Provider } from '@angular/core';
import { CartValidationService } from './cart-validation.service';
import { CartValidationFacade } from '@spartacus/cart/validation/root';

export const facadeProviders: Provider[] = [
  CartValidationService,
  {
    provide: CartValidationFacade,
    useExisting: CartValidationService,
  },
];
