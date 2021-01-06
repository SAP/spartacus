import { NgModule } from '@angular/core';
import { UserComponentsModule } from '@spartacus/user/components';
import { UserCoreModule } from '@spartacus/user/core';
import { UserOccModule } from '@spartacus/user/occ';

@NgModule({
  imports: [UserCoreModule, UserOccModule, UserComponentsModule],
})
export class UserModule {}
