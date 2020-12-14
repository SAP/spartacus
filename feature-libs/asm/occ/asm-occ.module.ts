import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { AsmAdapter } from '../core/connectors/asm.adapter';
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
