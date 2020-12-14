import { NgModule } from '@angular/core';
import { AsmComponentsModule } from './components/asm-components.module';
// TODO
// import { AsmCoreModule } from '@spartacus/storefinder/core';
// import { AsmOccModule } from '@spartacus/storefinder/occ';
// import { AsmComponentsModule } from '@spartacus/storefinder/components';
import { AsmCoreModule } from './core/asm-core.module';
import { AsmOccModule } from './occ/asm-occ.module';

@NgModule({
  imports: [AsmCoreModule, AsmOccModule, AsmComponentsModule],
})
export class AsmModule {}
