import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsmAdapter } from '@spartacus/asm/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccAsmConfig } from './adapters/default-occ-asm-config';
import { OccAsmAdapter } from './adapters/occ-asm.adapter';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccAsmConfig),
    {
      provide: AsmAdapter,
      useClass: OccAsmAdapter,
    },
  ],
})
export class AsmOccModule {}
