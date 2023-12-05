import { EventService, ProductSearchPage, RoutingService, SearchboxService, TranslationService, WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { SearchBoxProductSelectedEvent, SearchBoxSuggestionSelectedEvent } from './search-box.events';
import { SearchBoxConfig, SearchResults } from './search-box.model';
import * as i0 from "@angular/core";
export declare class SearchBoxComponentService {
    searchService: SearchboxService;
    protected routingService: RoutingService;
    protected translationService: TranslationService;
    protected winRef: WindowRef;
    protected eventService: EventService;
    constructor(searchService: SearchboxService, routingService: RoutingService, translationService: TranslationService, winRef: WindowRef, eventService: EventService);
    /**
     * Executes the search for products and suggestions,
     * unless the configuration is setup to not search for
     * products or suggestions.
     */
    search(query: string, config: SearchBoxConfig): void;
    /**
     * Returns an observable with the SearchResults. When there's any
     * result, the body tag will get a classname, so that specific style
     * rules can be applied.
     */
    getResults(config: SearchBoxConfig): Observable<SearchResults>;
    /**
     * Clears the searchbox results, so that old values are
     * no longer emited upon next search.
     */
    clearResults(): void;
    hasBodyClass(className: string): boolean;
    toggleBodyClass(className: string, add?: boolean): void;
    /**
     * Dispatches a searchbox event for product selected
     *
     * @param eventData data for the "SearchBoxProductSelectedEvent"
     */
    dispatchProductSelectedEvent(eventData: SearchBoxProductSelectedEvent): void;
    /**
     * Dispatches a searchbox event for suggestion selected
     *
     * @param eventData data for the "SearchBoxSuggestionSelectedEvent"
     */
    dispatchSuggestionSelectedEvent(eventData: SearchBoxSuggestionSelectedEvent): void;
    /**
     * For search results model, it returns true when:
     * * there is any product OR
     * * the is any search suggestion OR
     * * there is a message.
     *
     * Otherwise it returns false.
     */
    protected hasResults(results: SearchResults): boolean;
    /**
     * Emits product search results in case when the config property `displayProducts` is true.
     * Otherwise it emits an empty object.
     */
    protected getProductResults(config: SearchBoxConfig): Observable<ProductSearchPage>;
    /**
     * Loads suggestions from the backend. In case there's no suggestion
     * available, we try to get an exact match suggestion.
     */
    protected getProductSuggestions(config: SearchBoxConfig): Observable<string[]>;
    /**
     * Whenever there is at least 1 product, we simulate
     * a suggestion to provide easy access to the search result page
     */
    protected getExactSuggestion(config: SearchBoxConfig): Observable<string | undefined>;
    /**
     * Emits a 'no match' message, in case the product search results and search suggestions are empty.
     * Otherwise it emits null.
     */
    protected getSearchMessage(config: SearchBoxConfig): Observable<string | undefined>;
    /**
     * Navigates to the search result page with a given query
     */
    launchSearchPage(query: string): void;
    private fetchTranslation;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchBoxComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SearchBoxComponentService>;
}
