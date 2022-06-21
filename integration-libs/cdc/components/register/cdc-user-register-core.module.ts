import { NgModule } from '@angular/core';
import { UserProfileConnector } from '@spartacus/user/profile/core';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [UserProfileConnector, ...facadeProviders],
})
export class CDCUserRegisterCoreModule {}
