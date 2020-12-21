import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import {
  AuthHttpHeaderService,
  AuthService,
  AuthStorageService,
  provideDefaultConfig,
} from '@spartacus/core';
import { defaultAsmConfig } from './config/default-asm-config';
import { AsmConnector } from './connectors/asm.connector';
import { AsmAuthHttpHeaderService } from './services/asm-auth-http-header.service';
import { AsmAuthStorageService } from './services/asm-auth-storage.service';
import { AsmAuthService } from './services/asm-auth.service';
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
})
export class AsmCoreModule {
  static forRoot(): ModuleWithProviders<AsmCoreModule> {
    return {
      ngModule: AsmCoreModule,
      providers: [
        provideDefaultConfig(defaultAsmConfig),
        AsmConnector,
        {
          provide: AuthStorageService,
          useExisting: AsmAuthStorageService,
        },
        {
          provide: AuthService,
          useExisting: AsmAuthService,
        },
        {
          provide: AuthHttpHeaderService,
          useExisting: AsmAuthHttpHeaderService,
        },
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
