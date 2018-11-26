import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
import { ConfigurableRoutes } from '@spartacus/core';

const routes: ConfigurableRoutes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'storefinderPage', cxPath: 'storeFinder' },
    component: StoreFinderPageComponent,
    children: [
      {
        path: null,
        canActivate: [CmsPageGuards],
        data: { pageLabel: 'storefinderPage', cxPath: 'searchResult' },
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
