/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { isNotUndefined, } from '@spartacus/core';
import { combineLatest, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SearchBoxProductSelectedEvent, SearchBoxSuggestionSelectedEvent, } from './search-box.events';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
const HAS_SEARCH_RESULT_CLASS = 'has-searchbox-results';
export class SearchBoxComponentService {
    constructor(searchService, routingService, translationService, winRef, eventService) {
        this.searchService = searchService;
        this.routingService = routingService;
        this.translationService = translationService;
        this.winRef = winRef;
        this.eventService = eventService;
    }
    /**
     * Executes the search for products and suggestions,
     * unless the configuration is setup to not search for
     * products or suggestions.
     */
    search(query, config) {
        if (!query || query === '') {
            this.clearResults();
            return;
        }
        if (config.minCharactersBeforeRequest &&
            query.length < config.minCharactersBeforeRequest) {
            return;
        }
        if (config.displayProducts) {
            this.searchService.search(query, {
                pageSize: config.maxProducts,
            });
        }
        if (config.displaySuggestions) {
            this.searchService.searchSuggestions(query, {
                pageSize: config.maxSuggestions,
            });
        }
    }
    /**
     * Returns an observable with the SearchResults. When there's any
     * result, the body tag will get a classname, so that specific style
     * rules can be applied.
     */
    getResults(config) {
        return combineLatest([
            this.getProductResults(config),
            this.getProductSuggestions(config),
            this.getSearchMessage(config),
        ]).pipe(map(([productResults, suggestions, message]) => {
            return {
                products: productResults ? productResults.products : undefined,
                suggestions,
                message,
            };
        }), tap((results) => this.toggleBodyClass(HAS_SEARCH_RESULT_CLASS, this.hasResults(results))));
    }
    /**
     * Clears the searchbox results, so that old values are
     * no longer emited upon next search.
     */
    clearResults() {
        this.searchService.clearResults();
        this.toggleBodyClass(HAS_SEARCH_RESULT_CLASS, false);
    }
    hasBodyClass(className) {
        return this.winRef.document.body.classList.contains(className);
    }
    toggleBodyClass(className, add) {
        if (add === undefined) {
            this.winRef.document.body.classList.toggle(className);
        }
        else {
            add
                ? this.winRef.document.body.classList.add(className)
                : this.winRef.document.body.classList.remove(className);
        }
    }
    /**
     * Dispatches a searchbox event for product selected
     *
     * @param eventData data for the "SearchBoxProductSelectedEvent"
     */
    dispatchProductSelectedEvent(eventData) {
        this.eventService.dispatch({
            freeText: eventData.freeText,
            productCode: eventData.productCode,
        }, SearchBoxProductSelectedEvent);
    }
    /**
     * Dispatches a searchbox event for suggestion selected
     *
     * @param eventData data for the "SearchBoxSuggestionSelectedEvent"
     */
    dispatchSuggestionSelectedEvent(eventData) {
        this.eventService.dispatch({
            freeText: eventData.freeText,
            selectedSuggestion: eventData.selectedSuggestion,
            searchSuggestions: eventData.searchSuggestions,
        }, SearchBoxSuggestionSelectedEvent);
    }
    /**
     * For search results model, it returns true when:
     * * there is any product OR
     * * the is any search suggestion OR
     * * there is a message.
     *
     * Otherwise it returns false.
     */
    hasResults(results) {
        return ((!!results.products && results.products.length > 0) ||
            (!!results.suggestions && results.suggestions.length > 0) ||
            !!results.message);
    }
    /**
     * Emits product search results in case when the config property `displayProducts` is true.
     * Otherwise it emits an empty object.
     */
    getProductResults(config) {
        if (config.displayProducts) {
            return this.searchService.getResults();
        }
        else {
            return of({});
        }
    }
    /**
     * Loads suggestions from the backend. In case there's no suggestion
     * available, we try to get an exact match suggestion.
     */
    getProductSuggestions(config) {
        if (!config.displaySuggestions) {
            return of([]);
        }
        else {
            return this.searchService.getSuggestionResults().pipe(map((res) => res.map((suggestion) => suggestion.value).filter(isNotUndefined)), switchMap((suggestions) => {
                if (suggestions.length === 0) {
                    return this.getExactSuggestion(config).pipe(map((match) => (match ? [match] : [])));
                }
                else {
                    return of(suggestions);
                }
            }));
        }
    }
    /**
     * Whenever there is at least 1 product, we simulate
     * a suggestion to provide easy access to the search result page
     */
    getExactSuggestion(config) {
        return this.getProductResults(config).pipe(switchMap((productResult) => {
            return productResult.products && productResult.products.length > 0
                ? this.fetchTranslation('searchBox.help.exactMatch', {
                    term: productResult.freeTextSearch,
                })
                : of(undefined);
        }));
    }
    /**
     * Emits a 'no match' message, in case the product search results and search suggestions are empty.
     * Otherwise it emits null.
     */
    getSearchMessage(config) {
        return combineLatest([
            this.getProductResults(config),
            this.getProductSuggestions(config),
        ]).pipe(switchMap(([productResult, suggestions]) => {
            if (productResult &&
                productResult.products &&
                productResult.products.length === 0 &&
                suggestions &&
                suggestions.length === 0) {
                return this.fetchTranslation('searchBox.help.noMatch');
            }
            else {
                return of(undefined);
            }
        }));
    }
    /**
     * Navigates to the search result page with a given query
     */
    launchSearchPage(query) {
        this.routingService.go({
            cxRoute: 'search',
            params: { query },
        });
    }
    fetchTranslation(translationKey, options) {
        return this.translationService.translate(translationKey, options);
    }
}
SearchBoxComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SearchBoxComponentService, deps: [{ token: i1.SearchboxService }, { token: i1.RoutingService }, { token: i1.TranslationService }, { token: i1.WindowRef }, { token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
SearchBoxComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SearchBoxComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SearchBoxComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.SearchboxService }, { type: i1.RoutingService }, { type: i1.TranslationService }, { type: i1.WindowRef }, { type: i1.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJveC1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbmF2aWdhdGlvbi9zZWFyY2gtYm94L3NlYXJjaC1ib3gtY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLGNBQWMsR0FNZixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFDTCw2QkFBNkIsRUFDN0IsZ0NBQWdDLEdBQ2pDLE1BQU0scUJBQXFCLENBQUM7OztBQUc3QixNQUFNLHVCQUF1QixHQUFHLHVCQUF1QixDQUFDO0FBS3hELE1BQU0sT0FBTyx5QkFBeUI7SUFDcEMsWUFDUyxhQUErQixFQUM1QixjQUE4QixFQUM5QixrQkFBc0MsRUFDdEMsTUFBaUIsRUFDakIsWUFBMEI7UUFKN0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQzVCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDbkMsQ0FBQztJQUVKOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsS0FBYSxFQUFFLE1BQXVCO1FBQzNDLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsT0FBTztTQUNS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QU0sS0FBSyxDQUFDO2dCQUNuQyxXQUFXO2dCQUNYLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUN4QjtnQkFDQSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2FBQ3hEO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQixDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7WUFDckIsT0FBTyxFQUFFLFFBQVE7WUFDakIsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFO1NBQ2xCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxnQkFBZ0IsQ0FDdEIsY0FBc0IsRUFDdEIsT0FBYTtRQUViLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7c0hBN09VLHlCQUF5QjswSEFBekIseUJBQXlCLGNBRnhCLE1BQU07MkZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEV2ZW50U2VydmljZSxcbiAgaXNOb3RVbmRlZmluZWQsXG4gIFByb2R1Y3RTZWFyY2hQYWdlLFxuICBSb3V0aW5nU2VydmljZSxcbiAgU2VhcmNoYm94U2VydmljZSxcbiAgVHJhbnNsYXRpb25TZXJ2aWNlLFxuICBXaW5kb3dSZWYsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIFNlYXJjaEJveFByb2R1Y3RTZWxlY3RlZEV2ZW50LFxuICBTZWFyY2hCb3hTdWdnZXN0aW9uU2VsZWN0ZWRFdmVudCxcbn0gZnJvbSAnLi9zZWFyY2gtYm94LmV2ZW50cyc7XG5pbXBvcnQgeyBTZWFyY2hCb3hDb25maWcsIFNlYXJjaFJlc3VsdHMgfSBmcm9tICcuL3NlYXJjaC1ib3gubW9kZWwnO1xuXG5jb25zdCBIQVNfU0VBUkNIX1JFU1VMVF9DTEFTUyA9ICdoYXMtc2VhcmNoYm94LXJlc3VsdHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQm94Q29tcG9uZW50U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hib3hTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uU2VydmljZTogVHJhbnNsYXRpb25TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyB0aGUgc2VhcmNoIGZvciBwcm9kdWN0cyBhbmQgc3VnZ2VzdGlvbnMsXG4gICAqIHVubGVzcyB0aGUgY29uZmlndXJhdGlvbiBpcyBzZXR1cCB0byBub3Qgc2VhcmNoIGZvclxuICAgKiBwcm9kdWN0cyBvciBzdWdnZXN0aW9ucy5cbiAgICovXG4gIHNlYXJjaChxdWVyeTogc3RyaW5nLCBjb25maWc6IFNlYXJjaEJveENvbmZpZyk6IHZvaWQge1xuICAgIGlmICghcXVlcnkgfHwgcXVlcnkgPT09ICcnKSB7XG4gICAgICB0aGlzLmNsZWFyUmVzdWx0cygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGNvbmZpZy5taW5DaGFyYWN0ZXJzQmVmb3JlUmVxdWVzdCAmJlxuICAgICAgcXVlcnkubGVuZ3RoIDwgY29uZmlnLm1pbkNoYXJhY3RlcnNCZWZvcmVSZXF1ZXN0XG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5kaXNwbGF5UHJvZHVjdHMpIHtcbiAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2gocXVlcnksIHtcbiAgICAgICAgcGFnZVNpemU6IGNvbmZpZy5tYXhQcm9kdWN0cyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuZGlzcGxheVN1Z2dlc3Rpb25zKSB7XG4gICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoU3VnZ2VzdGlvbnMocXVlcnksIHtcbiAgICAgICAgcGFnZVNpemU6IGNvbmZpZy5tYXhTdWdnZXN0aW9ucyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgd2l0aCB0aGUgU2VhcmNoUmVzdWx0cy4gV2hlbiB0aGVyZSdzIGFueVxuICAgKiByZXN1bHQsIHRoZSBib2R5IHRhZyB3aWxsIGdldCBhIGNsYXNzbmFtZSwgc28gdGhhdCBzcGVjaWZpYyBzdHlsZVxuICAgKiBydWxlcyBjYW4gYmUgYXBwbGllZC5cbiAgICovXG4gIGdldFJlc3VsdHMoY29uZmlnOiBTZWFyY2hCb3hDb25maWcpOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdHM+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLmdldFByb2R1Y3RSZXN1bHRzKGNvbmZpZyksXG4gICAgICB0aGlzLmdldFByb2R1Y3RTdWdnZXN0aW9ucyhjb25maWcpLFxuICAgICAgdGhpcy5nZXRTZWFyY2hNZXNzYWdlKGNvbmZpZyksXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW3Byb2R1Y3RSZXN1bHRzLCBzdWdnZXN0aW9ucywgbWVzc2FnZV0pID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcm9kdWN0czogcHJvZHVjdFJlc3VsdHMgPyBwcm9kdWN0UmVzdWx0cy5wcm9kdWN0cyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdWdnZXN0aW9ucyxcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICB9O1xuICAgICAgfSksXG4gICAgICB0YXAoKHJlc3VsdHMpID0+XG4gICAgICAgIHRoaXMudG9nZ2xlQm9keUNsYXNzKEhBU19TRUFSQ0hfUkVTVUxUX0NMQVNTLCB0aGlzLmhhc1Jlc3VsdHMocmVzdWx0cykpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIHNlYXJjaGJveCByZXN1bHRzLCBzbyB0aGF0IG9sZCB2YWx1ZXMgYXJlXG4gICAqIG5vIGxvbmdlciBlbWl0ZWQgdXBvbiBuZXh0IHNlYXJjaC5cbiAgICovXG4gIGNsZWFyUmVzdWx0cygpIHtcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UuY2xlYXJSZXN1bHRzKCk7XG4gICAgdGhpcy50b2dnbGVCb2R5Q2xhc3MoSEFTX1NFQVJDSF9SRVNVTFRfQ0xBU1MsIGZhbHNlKTtcbiAgfVxuXG4gIGhhc0JvZHlDbGFzcyhjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLndpblJlZi5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9XG5cbiAgdG9nZ2xlQm9keUNsYXNzKGNsYXNzTmFtZTogc3RyaW5nLCBhZGQ/OiBib29sZWFuKSB7XG4gICAgaWYgKGFkZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLndpblJlZi5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkXG4gICAgICAgID8gdGhpcy53aW5SZWYuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSlcbiAgICAgICAgOiB0aGlzLndpblJlZi5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhIHNlYXJjaGJveCBldmVudCBmb3IgcHJvZHVjdCBzZWxlY3RlZFxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnREYXRhIGRhdGEgZm9yIHRoZSBcIlNlYXJjaEJveFByb2R1Y3RTZWxlY3RlZEV2ZW50XCJcbiAgICovXG4gIGRpc3BhdGNoUHJvZHVjdFNlbGVjdGVkRXZlbnQoZXZlbnREYXRhOiBTZWFyY2hCb3hQcm9kdWN0U2VsZWN0ZWRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoPFNlYXJjaEJveFByb2R1Y3RTZWxlY3RlZEV2ZW50PihcbiAgICAgIHtcbiAgICAgICAgZnJlZVRleHQ6IGV2ZW50RGF0YS5mcmVlVGV4dCxcbiAgICAgICAgcHJvZHVjdENvZGU6IGV2ZW50RGF0YS5wcm9kdWN0Q29kZSxcbiAgICAgIH0sXG4gICAgICBTZWFyY2hCb3hQcm9kdWN0U2VsZWN0ZWRFdmVudFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhIHNlYXJjaGJveCBldmVudCBmb3Igc3VnZ2VzdGlvbiBzZWxlY3RlZFxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnREYXRhIGRhdGEgZm9yIHRoZSBcIlNlYXJjaEJveFN1Z2dlc3Rpb25TZWxlY3RlZEV2ZW50XCJcbiAgICovXG4gIGRpc3BhdGNoU3VnZ2VzdGlvblNlbGVjdGVkRXZlbnQoXG4gICAgZXZlbnREYXRhOiBTZWFyY2hCb3hTdWdnZXN0aW9uU2VsZWN0ZWRFdmVudFxuICApOiB2b2lkIHtcbiAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaDxTZWFyY2hCb3hTdWdnZXN0aW9uU2VsZWN0ZWRFdmVudD4oXG4gICAgICB7XG4gICAgICAgIGZyZWVUZXh0OiBldmVudERhdGEuZnJlZVRleHQsXG4gICAgICAgIHNlbGVjdGVkU3VnZ2VzdGlvbjogZXZlbnREYXRhLnNlbGVjdGVkU3VnZ2VzdGlvbixcbiAgICAgICAgc2VhcmNoU3VnZ2VzdGlvbnM6IGV2ZW50RGF0YS5zZWFyY2hTdWdnZXN0aW9ucyxcbiAgICAgIH0sXG4gICAgICBTZWFyY2hCb3hTdWdnZXN0aW9uU2VsZWN0ZWRFdmVudFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIHNlYXJjaCByZXN1bHRzIG1vZGVsLCBpdCByZXR1cm5zIHRydWUgd2hlbjpcbiAgICogKiB0aGVyZSBpcyBhbnkgcHJvZHVjdCBPUlxuICAgKiAqIHRoZSBpcyBhbnkgc2VhcmNoIHN1Z2dlc3Rpb24gT1JcbiAgICogKiB0aGVyZSBpcyBhIG1lc3NhZ2UuXG4gICAqXG4gICAqIE90aGVyd2lzZSBpdCByZXR1cm5zIGZhbHNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGhhc1Jlc3VsdHMocmVzdWx0czogU2VhcmNoUmVzdWx0cyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAoISFyZXN1bHRzLnByb2R1Y3RzICYmIHJlc3VsdHMucHJvZHVjdHMubGVuZ3RoID4gMCkgfHxcbiAgICAgICghIXJlc3VsdHMuc3VnZ2VzdGlvbnMgJiYgcmVzdWx0cy5zdWdnZXN0aW9ucy5sZW5ndGggPiAwKSB8fFxuICAgICAgISFyZXN1bHRzLm1lc3NhZ2VcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIHByb2R1Y3Qgc2VhcmNoIHJlc3VsdHMgaW4gY2FzZSB3aGVuIHRoZSBjb25maWcgcHJvcGVydHkgYGRpc3BsYXlQcm9kdWN0c2AgaXMgdHJ1ZS5cbiAgICogT3RoZXJ3aXNlIGl0IGVtaXRzIGFuIGVtcHR5IG9iamVjdC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRQcm9kdWN0UmVzdWx0cyhcbiAgICBjb25maWc6IFNlYXJjaEJveENvbmZpZ1xuICApOiBPYnNlcnZhYmxlPFByb2R1Y3RTZWFyY2hQYWdlPiB7XG4gICAgaWYgKGNvbmZpZy5kaXNwbGF5UHJvZHVjdHMpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2UuZ2V0UmVzdWx0cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2Yoe30pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBzdWdnZXN0aW9ucyBmcm9tIHRoZSBiYWNrZW5kLiBJbiBjYXNlIHRoZXJlJ3Mgbm8gc3VnZ2VzdGlvblxuICAgKiBhdmFpbGFibGUsIHdlIHRyeSB0byBnZXQgYW4gZXhhY3QgbWF0Y2ggc3VnZ2VzdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRQcm9kdWN0U3VnZ2VzdGlvbnMoXG4gICAgY29uZmlnOiBTZWFyY2hCb3hDb25maWdcbiAgKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xuICAgIGlmICghY29uZmlnLmRpc3BsYXlTdWdnZXN0aW9ucykge1xuICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoU2VydmljZS5nZXRTdWdnZXN0aW9uUmVzdWx0cygpLnBpcGUoXG4gICAgICAgIG1hcCgocmVzKSA9PlxuICAgICAgICAgIHJlcy5tYXAoKHN1Z2dlc3Rpb24pID0+IHN1Z2dlc3Rpb24udmFsdWUpLmZpbHRlcihpc05vdFVuZGVmaW5lZClcbiAgICAgICAgKSxcbiAgICAgICAgc3dpdGNoTWFwKChzdWdnZXN0aW9ucykgPT4ge1xuICAgICAgICAgIGlmIChzdWdnZXN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEV4YWN0U3VnZ2VzdGlvbihjb25maWcpLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgobWF0Y2gpID0+IChtYXRjaCA/IFttYXRjaF0gOiBbXSkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2Yoc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW5ldmVyIHRoZXJlIGlzIGF0IGxlYXN0IDEgcHJvZHVjdCwgd2Ugc2ltdWxhdGVcbiAgICogYSBzdWdnZXN0aW9uIHRvIHByb3ZpZGUgZWFzeSBhY2Nlc3MgdG8gdGhlIHNlYXJjaCByZXN1bHQgcGFnZVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEV4YWN0U3VnZ2VzdGlvbihcbiAgICBjb25maWc6IFNlYXJjaEJveENvbmZpZ1xuICApOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmdldFByb2R1Y3RSZXN1bHRzKGNvbmZpZykucGlwZShcbiAgICAgIHN3aXRjaE1hcCgocHJvZHVjdFJlc3VsdCkgPT4ge1xuICAgICAgICByZXR1cm4gcHJvZHVjdFJlc3VsdC5wcm9kdWN0cyAmJiBwcm9kdWN0UmVzdWx0LnByb2R1Y3RzLmxlbmd0aCA+IDBcbiAgICAgICAgICA/IHRoaXMuZmV0Y2hUcmFuc2xhdGlvbignc2VhcmNoQm94LmhlbHAuZXhhY3RNYXRjaCcsIHtcbiAgICAgICAgICAgICAgdGVybTogcHJvZHVjdFJlc3VsdC5mcmVlVGV4dFNlYXJjaCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgOiBvZih1bmRlZmluZWQpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGEgJ25vIG1hdGNoJyBtZXNzYWdlLCBpbiBjYXNlIHRoZSBwcm9kdWN0IHNlYXJjaCByZXN1bHRzIGFuZCBzZWFyY2ggc3VnZ2VzdGlvbnMgYXJlIGVtcHR5LlxuICAgKiBPdGhlcndpc2UgaXQgZW1pdHMgbnVsbC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRTZWFyY2hNZXNzYWdlKFxuICAgIGNvbmZpZzogU2VhcmNoQm94Q29uZmlnXG4gICk6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5nZXRQcm9kdWN0UmVzdWx0cyhjb25maWcpLFxuICAgICAgdGhpcy5nZXRQcm9kdWN0U3VnZ2VzdGlvbnMoY29uZmlnKSxcbiAgICBdKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbcHJvZHVjdFJlc3VsdCwgc3VnZ2VzdGlvbnNdKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9kdWN0UmVzdWx0ICYmXG4gICAgICAgICAgcHJvZHVjdFJlc3VsdC5wcm9kdWN0cyAmJlxuICAgICAgICAgIHByb2R1Y3RSZXN1bHQucHJvZHVjdHMubGVuZ3RoID09PSAwICYmXG4gICAgICAgICAgc3VnZ2VzdGlvbnMgJiZcbiAgICAgICAgICBzdWdnZXN0aW9ucy5sZW5ndGggPT09IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hUcmFuc2xhdGlvbignc2VhcmNoQm94LmhlbHAubm9NYXRjaCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIHRoZSBzZWFyY2ggcmVzdWx0IHBhZ2Ugd2l0aCBhIGdpdmVuIHF1ZXJ5XG4gICAqL1xuICBsYXVuY2hTZWFyY2hQYWdlKHF1ZXJ5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHtcbiAgICAgIGN4Um91dGU6ICdzZWFyY2gnLFxuICAgICAgcGFyYW1zOiB7IHF1ZXJ5IH0sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGZldGNoVHJhbnNsYXRpb24oXG4gICAgdHJhbnNsYXRpb25LZXk6IHN0cmluZyxcbiAgICBvcHRpb25zPzogYW55XG4gICk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZSh0cmFuc2xhdGlvbktleSwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==