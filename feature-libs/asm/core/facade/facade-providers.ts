import { Provider } from '@angular/core';
import { AsmFacadeService } from '@spartacus/asm/root';
import { AsmQueryService } from './asm-query.service';

export const facadeProviders: Provider[] = [
  AsmQueryService,
  {
    provide: AsmFacadeService,
    useExisting: AsmQueryService,
  }
];
