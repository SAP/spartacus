import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { provideDefaultConfig } from '../../config/config-providers';
import { defaultAuthConfig } from './config/default-auth-config';
import { AuthService } from './facade/auth.service';
import { interceptors } from './http-interceptors/index';
import { AuthStatePersistenceService } from './services/auth-state-persistence.service';
import { AuthStorageService } from './services/auth-storage.service';

export function initOAuthCallback(
  authService: AuthService,
  configInit: ConfigInitializerService
) {
  const result = () =>
    configInit.getStableConfig().then(() => {
      // Wait for stable config is used, because with auth redirect would kick so quickly that the page would not be loaded correctly
      authService.initOAuthCallback();
    });

  return result;
}

export function authStatePersistenceFactory(
  authStatePersistenceService: AuthStatePersistenceService
) {
  const result = () => authStatePersistenceService.initSync();
  return result;
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
          useExisting: AuthStorageService,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: authStatePersistenceFactory,
          deps: [AuthStatePersistenceService],
          multi: true,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initOAuthCallback,
          deps: [AuthService, ConfigInitializerService],
          multi: true,
        },
      ],
    };
  }
}
