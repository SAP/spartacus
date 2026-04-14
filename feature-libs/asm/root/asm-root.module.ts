/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  AuthHttpHeaderService,
  AuthService,
  AuthStorageService,
  DELEGATED_AUTH_HTTP_HEADER_SERVICE,
  ProtectedRoutesService,
  provideDefaultConfig,
} from '@spartacus/core';
import { AsmLoaderModule } from './asm-loader.module';
import { defaultAsmConfig } from './config/default-asm-config';
import { UserIdHttpHeaderInterceptor } from './interceptors/user-id-http-header.interceptor';
import { AsmAuthHttpHeaderService } from './services/asm-auth-http-header.service';
import { AsmAuthStorageService } from './services/asm-auth-storage.service';
import { AsmAuthService } from './services/asm-auth.service';
import { AsmProtectedRoutesService } from './services/asm-protected-routes.service';

@NgModule({
  imports: [AsmLoaderModule],
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
      provide: DELEGATED_AUTH_HTTP_HEADER_SERVICE,
      useExisting: AsmAuthHttpHeaderService,
    },
    {
      provide: ProtectedRoutesService,
      useExisting: AsmProtectedRoutesService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: UserIdHttpHeaderInterceptor,
      multi: true,
    },
  ],
})
export class AsmRootModule {}
