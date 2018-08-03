import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageLayoutModule } from '../../layout/landing-page-layout/landing-page-layout.module';
import { HomePageComponent } from './home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { CmsPageGuards } from '../../../cms/guards';

const routes: Routes = [
  {
    path: '',
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
