import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { StoreFinderPageComponent } from './store-finder-page.component';
import { StoreFinderPageLayoutModule } from '../../layout/store-finder-page-layout/store-finder-page-layout.module';
// tslint:disable-next-line:max-line-length
import { StoreFinderSearchResultComponent } from '../../../store-finder/components/store-finder-search-result/store-finder-search-result.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderStoresCountComponent } from '../../../store-finder/components/store-finder-stores-count/store-finder-stores-count.component';
import { StoreFinderGridComponent } from '../../../store-finder/components/store-finder-grid/store-finder-grid.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderStoreDescriptionComponent } from '../../../store-finder/components/store-finder-store-description/store-finder-store-description.component';
import { StorefrontConfigurableRoutesConfig } from '../../../storefront-configurable-routes-config';
import { ConfigModule } from '@spartacus/core';

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

const defaultRoutesConfig: StorefrontConfigurableRoutesConfig = {
  routesConfig: {
    translations: {
      default: {
        storeFinder: {
          paths: ['store-finder'],
          children: {
            searchResults: { paths: ['find-stores'] },
            allStores: { paths: ['view-all-stores'] },
            listStores: {
              paths: ['country/:country/region/:region', 'country/:country']
            },
            storeDescription: {
              paths: ['country/:country/region/:region/:store']
            }
          }
        }
      }
    }
  }
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(defaultRoutesConfig),
    StoreFinderPageLayoutModule
  ],
  declarations: [StoreFinderPageComponent],
  exports: [StoreFinderPageComponent]
})
export class StoreFinderPageModule {}
