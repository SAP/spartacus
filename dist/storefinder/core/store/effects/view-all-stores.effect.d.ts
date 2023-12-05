import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { StoreFinderConnector } from '../../connectors/store-finder.connector';
import { StoreFinderActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class ViewAllStoresEffect {
    private actions$;
    private storeFinderConnector;
    protected logger: LoggerService;
    constructor(actions$: Actions, storeFinderConnector: StoreFinderConnector);
    viewAllStores$: Observable<StoreFinderActions.ViewAllStoresSuccess | StoreFinderActions.ViewAllStoresFail>;
    clearStoreFinderData$: Observable<StoreFinderActions.ClearStoreFinderData>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewAllStoresEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewAllStoresEffect>;
}
