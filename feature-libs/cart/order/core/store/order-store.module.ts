import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './effects/index';
import { reducerProvider } from './reducers/index';

@NgModule({
  imports: [EffectsModule.forFeature(effects)],
  providers: [reducerProvider],
})
export class OrderStoreModule {}
