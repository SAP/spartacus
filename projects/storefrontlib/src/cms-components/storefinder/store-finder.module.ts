import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  StoreFinderCoreModule,
  UrlModule,
} from '@spartacus/core';
import { LayoutConfig } from '../../layout/config/layout-config';
import { ListNavigationModule } from '../../shared/components/list-navigation/list-navigation.module';
import { SpinnerModule } from '../../shared/components/spinner/spinner.module';
import { IconModule } from './../misc/icon/icon.module';
import { ScheduleComponent } from './components/schedule-component/schedule.component';
import { StoreFinderGridComponent } from './components/store-finder-grid/store-finder-grid.component';
import { StoreFinderHeaderComponent } from './components/store-finder-header/store-finder-header.component';
import { StoreFinderListItemComponent } from './components/store-finder-list-item/store-finder-list-item.component';
import { StoreFinderMapComponent } from './components/store-finder-map/store-finder-map.component';
import { StoreFinderPaginationDetailsComponent } from './components/store-finder-pagination-details/store-finder-pagination-details.component';
import { StoreFinderListComponent } from './components/store-finder-search-result/store-finder-list/store-finder-list.component';
import { StoreFinderSearchResultComponent } from './components/store-finder-search-result/store-finder-search-result.component';
import { StoreFinderSearchComponent } from './components/store-finder-search/store-finder-search.component';
import { StoreFinderStoreDescriptionComponent } from './components/store-finder-store-description/store-finder-store-description.component';
import { StoreFinderStoresCountComponent } from './components/store-finder-stores-count/store-finder-stores-count.component';
import { StoreFinderComponent } from './components/store-finder/store-finder.component';
import { StoreFinderStoreComponent } from './components/store-finder-store/store-finder-store.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ListNavigationModule,
    NgbTabsetModule,
    SpinnerModule,
    UrlModule,
    StoreFinderCoreModule,
    I18nModule,
    IconModule,
    ConfigModule.withConfig(<CmsConfig | LayoutConfig>{
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
      layoutSlots: {
        StoreFinderPageTemplate: {
          slots: ['MiddleContent', 'SideContent'],
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
  entryComponents: [
    StoreFinderComponent,
    StoreFinderSearchResultComponent,
    StoreFinderStoresCountComponent,
    StoreFinderGridComponent,
    StoreFinderStoreComponent,
  ],
})
export class StoreFinderModule {}
