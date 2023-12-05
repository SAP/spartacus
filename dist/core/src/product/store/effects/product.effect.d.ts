import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../logger';
import { ProductConnector } from '../../connectors/product/product.connector';
import { ProductActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class ProductEffects {
    private actions$;
    private productConnector;
    protected logger: LoggerService;
    private contextChange$;
    loadProduct$: (({ scheduler, debounce }?: any) => Observable<ProductActions.LoadProductSuccess | ProductActions.LoadProductFail>) & import("@ngrx/effects").CreateEffectMetadata;
    private productLoadEffect;
    clearProductPrice$: Observable<ProductActions.ClearProductPrice>;
    constructor(actions$: Actions, productConnector: ProductConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductEffects>;
}
