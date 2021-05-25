import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './effects/index';
import { ORGANIZATION_FEATURE } from './organization-state';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';

@NgModule({
  imports: [
    StoreModule.forFeature(ORGANIZATION_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class OrganizationStoreModule {}
