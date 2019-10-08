import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { effects } from './effects/index';
import { ORGANIZATION_FEATURE } from './organization-state';
import { reducerProvider, reducerToken } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(ORGANIZATION_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class OrganizationStoreModule {}
