import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HelpPageComponent } from './help-page.component';
import { HelpPageLayoutModule } from '../../layout/help-page-layout/help-page-layout.module';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: HelpPageComponent,
    data: { pageLabel: 'faq', cxPath: 'help', breadcrumb: '/ Help' }
  }
];

@NgModule({
  imports: [CommonModule, HelpPageLayoutModule, RouterModule.forChild(routes)],
  declarations: [HelpPageComponent],
  exports: [HelpPageComponent]
})
export class HelpPageModule {}
