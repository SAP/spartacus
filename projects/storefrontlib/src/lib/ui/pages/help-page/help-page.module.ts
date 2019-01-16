import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { PageTemplateComponent } from '../../layout/page-template/page-template.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: PageTemplateComponent,
    data: { pageLabel: 'faq', cxPath: 'help' }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class HelpPageModule {}
