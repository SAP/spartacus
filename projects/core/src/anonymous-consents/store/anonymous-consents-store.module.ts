import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideDefaultConfigFactory } from '../../config/config.module';
import { StateConfig, StorageSyncType } from '../../state/index';
import { StateModule } from '../../state/state.module';
import { ANONYMOUS_CONSENTS_STORE_FEATURE } from './anonymous-consents-state';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';

export function anonymousConsentsStoreConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          [ANONYMOUS_CONSENTS_STORE_FEATURE]: StorageSyncType.LOCAL_STORAGE,
        },
      },
    },
  };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StateModule,
    StoreModule.forFeature(ANONYMOUS_CONSENTS_STORE_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    provideDefaultConfigFactory(anonymousConsentsStoreConfigFactory),
    reducerProvider,
  ],
})
export class AnonymousConsentsStoreModule {}
