import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { AnonymousConsentsStatePersistenceService } from '../services/anonymous-consents-state-persistence.service';
import { ANONYMOUS_CONSENTS_STORE_FEATURE } from './anonymous-consents-state';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';

export function anonymousConsentsStatePersistenceFactory(
  anonymousConsentsStatePersistenceService: AnonymousConsentsStatePersistenceService
): () => void {
  const result = () => anonymousConsentsStatePersistenceService.initSync();
  return result;
}

@NgModule({
  imports: [
    CommonModule,
    StateModule,
    StoreModule.forFeature(ANONYMOUS_CONSENTS_STORE_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    reducerProvider,
    // TODO:#anon doesn't make sense to provide it here (im the core), as this needs to fire as soon as the app starts.
    // Therefore, the best place to provide it is the root module. However, it becomes tricky at this point since it depends on the AnonymousConsentsService / ngrx store which is LL.
    {
      provide: APP_INITIALIZER,
      useFactory: anonymousConsentsStatePersistenceFactory,
      deps: [AnonymousConsentsStatePersistenceService],
      multi: true,
    },
  ],
})
export class AnonymousConsentsStoreModule {}
