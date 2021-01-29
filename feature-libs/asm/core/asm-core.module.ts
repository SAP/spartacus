import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultAsmConfig } from './config/default-asm-config';
import { AsmConnector } from './connectors/asm.connector';
import { AsmStatePersistenceService } from './services/asm-state-persistence.service';
import { AsmStoreModule } from './store/asm-store.module';

export function asmStatePersistenceFactory(
  asmStatePersistenceService: AsmStatePersistenceService
) {
  const result = () => asmStatePersistenceService.initSync();
  return result;
}

@NgModule({
  imports: [CommonModule, AsmStoreModule],
  providers: [provideDefaultConfig(defaultAsmConfig), AsmConnector],
})
export class AsmCoreModule {
  constructor(asmStatePersistenceService: AsmStatePersistenceService) {
    console.log(
      'asm: asmStatePersistenceService.initSync(); in AsmCoreModule constructor'
    );
    asmStatePersistenceService.initSync();
  }
}
