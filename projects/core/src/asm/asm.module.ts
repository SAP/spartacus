import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { AuthStorageService } from '../auth/user-auth/facade/auth-storage.service';
import { AuthService } from '../auth/user-auth/facade/auth.service';
import { AuthHeaderService } from '../auth/user-auth/services/auth-header/auth-header.service';
import { provideDefaultConfig } from '../config/config-providers';
import { defaultAsmConfig } from './config/default-asm-config';
import { interceptors } from './http-interceptors/index';
import { AsmAuthStorageService } from './services/asm-auth-storage.service';
import { AsmAuthHeaderService } from './services/asm-auth.header.service';
import { AsmAuthService } from './services/asm-auth.service';
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
        ...interceptors,
        {
          provide: AuthStorageService,
          useExisting: AsmAuthStorageService,
        },
        {
          provide: AuthService,
          useExisting: AsmAuthService,
        },
        {
          provide: AuthHeaderService,
          useExisting: AsmAuthHeaderService,
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
