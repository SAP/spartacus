import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { CONFIGURATION_FEATURE } from './configuration-state';
import { configuratorEffects } from './effects/index';
import {
  configuratorReducerProvider,
  configuratorReducerToken,
} from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    StoreModule.forFeature(CONFIGURATION_FEATURE, configuratorReducerToken),
    EffectsModule.forFeature(configuratorEffects),
  ],
  providers: [configuratorReducerProvider],
})
export class ConfiguratorStateModule {}
