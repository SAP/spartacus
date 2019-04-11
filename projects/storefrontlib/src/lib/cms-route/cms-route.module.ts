import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../cms/guards/cms-page.guard';
import { PageLayoutComponent } from '../cms/page-layout/page-layout.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '**',
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
      },
    ]),
  ],
})
export class CmsRouteModule {}
