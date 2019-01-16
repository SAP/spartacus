import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { PageTemplateModule } from '../../layout/page-template/page-template.module';
import { PageTemplateComponent } from '../../layout/page-template/page-template.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: PageTemplateComponent,
    data: { pageLabel: 'homepage', cxPath: 'home' }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), PageTemplateModule]
})
export class HomePageModule {}
