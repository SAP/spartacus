import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import {
  CmsPageGuard,
  PageLayoutComponent,
  PageLayoutModule,
} from '@spartacus/storefront';
import { LoginGuard } from './guards/login.guard';
import { LogoutGuard } from './guards/logout.guard';

@NgModule({
  imports: [
    PageLayoutModule,

    // move to auth
    RouterModule.forChild([
      {
        path: null,
        canActivate: [LoginGuard], // consider moving to auth
        component: PageLayoutComponent,
        data: { cxRoute: 'login' },
      },
      {
        path: null,
        canActivate: [CmsPageGuard, LogoutGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'logout' },
      },
    ]),
  ],

  providers: [
    provideDefaultConfig({
      featureModules: {
        userDetails: {
          cmsComponents: [
            'LoginComponent',
            'ReturningCustomerLoginComponent',
            'ReturningCustomerRegisterComponent',
          ],
        },
      },
    }),
  ],
})
export class UserAccountRootModule {}
