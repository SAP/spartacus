import { NgModule } from '@angular/core';
import { UserAccountCoreModule } from '@spartacus/user/account/core';
import { UserAccountOccModule } from '@spartacus/user/account/occ';
import { CDCUserAccountComponentsModule } from './cdc-user-account-component.module';

@NgModule({
  imports: [
    UserAccountCoreModule,
    UserAccountOccModule,
    CDCUserAccountComponentsModule,
  ],
})
export class CDCUserAccountModule {}
