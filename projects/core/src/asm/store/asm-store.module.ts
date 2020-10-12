import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '../../state/state.module';
import { ASM_FEATURE } from './asm-state';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    StoreModule.forFeature(ASM_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class AsmStoreModule {}
