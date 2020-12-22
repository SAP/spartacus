import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { AuthService } from '../auth/user-auth/facade/auth.service';
import { AuthHttpHeaderService } from '../auth/user-auth/services/auth-http-header.service';
import { AuthStorageService } from '../auth/user-auth/services/auth-storage.service';
import { provideDefaultConfig } from '../config/config-providers';
import { defaultAsmConfig } from './config/default-asm-config';
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
export class AsmModule {
  static forRoot(): ModuleWithProviders<AsmModule> {
    return {
      ngModule: AsmModule,
      providers: [
        provideDefaultConfig(defaultAsmConfig),
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
