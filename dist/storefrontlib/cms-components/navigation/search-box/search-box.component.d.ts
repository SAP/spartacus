import { OnDestroy, OnInit } from '@angular/core';
import { CmsSearchBoxComponent, RoutingService, WindowRef } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { ICON_TYPE } from '../../../cms-components/misc/icon/index';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { SearchBoxComponentService } from './search-box-component.service';
import { SearchBoxProductSelectedEvent, SearchBoxSuggestionSelectedEvent } from './search-box.events';
import { SearchBoxConfig, SearchResults } from './search-box.model';
import * as i0 from "@angular/core";
export declare class SearchBoxComponent implements OnInit, OnDestroy {
    protected searchBoxComponentService: SearchBoxComponentService;
    protected componentData: CmsComponentData<CmsSearchBoxComponent>;
    protected winRef: WindowRef;
    protected routingService: RoutingService;
    config: SearchBoxConfig;
    /**
     * Sets the search box input field
     */
    set queryText(value: string);
    iconTypes: typeof ICON_TYPE;
    /**
     * In some occasions we need to ignore the close event,
     * for example when we click inside the search result section.
     */
    private ignoreCloseEvent;
    chosenWord: string;
    subscription: Subscription;
    constructor(searchBoxComponentService: SearchBoxComponentService, componentData: CmsComponentData<CmsSearchBoxComponent>, winRef: WindowRef, routingService: RoutingService);
    /**
     * Returns the SearchBox configuration. The configuration is driven by multiple
     * layers: default configuration, (optional) backend configuration and (optional)
     * input configuration.
     */
    protected config$: Observable<SearchBoxConfig>;
    results$: Observable<SearchResults>;
    ngOnInit(): void;
    /**
     * Closes the searchBox and opens the search result page.
     */
    search(query: string): void;
    /**
     * Opens the type-ahead searchBox
     */
    open(): void;
    /**
     * Dispatch UI events for Suggestion selected
     *
     * @param eventData the data for the event
     */
    dispatchSuggestionEvent(eventData: SearchBoxSuggestionSelectedEvent): void;
    /**
     * Dispatch UI events for Product selected
     *
     * @param eventData the data for the event
     */
    dispatchProductEvent(eventData: SearchBoxProductSelectedEvent): void;
    /**
     * Closes the type-ahead searchBox.
     */
    close(event: UIEvent, force?: boolean): void;
    protected blurSearchBox(event: UIEvent): void;
    private isSearchBoxFocused;
    /**
     * Especially in mobile we do not want the search icon
     * to focus the input again when it's already open.
     * */
    avoidReopen(event: UIEvent): void;
    private getResultElements;
    private getFocusedElement;
    updateChosenWord(chosenWord: string): void;
    private getFocusedIndex;
    focusPreviousChild(event: UIEvent): void;
    focusNextChild(event: UIEvent): void;
    /**
     * Opens the PLP with the given query.
     *
     * TODO: if there's a single product match, we could open the PDP.
     */
    launchSearchResult(event: UIEvent, query: string): void;
    /**
     * Disables closing the search result list.
     */
    disableClose(): void;
    preventDefault(ev: UIEvent): void;
    /**
     * Clears the search box input field
     */
    clear(el: HTMLInputElement): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchBoxComponent, [null, { optional: true; }, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchBoxComponent, "cx-searchbox", never, { "config": "config"; "queryText": "queryText"; }, {}, never, never, false, never>;
}
