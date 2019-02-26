import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms/page-layout/page-layout.component';

const routes: Routes = [
  {
    path: '**',
    canActivate: [CmsPageGuards],
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), PageLayoutModule]
})
export class ContentPageModule {}
