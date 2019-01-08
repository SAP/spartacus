import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { ContactPageLayoutModule } from '../../layout/contact-page-layout/contact-page-layout.module';
import { ContactPageComponent } from './contact-page.component';

const routes: Routes = [
  {
    path: 'contact',
    canActivate: [CmsPageGuards],

    // TODO:
    // When 'contact page' is implemented in CMS backend,
    // then 'homepage' pageLabel should be changed to adequate one
    data: { pageLabel: 'homepage', breadcrumb: '/ Contact Us' },

    component: ContactPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ContactPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactPageComponent],
  exports: [ContactPageComponent]
})
export class ContactPageModule {}
