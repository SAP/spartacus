import { Provider } from '@angular/core';
import { AsmBindCartFacade } from '@spartacus/asm/root';
import { AsmBindCartService } from './asm-bind-cart.service';

export const facadeProviders: Provider[] = [
  AsmBindCartService,
  {
    provide: AsmBindCartFacade,
    useExisting: AsmBindCartService,
  },
];
