import { NgModule } from '@angular/core';
import { UserProfileCoreModule } from '@spartacus/user/profile/core';
import { CdcAuthModule } from './auth/cdc-auth.module';
import { facadeProviders } from './auth/facade/facade-providers';

@NgModule({
  imports: [CdcAuthModule, UserProfileCoreModule],
  providers: [...facadeProviders],
})
export class CdcCoreModule {}
