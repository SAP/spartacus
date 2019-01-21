import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms/page-layout/page-layout.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: PageLayoutComponent,
    data: { pageLabel: 'faq', cxPath: 'help' }
  },
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: PageLayoutComponent,
    data: { pageLabel: 'sale', cxPath: 'sale' } // TODO set a proper pageLabel when it's available in CMS
  },
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: PageLayoutComponent,
    data: { pageLabel: 'contact', cxPath: 'contact' } // TODO set a proper pageLabel when it's available in CMS
  },
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: PageLayoutComponent,
    data: { pageLabel: 'termsAndConditions', cxPath: 'termsAndConditions' }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ContentPageModule {}
