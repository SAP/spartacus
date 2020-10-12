import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClientAuthModule } from './client-auth/client-auth.module';
import { UserAuthModule } from './user-auth/user-auth.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ClientAuthModule.forRoot(),
    UserAuthModule.forRoot(),
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<UserAuthModule> {
    return {
      ngModule: UserAuthModule,
    };
  }
}
