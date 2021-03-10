import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  PageLayoutComponent,
  PageLayoutModule,
} from '../../../cms-structure/page/index';
import { LogoutGuard } from './logout.guard';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';

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
