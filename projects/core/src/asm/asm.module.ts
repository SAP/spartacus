import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '../config/config-providers';
import { defaultAsmConfig } from './config/default-asm-config';
import { AsmStatePersistenceService } from './services/asm-state-persistence.service';
import { AsmStoreModule } from './store/asm-store.module';

export function asmStatePersistenceFactory(
  asmStatePersistenceService: AsmStatePersistenceService
) {
  const result = () => asmStatePersistenceService.sync();
  return result;
}

@NgModule({
  imports: [CommonModule, HttpClientModule, AsmStoreModule],
})
export class AsmModule {
  static forRoot(): ModuleWithProviders<AsmModule> {
    return {
      ngModule: AsmModule,
      providers: [
        provideDefaultConfig(defaultAsmConfig),
        {
          provide: APP_INITIALIZER,
          useFactory: asmStatePersistenceFactory,
          deps: [AsmStatePersistenceService],
          multi: true,
        },
      ],
    };
  }
}
