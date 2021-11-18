import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClientAuthModule } from './client-auth/client-auth.module';
import { UserAuthModule } from './user-auth/user-auth.module';

@NgModule({
  // ClientAuthModule should always be imported after UserAuthModule because the ClientTokenInterceptor must be imported after the AuthInterceptor.
  // This way, the ClientTokenInterceptor is the first to handle 401 errors and attempt to refresh the client token.
  // If the request is not for the client token, the AuthInterceptor handles the refresh.
  imports: [CommonModule, UserAuthModule.forRoot(), ClientAuthModule.forRoot()],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
    };
  }
}
