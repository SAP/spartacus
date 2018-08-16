import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material.module';
import { CmsModule } from '../cms/cms.module';

import { effects, reducers } from './store';
import * as fromServices from './services';

import { StoreFinderSearchComponent } from './components/store-finder-search/store-finder-search.component';
import { StoreFinderListComponent } from './components/store-finder-list/store-finder-list.component';
import { StoreFinderPagingComponent } from './components/store-finder-paging/store-finder-paging.component';
import { StoreFinderListItemComponent } from './components/store-finder-list/store-finder-list-item/store-finder-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CmsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('stores', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    StoreFinderSearchComponent,
    StoreFinderListComponent,
    StoreFinderPagingComponent,
    StoreFinderListItemComponent
  ],
  exports: [
    StoreFinderSearchComponent,
    StoreFinderListComponent,
    StoreFinderPagingComponent
  ],
  providers: [...fromServices.services]
})
export class StoreFinderModule {}
