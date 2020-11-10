import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClientAuthModule } from './client-auth/client-auth.module';
import { UserAuthModule } from './user-auth/user-auth.module';

@NgModule({
  imports: [CommonModule, ClientAuthModule.forRoot(), UserAuthModule.forRoot()],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
    };
  }
}
