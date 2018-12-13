import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducerToken, reducerProvider } from './reducers/index';
import { GLOBAL_MESSAGE_FEATURE } from './global-message-state';
@NgModule({
  imports: [StoreModule.forFeature(GLOBAL_MESSAGE_FEATURE, reducerToken)],
  providers: [reducerProvider]
})
export class GlobalMessageStoreModule {}
