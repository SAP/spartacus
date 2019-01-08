import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HelpPageComponent } from './help-page.component';
import { HelpPageLayoutModule } from '../../layout/help-page-layout/help-page-layout.module';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

const routes: Routes = [
  {
    path: 'help',
    canActivate: [CmsPageGuards],

    // TODO:
    // When 'help page' is implemented in CMS backend,
    // then 'faq' pageLabel should be changed to adequate one
    data: { pageLabel: 'faq', breadcrumb: '/ Help' },

    component: HelpPageComponent
  }
];

@NgModule({
  imports: [CommonModule, HelpPageLayoutModule, RouterModule.forChild(routes)],
  declarations: [HelpPageComponent],
  exports: [HelpPageComponent]
})
export class HelpPageModule {}
