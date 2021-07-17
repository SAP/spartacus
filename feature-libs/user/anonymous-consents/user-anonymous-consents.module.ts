import { NgModule } from '@angular/core';
import { UserAnonymousConsentsComponentsModule } from '@spartacus/user/anonymous-consents/components';
import { UserAnonymousConsentsCoreModule } from '@spartacus/user/anonymous-consents/core';
import { UserAnonymousConsentsOccModule } from '@spartacus/user/anonymous-consents/occ';

@NgModule({
  imports: [
    UserAnonymousConsentsComponentsModule,
    UserAnonymousConsentsCoreModule.forRoot(),
    UserAnonymousConsentsOccModule,
  ],
})
export class UserAnonymousConsentsModule {}
