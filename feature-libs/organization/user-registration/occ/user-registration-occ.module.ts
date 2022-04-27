import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserRegistrationAdapter } from '../core/connectors';
import { OccUserRegistrationAdapter } from './adapters';

import { defaultOccOrgUserRegistrationConfig } from './config/default-occ-organization-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOrgUserRegistrationConfig),
    {
      provide: UserRegistrationAdapter,
      useClass: OccUserRegistrationAdapter,
    },
  ],
})
export class UserRegistrationOccModule {}
