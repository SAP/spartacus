import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserAdapter } from '@spartacus/user/details/core';
import { defaultOccUserDetailConfig } from './adapters/config/default-occ-user-details-endpoint.config';
import { OccUserAdapter } from './adapters/occ-user.adapter';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccUserDetailConfig),
    { provide: UserAdapter, useExisting: OccUserAdapter },
  ],
})
export class UserDetailsOccModule {}
