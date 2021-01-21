import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserAdapter } from '@spartacus/user/details/core';
import { OccUserAdapter } from './adapters/occ-user.adapter';
import { defaultOccUserDetailConfig } from './config/default-occ-user-details-config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccUserDetailConfig),
    { provide: UserAdapter, useExisting: OccUserAdapter },
  ],
})
export class UserDetailsOccModule {}
