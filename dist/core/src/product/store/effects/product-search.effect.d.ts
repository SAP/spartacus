import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../logger';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';
import { ProductActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class ProductsSearchEffects {
    private actions$;
    private productSearchConnector;
    protected logger: LoggerService;
    searchProducts$: Observable<ProductActions.SearchProductsSuccess | ProductActions.SearchProductsFail>;
    getProductSuggestions$: Observable<ProductActions.GetProductSuggestionsSuccess | ProductActions.GetProductSuggestionsFail>;
    constructor(actions$: Actions, productSearchConnector: ProductSearchConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductsSearchEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductsSearchEffects>;
}
