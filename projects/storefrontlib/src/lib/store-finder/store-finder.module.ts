import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material.module';
import { CmsModule } from '../cms/cms.module';

import { effects, reducers } from './store';
import * as fromServices from './services';

import { StoreFinderSearchComponent } from './components/store-finder-search/store-finder-search.component';
import { StoreFinderListComponent } from './components/store-finder-list/store-finder-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CmsModule,
    StoreModule.forFeature('stores', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [StoreFinderSearchComponent, StoreFinderListComponent],
  exports: [StoreFinderSearchComponent, StoreFinderListComponent],
  providers: [...fromServices.services]
})
export class StoreFinderModule {}
