import { NgModule } from '@angular/core';
import { UserDetailsComponentsModule } from '@spartacus/user/details/components';
import { UserDetailCoreModule } from '@spartacus/user/details/core';
import { UserDetailsOccModule } from '@spartacus/user/details/occ';

@NgModule({
  imports: [
    UserDetailCoreModule.forRoot(),
    UserDetailsOccModule,
    UserDetailsComponentsModule,
  ],
})
export class UserDetailsModule {}
