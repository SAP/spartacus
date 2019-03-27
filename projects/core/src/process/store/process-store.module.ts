import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { StateModule } from '../../state';

import { PROCESS_STATE } from './process-state';

import { reducerToken, reducerProvider } from './reducers/index';

@NgModule({
  imports: [StateModule, StoreModule.forFeature(PROCESS_STATE, reducerToken)],
  providers: [reducerProvider]
})
export class ProcessStoreModule {}
