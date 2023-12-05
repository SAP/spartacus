import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { StockConnector } from '../../connectors/index';
import { StockLevelActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class StockEffect {
    private actions$;
    private stockConnector;
    protected logger: LoggerService;
    constructor(actions$: Actions, stockConnector: StockConnector);
    loadStockLevels$: import("rxjs").Observable<StockLevelActions.StockLevelFail | StockLevelActions.StockLevelSuccess> & import("@ngrx/effects").CreateEffectMetadata;
    loadStockLevelAtStore$: import("rxjs").Observable<{
        payload: {
            productCode: string;
            storeName: string;
        } & {
            stockLevel: import("@spartacus/core").Stock;
        };
    } & import("@ngrx/store/src/models").TypedAction<"[Stock] Get Stock Level at Store Success">> & import("@ngrx/effects").CreateEffectMetadata;
    static ɵfac: i0.ɵɵFactoryDeclaration<StockEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StockEffect>;
}
