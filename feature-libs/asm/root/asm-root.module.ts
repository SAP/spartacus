import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  AuthHttpHeaderService,
  AuthService,
  AuthStorageService,
} from '@spartacus/core';
import { AsmLoaderModule } from './asm-loader.module';
import { AsmAuthHttpHeaderService } from './services/asm-auth-http-header.service';
import { AsmAuthStorageService } from './services/asm-auth-storage.service';
import { AsmAuthService } from './services/asm-auth.service';
import { AsmStatePersistenceService } from './services/asm-state-persistence.service';

export function asmStatePersistenceFactory(
  asmStatePersistenceService: AsmStatePersistenceService
) {
  const result = () => asmStatePersistenceService.initSync();
  return result;
}
@NgModule({
  imports: [AsmLoaderModule],
  providers: [
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
})
export class AsmRootModule {}
