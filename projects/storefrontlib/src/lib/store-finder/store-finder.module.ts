import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material.module';

import { StoreFinderComponent } from './components/store-finder/store-finder.component';

import { effects, reducers } from './store';
import * as fromServices from './services';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('stores', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [StoreFinderComponent],
  entryComponents: [StoreFinderComponent],
  exports: [StoreFinderComponent],
  providers: [...fromServices.services]
})
export class StoreFinderModule {}
