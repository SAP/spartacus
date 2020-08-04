import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthModule } from '@spartacus/core';
import { CDCUserAuthenticationTokenService } from './services/user-authentication/cdc-user-authentication-token.service';
import { CDCAuthStoreModule } from './store/cdc-auth-store.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, AuthModule, CDCAuthStoreModule],
  providers: [CDCUserAuthenticationTokenService],
})
export class CDCAuthModule {}
