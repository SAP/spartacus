import { Observable } from 'rxjs';
import { EventService } from '../../event/event.service';
import { ProductSearchService } from '../facade/product-search.service';
import { FacetChangedEvent } from './product.events';
import * as i0 from "@angular/core";
export declare class ProductEventBuilder {
    protected eventService: EventService;
    protected productSearchService: ProductSearchService;
    constructor(eventService: EventService, productSearchService: ProductSearchService);
    protected register(): void;
    /**
     * To get the changed facet, we need to compare the product search results
     * got before and after toggling the facet value. These 2 product searches must
     * have the same search queries except one different solr filter term. That means
     * these 2 searches must have the same 'freeTextSearch'; and if they are category
     * searches, they must have the same root (in the same category or brand).
     */
    protected buildFacetChangedEvent(): Observable<FacetChangedEvent | undefined>;
    /**
     * The 2 product searches (before and after facet changed) must have the same
     * search queries; and if they are category searches, they also must have the
     * same root (in the same category or brand).
     */
    private compareSearchResults;
    /**
     * Get the toggled breadcrumb. The 2 breadcrumb lists got from the 2 search results
     * only can have one different solr filter term.
     */
    private getToggledBreadcrumb;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductEventBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductEventBuilder>;
}
