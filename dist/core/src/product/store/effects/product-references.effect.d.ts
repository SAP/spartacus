import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { ProductReferencesConnector } from '../../connectors/references/product-references.connector';
import { ProductActions } from '../actions/index';
import { LoggerService } from '../../../logger';
import * as i0 from "@angular/core";
export declare class ProductReferencesEffects {
    private actions$;
    private productReferencesConnector;
    protected logger: LoggerService;
    loadProductReferences$: Observable<ProductActions.LoadProductReferencesSuccess | ProductActions.LoadProductReferencesFail>;
    constructor(actions$: Actions, productReferencesConnector: ProductReferencesConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductReferencesEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductReferencesEffects>;
}
