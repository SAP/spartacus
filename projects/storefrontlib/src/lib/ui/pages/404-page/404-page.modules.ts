import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

import { PageNotFoundComponent } from './404-page.component';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { CmsModule } from '../../../cms/cms.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: PageNotFoundComponent,
    data: { pageLabel: 'notFound', cxPath: 'pageNotFound' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    CmsModule
  ],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
