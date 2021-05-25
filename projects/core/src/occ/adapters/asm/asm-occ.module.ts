import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsmAdapter } from '../../../asm/connectors/asm.adapter';
import { provideDefaultConfig } from '../../../config/config-providers';
import { defaultOccAsmConfig } from './default-occ-asm-config';
import { OccAsmAdapter } from './occ-asm.adapter';

/**
 * @deprecated since 3.2, use asm lib instead
 */
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
