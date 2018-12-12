import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

import { PageNotFoundComponent } from './404.component';
import { UrlTranslationModule } from '@spartacus/core';

const routes: Routes = [
  {
    path: null,
    component: PageNotFoundComponent,
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'notFound', cxPath: 'pageNotFound' }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), UrlTranslationModule],
  declarations: [PageNotFoundComponent],
  exports: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
