import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuard } from '../../../cms/guards/cms-page.guard';
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
    canActivate: [CmsPageGuard],
    data: { pageLabel: 'storefinderPage' },
    component: StoreFinderPageComponent,
    children: [
      {
        path: 'find',
        canActivate: [CmsPageGuard],
        data: { pageLabel: 'storefinderPage' },
        component: StoreFinderSearchResultComponent
      },
      {
        path: 'view-all',
        canActivate: [CmsPageGuard],
        data: { pageLabel: 'storefinderPage' },
        component: StoreFinderStoresCountComponent
      },
      {
        path: 'country/:country' /*'country/:country/region/:region'*/,
        canActivate: [CmsPageGuard],
        data: { pageLabel: 'storefinderPage' },
        component: StoreFinderGridComponent
      },
      {
        path: 'country/:country/region/:region/:store',
        canActivate: [CmsPageGuard],
        data: { pageLabel: 'storefinderPage' },
        component: StoreFinderStoreDescriptionComponent
      },
      {
        path: 'country/:country/:store',
        canActivate: [CmsPageGuard],
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
    StoreFinderPageLayoutModule
  ],
  declarations: [StoreFinderPageComponent],
  exports: [StoreFinderPageComponent]
})
export class StoreFinderPageModule {}
