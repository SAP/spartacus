import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { PageLayoutComponent } from '../../../cms/page-layout/page-layout.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: PageLayoutComponent,
    data: { pageLabel: 'homepage', cxPath: 'home' }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), PageLayoutModule]
})
export class HomePageModule {}
