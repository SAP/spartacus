import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { CONFIGURATOR_FEATURE } from './configurator-state';
import { ConfiguratorEffects } from './effects/index';
import {
  configuratorReducerProvider,
  configuratorReducerToken,
} from './reducers/index';

@NgModule({
  imports: [
    CommonModule,

    StateModule,
    StoreModule.forFeature(CONFIGURATOR_FEATURE, configuratorReducerToken),
    EffectsModule.forFeature(ConfiguratorEffects),
  ],
  providers: [configuratorReducerProvider],
})
export class RulebasedConfiguratorStateModule {}
