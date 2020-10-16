import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@spartacus/core';
import { CdcUserAuthenticationTokenService } from './services/user-authentication/cdc-user-authentication-token.service';
import { CdcAuthStoreModule } from './store/cdc-auth-store.module';

@NgModule({
  imports: [CommonModule, AuthModule, CdcAuthStoreModule],
  providers: [CdcUserAuthenticationTokenService],
})
export class CdcAuthModule {}
