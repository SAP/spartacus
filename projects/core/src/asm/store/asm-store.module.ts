import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfigModule } from '../../config/config.module';
import { StateConfig, StorageSyncType } from '../../state/config/state-config';
import { StateModule } from '../../state/state.module';
import { ASM_FEATURE } from './asm-state';
import { effects } from './effects/index';
import { reducerProvider, reducerToken } from './reducers/index';

export function asmStoreConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          'asm.asmUi': StorageSyncType.LOCAL_STORAGE,
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
    StoreModule.forFeature(ASM_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(asmStoreConfigFactory),
  ],
  providers: [reducerProvider],
})
export class AsmStoreModule {}
