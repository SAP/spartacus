import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards';
import { StoreFinderPageComponent } from './store-finder-page.component';
import { StoreFinderPageLayoutModule } from '../../layout/store-finder-page-layout/store-finder-page-layout.module';
// tslint:disable-next-line:max-line-length
import { StoreFinderSearchResultComponent } from '../../../store-finder/components/store-finder-search-result/store-finder-search-result.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderStoresCountComponent } from '../../../store-finder/components/store-finder-stores-count/store-finder-stores-count.component';
import { StoreFinderGridComponent } from '../../../store-finder/components/store-finder-grid/store-finder-grid.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderStoreDescriptionComponent } from '../../../store-finder/components/store-finder-store-description/store-finder-store-description.component';

const routes: Routes = [
  {
    path: 'store-finder',
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'storefinderPage', breadcrumb: '/ Store Finder' },
    component: StoreFinderPageComponent,
    children: [
      {
        path: 'find-stores',
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage', breadcrumb: '/ Find Stores' },
        component: StoreFinderSearchResultComponent
      },
      {
        path: 'view-all-stores',
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage', breadcrumb: '/ View All Stores' },
        component: StoreFinderStoresCountComponent
      },
      {
        path: 'country/:country/region/:region',
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage', breadcrumb: '/ Country' },
        component: StoreFinderGridComponent
      },
      {
        path: 'country/:country',
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage', breadcrumb: '/ Country' },
        component: StoreFinderGridComponent
      },
      {
        path: 'country/:country/region/:region/:store',
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage', breadcrumb: '/ Country' },
        component: StoreFinderStoreDescriptionComponent
      },
      {
        path: 'country/:country/:store',
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage', breadcrumb: '/ Country' },
        component: StoreFinderStoreDescriptionComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreFinderPageLayoutModule
  ],
  declarations: [StoreFinderPageComponent],
  exports: [StoreFinderPageComponent]
})
export class StoreFinderPageModule {}
