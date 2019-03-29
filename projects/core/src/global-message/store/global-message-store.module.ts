import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { reducerToken, reducerProvider } from './reducers/index';
import { GLOBAL_MESSAGE_FEATURE } from './global-message-state';
import { StateModule } from '../../state/state.module';

@NgModule({
  imports: [
    StateModule,
    StoreModule.forFeature(GLOBAL_MESSAGE_FEATURE, reducerToken),
  ],
  providers: [reducerProvider],
})
export class GlobalMessageStoreModule {}
