import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { StoreFinderConnector } from '../../connectors/store-finder.connector';
import { StoreFinderActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class FindStoresEffect {
    private actions$;
    private storeFinderConnector;
    protected logger: LoggerService;
    constructor(actions$: Actions, storeFinderConnector: StoreFinderConnector);
    findStores$: Observable<StoreFinderActions.FindStoresSuccess | StoreFinderActions.FindStoresFail>;
    findStoreById$: Observable<StoreFinderActions.FindStoreByIdSuccess | StoreFinderActions.FindStoreByIdFail>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FindStoresEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FindStoresEffect>;
}
