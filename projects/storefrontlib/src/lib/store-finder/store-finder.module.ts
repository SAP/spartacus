import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material.module';
import { CmsModule } from '../cms/cms.module';

import { effects } from './store/effects/index';
import { reducers } from './store/reducers/index';
import { services } from './services/index';

import { StoreFinderSearchComponent } from './components/store-finder-search/store-finder-search.component';
import { StoreFinderListComponent } from './components/store-finder-list/store-finder-list.component';
import { StoreFinderPagingComponent } from './components/store-finder-paging/store-finder-paging.component';
import { StoreFinderMapComponent } from './components/store-finder-map/store-finder-map.component';
import { StoreFinderListItemComponent } from './components/store-finder-list/store-finder-list-item/store-finder-list-item.component';
import { StoreFinderStoreDescriptionComponent } from './components/store-finder-store-description/store-finder-store-description.component';
import { ScheduleComponent } from './components/schedule-component/schedule.component';
import { StoreFinderListCountComponent } from './components/store-finder-list-count/store-finder-list-count.component';
import { StoreFinderGridComponent } from './components/store-finder-grid/store-finder-grid.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CmsModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('stores', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    StoreFinderSearchComponent,
    StoreFinderListComponent,
    StoreFinderPagingComponent,
    StoreFinderMapComponent,
    StoreFinderListItemComponent,
    StoreFinderGridComponent,
    StoreFinderStoreDescriptionComponent,
    ScheduleComponent,
    StoreFinderListCountComponent
  ],
  exports: [
    StoreFinderSearchComponent,
    StoreFinderListComponent,
    StoreFinderPagingComponent,
    StoreFinderMapComponent,
    StoreFinderListItemComponent,
    StoreFinderListCountComponent,
    StoreFinderGridComponent,
    StoreFinderStoreDescriptionComponent,
    ScheduleComponent
  ],
  providers: [...services]
})
export class StoreFinderModule {}
