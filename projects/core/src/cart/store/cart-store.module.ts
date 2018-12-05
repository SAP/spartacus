import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';

import { reducerProvider } from './reducers/index';
import { effects } from './effects/index';

@NgModule({
  imports: [CommonModule, HttpClientModule, EffectsModule.forFeature(effects)],
  providers: [reducerProvider]
})
export class CartStoreModule {}
