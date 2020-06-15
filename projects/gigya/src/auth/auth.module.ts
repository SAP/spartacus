import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GigyaUserAuthenticationTokenService } from './services/user-authentication/gigya-user-authentication-token.service';
import { GigyaAuthStoreModule } from './store/gigya-auth-store.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, GigyaAuthStoreModule],
  providers: [GigyaUserAuthenticationTokenService],
})
export class AuthModule {}
