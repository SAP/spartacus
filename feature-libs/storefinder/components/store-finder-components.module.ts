import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { StoreFinderCoreModule } from '@spartacus/storefinder/core';
import {
  IconModule,
  ListNavigationModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { ScheduleComponent } from './schedule-component/schedule.component';
import { StoreFinderGridComponent } from './store-finder-grid/store-finder-grid.component';
import { StoreFinderHeaderComponent } from './store-finder-header/store-finder-header.component';
import { StoreFinderListItemComponent } from './store-finder-list-item/store-finder-list-item.component';
import { StoreFinderMapComponent } from './store-finder-map/store-finder-map.component';
import { StoreFinderPaginationDetailsComponent } from './store-finder-pagination-details/store-finder-pagination-details.component';
import { StoreFinderListComponent } from './store-finder-search-result/store-finder-list/store-finder-list.component';
import { StoreFinderSearchResultComponent } from './store-finder-search-result/store-finder-search-result.component';
import { StoreFinderSearchComponent } from './store-finder-search/store-finder-search.component';
import { StoreFinderStoreDescriptionComponent } from './store-finder-store-description/store-finder-store-description.component';
import { StoreFinderStoreComponent } from './store-finder-store/store-finder-store.component';
import { StoreFinderStoresCountComponent } from './store-finder-stores-count/store-finder-stores-count.component';
import { StoreFinderComponent } from './store-finder/store-finder.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ListNavigationModule,
    NgbNavModule,
    SpinnerModule,
    UrlModule,
    StoreFinderCoreModule,
    I18nModule,
    IconModule,
  ],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        StoreFinderComponent: {
          component: StoreFinderComponent,
          childRoutes: [
            {
              path: 'find',
              component: StoreFinderSearchResultComponent,
            },
            {
              path: 'view-all',
              component: StoreFinderStoresCountComponent,
            },
            {
              path: 'country/:country',
              component: StoreFinderGridComponent,
            },
            {
              path: 'country/:country/region/:region',
              component: StoreFinderGridComponent,
            },
            {
              path: 'country/:country/region/:region/:store',
              component: StoreFinderStoreComponent,
            },
            {
              path: 'country/:country/:store',
              component: StoreFinderStoreComponent,
            },
          ],
        },
      },
    }),
  ],
  declarations: [
    StoreFinderSearchComponent,
    StoreFinderListComponent,
    StoreFinderMapComponent,
    StoreFinderListItemComponent,
    StoreFinderStoresCountComponent,
    StoreFinderGridComponent,
    StoreFinderStoreDescriptionComponent,
    ScheduleComponent,
    StoreFinderHeaderComponent,
    StoreFinderSearchResultComponent,
    StoreFinderComponent,
    StoreFinderPaginationDetailsComponent,
    StoreFinderStoreComponent,
  ],
  exports: [
    ScheduleComponent,
    StoreFinderComponent,
    StoreFinderGridComponent,
    StoreFinderHeaderComponent,
    StoreFinderListItemComponent,
    StoreFinderMapComponent,
    StoreFinderPaginationDetailsComponent,
    StoreFinderSearchComponent,
    StoreFinderSearchResultComponent,
    StoreFinderListComponent,
    StoreFinderStoreDescriptionComponent,
    StoreFinderStoresCountComponent,
    StoreFinderStoreComponent,
  ],
})
export class StoreFinderComponentsModule {}
