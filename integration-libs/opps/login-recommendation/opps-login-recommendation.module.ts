import { NgModule } from '@angular/core';
import { CmsPageGuard, LoginGuard } from '@spartacus/storefront';
import { OppsLoginGuard } from './opps-login.guard';
import { OppsCmsPageGuard } from './opps-cms-page.guard';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    {
      provide: LoginGuard,
      useClass: OppsLoginGuard,
    },
    {
      provide: CmsPageGuard,
      useClass: OppsCmsPageGuard,
    },
  ],
})
export class OppsLoginRecommendationModule {
}
