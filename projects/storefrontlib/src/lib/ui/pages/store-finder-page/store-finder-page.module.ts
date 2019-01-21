import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { StoreFinderPageComponent } from './store-finder-page.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderSearchResultComponent } from '../../../store-finder/components/store-finder-search-result/store-finder-search-result.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderStoresCountComponent } from '../../../store-finder/components/store-finder-stores-count/store-finder-stores-count.component';
import { StoreFinderGridComponent } from '../../../store-finder/components/store-finder-grid/store-finder-grid.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderStoreDescriptionComponent } from '../../../store-finder/components/store-finder-store-description/store-finder-store-description.component';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { OutletRefModule } from '../../../outlet';
import { StoreFinderModule } from '../../../store-finder';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'storefinderPage', cxPath: 'storeFinder' },
    component: StoreFinderPageComponent,
    children: [
      {
        path: null,
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage', cxPath: 'searchResults' },
        component: StoreFinderSearchResultComponent
      },
      {
        path: null,
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage', cxPath: 'allStores' },
        component: StoreFinderStoresCountComponent
      },
      {
        path: null,
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage', cxPath: 'listStores' },
        component: StoreFinderGridComponent
      },
      {
        path: null,
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage', cxPath: 'storeDescription' },
        component: StoreFinderStoreDescriptionComponent
      },
      {
        path: 'country/:country/:store',
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage' },
        component: StoreFinderStoreDescriptionComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    OutletRefModule,
    StoreFinderModule
  ],
  declarations: [StoreFinderPageComponent],
  exports: [StoreFinderPageComponent]
})
export class StoreFinderPageModule {}
