import { MetaReducer } from '@ngrx/store';
import { Config, ConfigInitializerService } from '@spartacus/core';
import { MultiCartStatePersistenceService } from './services/multi-cart-state-persistence.service';
import * as i0 from "@angular/core";
export declare function cartStatePersistenceFactory(cartStatePersistenceService: MultiCartStatePersistenceService, configInit: ConfigInitializerService): () => Promise<Config>;
/**
 * Before `MultiCartStatePersistenceService` restores the active cart id `ActiveCartService`
 * will use `current` cart instead of the one saved in browser. This meta reducer
 * sets the value on store initialization to undefined cart which holds active cart loading
 * until the data from storage is restored.
 */
export declare function uninitializeActiveCartMetaReducerFactory(): MetaReducer<any>;
/**
 * Complimentary module for cart to store cart id in browser storage.
 * This makes it possible to work on the same anonymous cart even after page refresh.
 */
export declare class CartPersistenceModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CartPersistenceModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CartPersistenceModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CartPersistenceModule>;
}
