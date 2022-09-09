import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MODULE_INITIALIZER, provideDefaultConfig } from '@spartacus/core';
import { defaultAsmConfig } from './config/default-asm-config';
import { AsmConnector } from './connectors/asm.connector';
import { AsmStatePersistenceService } from './services/asm-state-persistence.service';
import { AsmStoreModule } from './store/asm-store.module';

export function asmStatePersistenceFactory(
  asmStatePersistenceService: AsmStatePersistenceService
): () => void {
  const result = () => asmStatePersistenceService.initSync();
  return result;
}

@NgModule({
  imports: [CommonModule, AsmStoreModule],
  providers: [
    provideDefaultConfig(defaultAsmConfig),
    AsmConnector,
    {
      provide: MODULE_INITIALIZER,
      useFactory: asmStatePersistenceFactory,
      deps: [AsmStatePersistenceService],
      multi: true,
    },
  ],
})
export class AsmCoreModule {}
