import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { reducers } from './store';
import { GlobalMessageComponent } from './components/global-messsage.component';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('globalMessage', reducers)],
  declarations: [GlobalMessageComponent],
  exports: [GlobalMessageComponent]
})
export class GlobalMessageModule {}
