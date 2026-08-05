/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthHttpHeaderService,
  AuthService,
  AuthStorageService,
  DELEGATED_AUTH_HTTP_HEADER_SERVICE,
  HOME_PAGE_CONTEXT,
  PageType,
  ProtectedRoutesService,
  provideDefaultConfig,
  RoutingConfig,
} from '@spartacus/core';
import {
  CmsPageGuard,
  PageLayoutComponent,
  PageLayoutModule,
} from '@spartacus/storefront';
import { AsmLoaderModule } from './asm-loader.module';
import { defaultAsmConfig } from './config/default-asm-config';
import { UserIdHttpHeaderInterceptor } from './interceptors/user-id-http-header.interceptor';
import { AsmAuthHttpHeaderService } from './services/asm-auth-http-header.service';
import { AsmAuthStorageService } from './services/asm-auth-storage.service';
import { AsmAuthService } from './services/asm-auth.service';
import { AsmProtectedRoutesService } from './services/asm-protected-routes.service';

@NgModule({
  imports: [
    AsmLoaderModule,
    PageLayoutModule,
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'asmDeepLink',
          cxCmsRouteContext: {
            id: HOME_PAGE_CONTEXT,
            type: PageType.CONTENT_PAGE,
          },
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfig(defaultAsmConfig),
    provideDefaultConfig(<RoutingConfig>{
      routing: {
        routes: {
          asmDeepLink: {
            paths: ['assisted-service/emulate'],
          },
        },
      },
    }),
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
    // The providers below preserve backward compatibility for the CXSPA-12514 fix
    // and should be removed once the enableExpiredRefreshTokenHandlers feature
    // toggle is fully rolled out.
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
