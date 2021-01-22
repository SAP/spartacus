import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsPageGuard,
  PageLayoutComponent,
  PageLayoutModule,
} from '@spartacus/storefront';
import { LogoutGuard } from './logout.guard';

@NgModule({
  imports: [
    PageLayoutModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard, LogoutGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'logout' },
      },
    ]),
  ],
})
export class LogoutModule {}
