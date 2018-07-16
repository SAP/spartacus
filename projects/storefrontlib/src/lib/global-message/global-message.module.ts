import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { reducers } from './store';

@NgModule({
  imports: [StoreModule.forFeature('globalMessage', reducers)],
  declarations: [],
  exports: []
})
export class GlobalMessageModule {}
