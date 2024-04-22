import { CX_PAGE_GUARD } from '@spartacus/storefront';
import { OppsLoginRequiredGuard } from './opps-login-required.guard';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOppsConfig } from '../config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOppsConfig),
    {
      provide: CX_PAGE_GUARD,
      useValue: OppsLoginRequiredGuard,
      multi: true,
    },
  ],
})
export class OppsLoginRequiredModule {}
