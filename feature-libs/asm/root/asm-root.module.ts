import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  AuthHttpHeaderService,
  AuthService,
  AuthStorageService,
} from '@spartacus/core';
import { AsmLoaderModule } from './asm-loader.module';
import { UserIdInterceptor } from './interceptors/user-id.interceptor';
import { AsmAuthHttpHeaderService } from './services/asm-auth-http-header.service';
import { AsmAuthStorageService } from './services/asm-auth-storage.service';
import { AsmAuthService } from './services/asm-auth.service';

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
      provide: HTTP_INTERCEPTORS,
      useExisting: UserIdInterceptor,
      multi: true,
    },
  ],
})
export class AsmRootModule {}
