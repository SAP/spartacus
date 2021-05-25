import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  PageLayoutComponent,
  PageLayoutModule,
} from '../../../cms-structure/page/index';
import { LoginGuard } from './login.guard';

/**
 * This module enables to quickly switch from Resource Owner Password Flow
 * to Implicit Flow or Authorization Code Flow. The `login` route in this case will be
 * responsible for initalizing the redirect to OAuth server to login.
 *
 * Instead of manually invoking OAuth redirect you only have to redirect to `login` page.
 */
@NgModule({
  imports: [
    PageLayoutModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [LoginGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'login' },
      },
    ]),
  ],
})
export class LoginRouteModule {}
