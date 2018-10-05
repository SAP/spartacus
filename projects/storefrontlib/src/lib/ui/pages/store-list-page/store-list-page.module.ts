import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards';
import { StoreListPageLayoutModule } from '../../layout/store-list-page-layout/store-list-page-layout.module';

import { StoreListPageComponent } from './store-list-page.component';

const routes: Routes = [
  {
    path: 'store-finder/country/:country',
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'storefinderPage' },
    component: StoreListPageComponent
  },
  {
    path: 'store-finder/country/:country/region/:region',
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'storefinderPage' },
    component: StoreListPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreListPageLayoutModule
  ],
  declarations: [StoreListPageComponent],
  exports: [StoreListPageComponent]
})
export class StoreListPageModule {}
