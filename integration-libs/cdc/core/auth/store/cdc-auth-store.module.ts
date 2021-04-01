import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CdcUserTokenEffects } from './effects/cdc-user-token.effect';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([CdcUserTokenEffects])],
})
export class CdcAuthStoreModule {}
