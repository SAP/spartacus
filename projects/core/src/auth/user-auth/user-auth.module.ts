import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { provideDefaultConfig } from '../../config/config-providers';
import { defaultAuthConfig } from './config/default-auth-config';
import { AuthStorageService } from './facade/auth-storage.service';
import { AuthService } from './facade/auth.service';
import { interceptors } from './http-interceptors/index';
import { AuthStatePersistenceService } from './services/auth-state-persistence.service';

export function authStatePersistenceFactory(
  authStatePersistenceService: AuthStatePersistenceService
) {
  const result = () => authStatePersistenceService.sync();
  return result;
}

export function initLogin(authService: AuthService) {
  const result = () => authService.initImplicit();
  return result;
}

export function authStorageFactory(authStorageService: AuthStorageService) {
  return authStorageService;
}

@NgModule({
  imports: [CommonModule, HttpClientModule, OAuthModule.forRoot()],
})
export class UserAuthModule {
  static forRoot(): ModuleWithProviders<UserAuthModule> {
    return {
      ngModule: UserAuthModule,
      providers: [
        provideDefaultConfig(defaultAuthConfig),
        ...interceptors,
        {
          provide: OAuthStorage,
          useFactory: authStorageFactory,
          deps: [AuthStorageService],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: authStatePersistenceFactory,
          deps: [AuthStatePersistenceService],
          multi: true,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initLogin,
          deps: [AuthService],
          multi: true,
        },
      ],
    };
  }
}
