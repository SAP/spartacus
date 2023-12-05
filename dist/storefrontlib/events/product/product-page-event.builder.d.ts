import { EventService, ProductSearchService, ProductService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CategoryPageResultsEvent, ProductDetailsPageEvent, SearchPageResultsEvent } from './product-page.events';
import * as i0 from "@angular/core";
export declare class ProductPageEventBuilder {
    protected eventService: EventService;
    protected productService: ProductService;
    protected productSearchService: ProductSearchService;
    constructor(eventService: EventService, productService: ProductService, productSearchService: ProductSearchService);
    protected register(): void;
    protected buildProductDetailsPageEvent(): Observable<ProductDetailsPageEvent>;
    protected buildCategoryResultsPageEvent(): Observable<CategoryPageResultsEvent>;
    protected buildSearchPageResultsEvent(): Observable<SearchPageResultsEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductPageEventBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductPageEventBuilder>;
}
