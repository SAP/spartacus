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
  },
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: PageTemplateComponent,
    data: { pageLabel: 'sale', cxPath: 'sale' } // TODO set a proper pageLabel when it's available in CMS
  },
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: PageTemplateComponent,
    data: { pageLabel: 'contact', cxPath: 'contact' } // TODO set a proper pageLabel when it's available in CMS
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ContentPageModule {}
