import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateConfig, StorageSyncType } from '../../state/config/state-config';
import { StateModule } from '../../state/state.module';
import { ASM_FEATURE } from './asm-state';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';
import { provideDefaultConfigFactory } from '../../config/config-providers';

export function asmStoreConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          'asm.asmUi': StorageSyncType.LOCAL_STORAGE,
          'asm.csagentToken.value.access_token': StorageSyncType.LOCAL_STORAGE,
          'asm.csagentToken.value.token_type': StorageSyncType.LOCAL_STORAGE,
          'asm.csagentToken.value.expires_in': StorageSyncType.LOCAL_STORAGE,
          'asm.csagentToken.value.expiration_time':
            StorageSyncType.LOCAL_STORAGE,
          'asm.csagentToken.value.scope': StorageSyncType.LOCAL_STORAGE,
          'asm.csagentToken.value.userId': StorageSyncType.LOCAL_STORAGE,
        },
      },
    },
  };
  return config;
}
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    StoreModule.forFeature(ASM_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    provideDefaultConfigFactory(asmStoreConfigFactory),
    reducerProvider,
  ],
})
export class AsmStoreModule {}
