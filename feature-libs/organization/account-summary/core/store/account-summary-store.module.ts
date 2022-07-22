import { NgModule } from '@angular/core';
// import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ACCOUNT_SUMMARY_FEATURE } from '@spartacus/organization/account-summary/root';
// import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';

@NgModule({
  imports: [
    StoreModule.forFeature(ACCOUNT_SUMMARY_FEATURE, reducerToken, {
      metaReducers,
    }),
    // EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class AccountSummaryStoreModule {}
