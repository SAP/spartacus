import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { ContactPageLayoutModule } from '../../layout/contact-page-layout/contact-page-layout.module';
import { ContactPageComponent } from './contact-page.component';
import { ConfigurableRoutes } from '@spartacus/core';

const routes: ConfigurableRoutes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: ContactPageComponent,
    data: { pageLabel: 'homepage', cxPath: 'contact' } // TODO set a proper pageLabel when it's available in CMS
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
