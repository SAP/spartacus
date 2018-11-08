import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

import { PageNotFoundComponent } from './404.component';
import { ConfigurableRoutes, PathModule } from '@spartacus/core';

const routes: ConfigurableRoutes = [
  {
    path: null,
    component: PageNotFoundComponent,
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'notFound', cxPath: 'pageNotFound' }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), PathModule],
  declarations: [PageNotFoundComponent],
  exports: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
