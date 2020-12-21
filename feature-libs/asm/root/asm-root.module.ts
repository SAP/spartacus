import { NgModule } from '@angular/core';
import { AsmCoreModule } from '@spartacus/asm/core';
import { AsmOccModule } from '@spartacus/asm/occ';
import { AsmLoaderModule } from './asm-loader.module';

@NgModule({
  imports: [AsmLoaderModule, AsmCoreModule, AsmOccModule],
})
export class AsmRootModule {}
