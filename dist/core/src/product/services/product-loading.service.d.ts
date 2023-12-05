import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EventService } from '../../event/event.service';
import { Product } from '../../model/product.model';
import { LoadingScopesService } from '../../occ/services/loading-scopes.service';
import { StateWithProduct } from '../store/product-state';
import * as i0 from "@angular/core";
export declare class ProductLoadingService {
    protected store: Store<StateWithProduct>;
    protected loadingScopes: LoadingScopesService;
    protected actions$: Actions;
    protected platformId: any;
    protected eventService: EventService;
    protected products: {
        [code: string]: {
            [scope: string]: Observable<Product>;
        };
    };
    constructor(store: Store<StateWithProduct>, loadingScopes: LoadingScopesService, actions$: Actions, platformId: any, eventService: EventService);
    get(productCode: string, scopes: string[]): Observable<Product>;
    protected initProductScopes(productCode: string, scopes: string[]): void;
    protected getScopesIndex(scopes: string[]): string;
    /**
     * Creates observable for providing specified product data for the scope
     *
     * @param productCode
     * @param scope
     */
    protected getProductForScope(productCode: string, scope: string): Observable<Product>;
    /**
     * Returns reload triggers for product per scope
     *
     * @param productCode
     * @param scope
     */
    protected getProductReloadTriggers(productCode: string, scope: string): Observable<unknown>[];
    /**
     * Generic method that returns stream triggering reload by maxAge
     *
     * Could be refactored to separate service in future to use in other
     * max age reload implementations
     *
     * @param loadStart$ Stream that emits on load start
     * @param loadFinish$ Stream that emits on load finish
     * @param maxAge max age
     */
    private getMaxAgeTrigger;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductLoadingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductLoadingService>;
}
