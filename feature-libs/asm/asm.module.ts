import { NgModule } from '@angular/core';
import { AsmComponentsModule } from '@spartacus/asm/components';
import { AsmCoreModule } from '@spartacus/asm/core';
import { AsmOccModule } from '@spartacus/asm/occ';

@NgModule({
  imports: [AsmComponentsModule, AsmCoreModule, AsmOccModule],
})
export class AsmModule {}
