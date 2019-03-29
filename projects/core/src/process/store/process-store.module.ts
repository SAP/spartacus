import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '../../state/state.module';
import { PROCESS_FEATURE } from './process-state';
import { reducerProvider, reducerToken } from './reducers/index';

@NgModule({
  imports: [StateModule, StoreModule.forFeature(PROCESS_FEATURE, reducerToken)],
  providers: [reducerProvider],
})
export class ProcessStoreModule {}
