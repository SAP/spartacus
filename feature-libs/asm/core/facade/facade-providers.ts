import { Provider } from '@angular/core';
import { AsmFacade } from '@spartacus/asm/root';
import { AsmQueryService } from './asm-query.service';

export const facadeProviders: Provider[] = [
  AsmQueryService,
  {
    provide: AsmFacade,
    useExisting: AsmQueryService,
  },
];
