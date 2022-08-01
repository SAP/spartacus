import { Provider } from '@angular/core';
import { AsmFacade } from '@spartacus/asm/root';
import { AsmService } from './asm.service';

export const facadeProviders: Provider[] = [
  AsmService,
  {
    provide: AsmFacade,
    useExisting: AsmService,
  },
];
