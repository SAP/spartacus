import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '../config/config-providers';
import { defaultAuthConfig } from './config/default-auth-config';
import { AbstractUserIdService } from './facade/abstract-user-id.service';
import { OccUserIdService } from './facade/occ-user-id.service';
import { interceptors } from './http-interceptors/index';
import { AuthStatePersistenceService } from './services/auth-state-persistence.service';
import { AuthStoreModule } from './store/auth-store.module';

export function authStatePersistenceFactory(
  authStatePersistenceService: AuthStatePersistenceService
) {
  const result = () => authStatePersistenceService.sync();
  return result;
}

@NgModule({
  imports: [CommonModule, HttpClientModule, AuthStoreModule],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        provideDefaultConfig(defaultAuthConfig),
        ...interceptors,
        // TODO move into occ auth module
        {
          provide: AbstractUserIdService,
          useClass: OccUserIdService,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: authStatePersistenceFactory,
          deps: [AuthStatePersistenceService],
          multi: true,
        },
      ],
    };
  }
}
