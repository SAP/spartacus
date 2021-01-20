import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserAdapter } from '@spartacus/user/details/core';
import { OccUserAdapter } from './adapters/occ-user.adapter';
import { defaultOccUserDetailConfig } from './config/default-occ-user-details-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccUserDetailConfig),
    { provide: UserAdapter, useClass: OccUserAdapter },
  ],
})
export class UserDetailsOccModule {}
