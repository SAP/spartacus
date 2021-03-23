import { NgModule } from '@angular/core';
import { LogoutGuard } from '@spartacus/storefront';
import { CdcAuthModule } from './auth/cdc-auth.module';
import { CdcLogoutGuard } from './auth/guards/cdc-logout.guard';

@NgModule({
  imports: [CdcAuthModule],
  providers: [{ provide: LogoutGuard, useExisting: CdcLogoutGuard }],
})
export class CdcModule {}
