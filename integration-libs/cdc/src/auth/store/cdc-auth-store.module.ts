import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CDCUserTokenEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([CDCUserTokenEffects]),
  ],
})
export class CDCAuthStoreModule {}
