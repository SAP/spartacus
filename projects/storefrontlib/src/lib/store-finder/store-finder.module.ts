import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CmsModule } from '../cms/cms.module';

import { effects } from './store/effects/index';
import { reducers } from './store/reducers/index';
import { services } from './services/index';

import { StoreFinderSearchComponent } from './components/store-finder-search/store-finder-search.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderDisplayListComponent } from './components/store-finder-list/store-finder-display-list/store-finder-display-list.component';
import { StoreFinderMapComponent } from './components/store-finder-map/store-finder-map.component';
import { StoreFinderListItemComponent } from './components/store-finder-list-item/store-finder-list-item.component';
import { StoreFinderStoreDescriptionComponent } from './components/store-finder-store-description/store-finder-store-description.component';
import { ScheduleComponent } from './components/schedule-component/schedule.component';
import { StoreFinderListCountComponent } from './components/store-finder-list-count/store-finder-list-count.component';
import { StoreFinderGridComponent } from './components/store-finder-grid/store-finder-grid.component';
import { StoreFinderHeaderComponent } from './components/store-finder-header/store-finder-header.component';
import { StoreFinderComponent } from './components/store-finder/store-finder.component';
import { StoreFinderListComponent } from './components/store-finder-list/store-finder-list.component';

import { PaginationAndSortingModule } from '../ui/components/pagination-and-sorting/pagination-and-sorting.module';
import { BootstrapModule } from '../bootstrap.module';
import { SpinnerModule } from '../ui/components/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('stores', reducers),
    EffectsModule.forFeature(effects),
    PaginationAndSortingModule,
    BootstrapModule,
    SpinnerModule
  ],
  declarations: [
    StoreFinderSearchComponent,
    StoreFinderDisplayListComponent,
    StoreFinderMapComponent,
    StoreFinderListItemComponent,
    StoreFinderListCountComponent,
    StoreFinderGridComponent,
    StoreFinderStoreDescriptionComponent,
    ScheduleComponent,
    StoreFinderHeaderComponent,
    StoreFinderComponent,
    StoreFinderListComponent
  ],
  exports: [
    StoreFinderSearchComponent,
    StoreFinderDisplayListComponent,
    StoreFinderMapComponent,
    StoreFinderListItemComponent,
    StoreFinderListCountComponent,
    StoreFinderGridComponent,
    StoreFinderStoreDescriptionComponent,
    ScheduleComponent,
    StoreFinderHeaderComponent,
    StoreFinderComponent,
    StoreFinderListComponent
  ],
  providers: [...services]
})
export class StoreFinderModule {}
