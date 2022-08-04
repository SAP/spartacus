import { Provider } from '@angular/core';

import { AsmFacade } from '../../root';
import { AsmService } from './asm.service';

export const facadeProviders: Provider[] = [
  AsmService,
  {
    provide: AsmFacade,
    useExisting: AsmService,
  },
];
