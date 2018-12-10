import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { LandingPageLayoutModule } from '../../layout/landing-page-layout/landing-page-layout.module';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: HomePageComponent,
    data: { pageLabel: 'homepage', cxPath: 'home' }
  },
  {
    path: 'previewServlet',
    canActivate: [CmsPageGuards],
    component: HomePageComponent,
    data: { pageLabel: 'homepage' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    LandingPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePageComponent],
  exports: [HomePageComponent]
})
export class HomePageModule {}
