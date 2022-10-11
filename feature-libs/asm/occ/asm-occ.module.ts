import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Asm360Service, AsmAdapter } from '@spartacus/asm/core';
import { provideDefaultConfig } from '@spartacus/core';

import { defaultOccAsmConfig } from './adapters/default-occ-asm-config';
import { OccAsmAdapter } from './adapters/occ-asm.adapter';
import { OccAsm360Service } from './services/occ-asm-360.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccAsmConfig),
    {
      provide: AsmAdapter,
      useClass: OccAsmAdapter,
    },
    {
      provide: Asm360Service,
      useClass: OccAsm360Service,
    },
  ],
})
export class AsmOccModule {}
