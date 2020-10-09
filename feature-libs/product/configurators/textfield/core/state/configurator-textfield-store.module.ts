import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { CONFIGURATION_TEXTFIELD_FEATURE } from './configuration-textfield-state';
import { configuratorTextfieldEffects } from './effects/index';
import {
  configuratorTextfieldReducerProvider,
  configuratorTextfieldReducerToken,
} from './reducers/index';

@NgModule({
  imports: [
    CommonModule,

    StateModule,
    StoreModule.forFeature(
      CONFIGURATION_TEXTFIELD_FEATURE,
      configuratorTextfieldReducerToken
    ),
    EffectsModule.forFeature(configuratorTextfieldEffects),
  ],
  providers: [configuratorTextfieldReducerProvider],
})
export class ConfiguratorTextfieldStoreModule {}
