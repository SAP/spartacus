import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsPageGuard,
  PageLayoutComponent,
  PageLayoutModule,
} from '@spartacus/storefront';
import { LogoutGuard } from './logout.guard';

// to avoid ts compile warnings
export const logoutRouteData = { cxRoute: 'logout' };
@NgModule({
  imports: [
    PageLayoutModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard, LogoutGuard],
        component: PageLayoutComponent,
        data: logoutRouteData,
      },
    ]),
  ],
})
export class LogoutModule {}
