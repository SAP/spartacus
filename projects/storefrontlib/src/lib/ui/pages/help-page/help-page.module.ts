import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

import { HelpPageComponent } from './help-page.component';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { CmsModule } from '../../../cms/cms.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: HelpPageComponent,
    data: { pageLabel: 'faq', cxPath: 'help' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    CmsModule
  ],
  declarations: [HelpPageComponent]
})
export class HelpPageModule {}
