/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, Optional, } from '@angular/core';
import { PageType, } from '@spartacus/core';
import { of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../cms-components/misc/icon/index';
import * as i0 from "@angular/core";
import * as i1 from "./search-box-component.service";
import * as i2 from "../../../cms-structure/page/model/cms-component-data";
import * as i3 from "@spartacus/core";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
import * as i6 from "../../../shared/components/media/media.component";
import * as i7 from "../../misc/icon/icon.component";
import * as i8 from "./highlight.pipe";
const DEFAULT_SEARCH_BOX_CONFIG = {
    minCharactersBeforeRequest: 1,
    displayProducts: true,
    displaySuggestions: true,
    maxProducts: 5,
    maxSuggestions: 5,
    displayProductImages: true,
};
const SEARCHBOX_IS_ACTIVE = 'searchbox-is-active';
export class SearchBoxComponent {
    /**
     * Sets the search box input field
     */
    set queryText(value) {
        if (value) {
            this.search(value);
        }
    }
    constructor(searchBoxComponentService, componentData, winRef, routingService) {
        this.searchBoxComponentService = searchBoxComponentService;
        this.componentData = componentData;
        this.winRef = winRef;
        this.routingService = routingService;
        this.iconTypes = ICON_TYPE;
        /**
         * In some occasions we need to ignore the close event,
         * for example when we click inside the search result section.
         */
        this.ignoreCloseEvent = false;
        this.chosenWord = '';
        /**
         * Returns the SearchBox configuration. The configuration is driven by multiple
         * layers: default configuration, (optional) backend configuration and (optional)
         * input configuration.
         */
        this.config$ = (this.componentData?.data$ || of({})).pipe(map((config) => {
            const isBool = (obj, prop) => obj[prop] !== 'false' &&
                obj[prop] !== false;
            return {
                ...DEFAULT_SEARCH_BOX_CONFIG,
                ...config,
                displayProducts: isBool(config, 'displayProducts'),
                displayProductImages: isBool(config, 'displayProductImages'),
                displaySuggestions: isBool(config, 'displaySuggestions'),
                // we're merging the (optional) input of this component, but write the merged
                // result back to the input property, as the view logic depends on it.
                ...this.config,
            };
        }), tap((config) => (this.config = config)));
        this.results$ = this.config$.pipe(switchMap((config) => this.searchBoxComponentService.getResults(config)));
    }
    ngOnInit() {
        this.subscription = this.routingService
            .getRouterState()
            .pipe(filter((data) => !data.nextState))
            .subscribe((data) => {
            if (!(data.state.context?.id === 'search' &&
                data.state.context?.type === PageType.CONTENT_PAGE)) {
                this.chosenWord = '';
            }
        });
    }
    /**
     * Closes the searchBox and opens the search result page.
     */
    search(query) {
        this.searchBoxComponentService.search(query, this.config);
        // force the searchBox to open
        this.open();
    }
    /**
     * Opens the type-ahead searchBox
     */
    open() {
        this.searchBoxComponentService.toggleBodyClass(SEARCHBOX_IS_ACTIVE, true);
    }
    /**
     * Dispatch UI events for Suggestion selected
     *
     * @param eventData the data for the event
     */
    dispatchSuggestionEvent(eventData) {
        this.searchBoxComponentService.dispatchSuggestionSelectedEvent(eventData);
    }
    /**
     * Dispatch UI events for Product selected
     *
     * @param eventData the data for the event
     */
    dispatchProductEvent(eventData) {
        this.searchBoxComponentService.dispatchProductSelectedEvent(eventData);
    }
    /**
     * Closes the type-ahead searchBox.
     */
    close(event, force) {
        // Use timeout to detect changes
        setTimeout(() => {
            if ((!this.ignoreCloseEvent && !this.isSearchBoxFocused()) || force) {
                this.blurSearchBox(event);
            }
        });
    }
    blurSearchBox(event) {
        this.searchBoxComponentService.toggleBodyClass(SEARCHBOX_IS_ACTIVE, false);
        if (event && event.target) {
            event.target.blur();
        }
    }
    // Check if focus is on searchbox or result list elements
    isSearchBoxFocused() {
        return (this.getResultElements().includes(this.getFocusedElement()) ||
            this.winRef.document.querySelector('input[aria-label="Search"]') ===
                this.getFocusedElement());
    }
    /**
     * Especially in mobile we do not want the search icon
     * to focus the input again when it's already open.
     * */
    avoidReopen(event) {
        if (this.searchBoxComponentService.hasBodyClass(SEARCHBOX_IS_ACTIVE)) {
            this.close(event);
            event.preventDefault();
        }
    }
    // Return result list as HTMLElement array
    getResultElements() {
        return Array.from(this.winRef.document.querySelectorAll('.products > li a, .suggestions > li a'));
    }
    // Return focused element as HTMLElement
    getFocusedElement() {
        return this.winRef.document.activeElement;
    }
    updateChosenWord(chosenWord) {
        this.chosenWord = chosenWord;
    }
    getFocusedIndex() {
        return this.getResultElements().indexOf(this.getFocusedElement());
    }
    // Focus on previous item in results list
    focusPreviousChild(event) {
        event.preventDefault(); // Negate normal keyscroll
        const [results, focusedIndex] = [
            this.getResultElements(),
            this.getFocusedIndex(),
        ];
        // Focus on last index moving to first
        if (results.length) {
            if (focusedIndex < 1) {
                results[results.length - 1].focus();
            }
            else {
                results[focusedIndex - 1].focus();
            }
        }
    }
    // Focus on next item in results list
    focusNextChild(event) {
        this.open();
        event.preventDefault(); // Negate normal keyscroll
        const [results, focusedIndex] = [
            this.getResultElements(),
            this.getFocusedIndex(),
        ];
        // Focus on first index moving to last
        if (results.length) {
            if (focusedIndex >= results.length - 1) {
                results[0].focus();
            }
            else {
                results[focusedIndex + 1].focus();
            }
        }
    }
    /**
     * Opens the PLP with the given query.
     *
     * TODO: if there's a single product match, we could open the PDP.
     */
    launchSearchResult(event, query) {
        if (!query || query.trim().length === 0) {
            return;
        }
        this.close(event);
        this.searchBoxComponentService.launchSearchPage(query);
    }
    /**
     * Disables closing the search result list.
     */
    disableClose() {
        this.ignoreCloseEvent = true;
    }
    preventDefault(ev) {
        ev.preventDefault();
    }
    /**
     * Clears the search box input field
     */
    clear(el) {
        this.disableClose();
        el.value = '';
        this.searchBoxComponentService.clearResults();
        // Use Timeout to run after blur event to prevent the searchbox from closing on mobile
        setTimeout(() => {
            // Retain focus on input lost by clicking on icon
            el.focus();
            this.ignoreCloseEvent = false;
        });
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
SearchBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SearchBoxComponent, deps: [{ token: i1.SearchBoxComponentService }, { token: i2.CmsComponentData, optional: true }, { token: i3.WindowRef }, { token: i3.RoutingService }], target: i0.ɵɵFactoryTarget.Component });
SearchBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SearchBoxComponent, selector: "cx-searchbox", inputs: { config: "config", queryText: "queryText" }, ngImport: i0, template: "<div [attr.aria-label]=\"'searchBox.productSearch' | cxTranslate\" role=\"search\">\n  <label class=\"searchbox\" [class.dirty]=\"!!searchInput.value\">\n    <input\n      #searchInput\n      [placeholder]=\"'searchBox.placeholder' | cxTranslate\"\n      autocomplete=\"off\"\n      aria-describedby=\"initialDescription\"\n      aria-controls=\"results\"\n      [attr.aria-label]=\"'searchBox.placeholder' | cxTranslate\"\n      (focus)=\"open()\"\n      (click)=\"open()\"\n      (input)=\"search(searchInput.value)\"\n      (blur)=\"close($any($event))\"\n      (keydown.escape)=\"close($any($event))\"\n      (keydown.enter)=\"\n        close($any($event), true);\n        launchSearchResult($any($event), searchInput.value);\n        updateChosenWord(searchInput.value)\n      \"\n      (keydown.arrowup)=\"focusPreviousChild($any($event))\"\n      (keydown.arrowdown)=\"focusNextChild($any($event))\"\n      value=\"{{ chosenWord }}\"\n    />\n\n    <button\n      [attr.aria-label]=\"'common.reset' | cxTranslate\"\n      (mousedown)=\"clear(searchInput)\"\n      (keydown.enter)=\"clear(searchInput)\"\n      class=\"reset\"\n    >\n      <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n    </button>\n\n    <div role=\"presentation\" class=\"search-icon\">\n      <cx-icon [type]=\"iconTypes.SEARCH\"></cx-icon>\n    </div>\n\n    <button\n      [attr.aria-label]=\"'common.search' | cxTranslate\"\n      class=\"search\"\n      (click)=\"open()\"\n    >\n      <cx-icon [type]=\"iconTypes.SEARCH\"></cx-icon>\n    </button>\n  </label>\n</div>\n\n<div\n  *ngIf=\"results$ | async as result\"\n  class=\"results\"\n  id=\"results\"\n  (click)=\"close($any($event), true)\"\n  role=\"dialog\"\n>\n  <div\n    *ngIf=\"result.message\"\n    class=\"message\"\n    [innerHTML]=\"result.message\"\n  ></div>\n\n  <ul\n    class=\"suggestions\"\n    attr.aria-label=\"{{ 'searchBox.ariaLabelSuggestions' | cxTranslate }}\"\n    role=\"listbox\"\n  >\n    <li *ngFor=\"let suggestion of result.suggestions\">\n      <a\n        role=\"option\"\n        [innerHTML]=\"suggestion | cxHighlight: searchInput.value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'search',\n            params: { query: suggestion }\n          } | cxUrl\n        \"\n        (keydown.arrowup)=\"focusPreviousChild($any($event))\"\n        (keydown.arrowdown)=\"focusNextChild($any($event))\"\n        (keydown.enter)=\"close($any($event), true)\"\n        (keydown.escape)=\"close($any($event), true)\"\n        (blur)=\"close($event)\"\n        (mousedown)=\"preventDefault($event)\"\n        (click)=\"\n          dispatchSuggestionEvent({\n            freeText: searchInput.value,\n            selectedSuggestion: suggestion,\n            searchSuggestions: result.suggestions ?? []\n          });\n          updateChosenWord(suggestion)\n        \"\n      >\n      </a>\n    </li>\n  </ul>\n\n  <ul\n    class=\"products\"\n    *ngIf=\"result.products\"\n    attr.aria-label=\"{{ 'searchBox.ariaLabelProducts' | cxTranslate }}\"\n    role=\"listbox\"\n  >\n    <li *ngFor=\"let product of result.products\">\n      <a\n        role=\"option\"\n        [routerLink]=\"\n          {\n            cxRoute: 'product',\n            params: product\n          } | cxUrl\n        \"\n        [class.has-media]=\"config.displayProductImages\"\n        (keydown.arrowup)=\"focusPreviousChild($any($event))\"\n        (keydown.arrowdown)=\"focusNextChild($any($event))\"\n        (keydown.enter)=\"close($any($event), true)\"\n        (keydown.escape)=\"close($any($event), true)\"\n        (blur)=\"close($any($event))\"\n        (mousedown)=\"preventDefault($event)\"\n        (click)=\"\n          dispatchProductEvent({\n            freeText: searchInput.value,\n            productCode: product.code\n          })\n        \"\n      >\n        <cx-media\n          *ngIf=\"config.displayProductImages\"\n          [container]=\"product.images?.PRIMARY\"\n          format=\"thumbnail\"\n          role=\"presentation\"\n        ></cx-media>\n        <div class=\"name\" [innerHTML]=\"product.nameHtml\"></div>\n        <span class=\"price\">{{ product.price?.formattedValue }}</span>\n      </a>\n    </li>\n  </ul>\n  <span id=\"initialDescription\" class=\"cx-visually-hidden\">\n    {{ 'searchBox.initialDescription' | cxTranslate }}\n  </span>\n  <div\n    *ngIf=\"result.suggestions?.length || result.products?.length\"\n    aria-live=\"assertive\"\n    class=\"cx-visually-hidden\"\n  >\n    {{\n      'searchBox.suggestionsResult'\n        | cxTranslate: { count: result.suggestions?.length }\n    }}\n    {{\n      'searchBox.productsResult'\n        | cxTranslate: { count: result.products?.length }\n    }}\n    {{ 'searchBox.initialDescription' | cxTranslate }}\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i6.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: i7.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i8.HighlightPipe, name: "cxHighlight" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SearchBoxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-searchbox', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [attr.aria-label]=\"'searchBox.productSearch' | cxTranslate\" role=\"search\">\n  <label class=\"searchbox\" [class.dirty]=\"!!searchInput.value\">\n    <input\n      #searchInput\n      [placeholder]=\"'searchBox.placeholder' | cxTranslate\"\n      autocomplete=\"off\"\n      aria-describedby=\"initialDescription\"\n      aria-controls=\"results\"\n      [attr.aria-label]=\"'searchBox.placeholder' | cxTranslate\"\n      (focus)=\"open()\"\n      (click)=\"open()\"\n      (input)=\"search(searchInput.value)\"\n      (blur)=\"close($any($event))\"\n      (keydown.escape)=\"close($any($event))\"\n      (keydown.enter)=\"\n        close($any($event), true);\n        launchSearchResult($any($event), searchInput.value);\n        updateChosenWord(searchInput.value)\n      \"\n      (keydown.arrowup)=\"focusPreviousChild($any($event))\"\n      (keydown.arrowdown)=\"focusNextChild($any($event))\"\n      value=\"{{ chosenWord }}\"\n    />\n\n    <button\n      [attr.aria-label]=\"'common.reset' | cxTranslate\"\n      (mousedown)=\"clear(searchInput)\"\n      (keydown.enter)=\"clear(searchInput)\"\n      class=\"reset\"\n    >\n      <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n    </button>\n\n    <div role=\"presentation\" class=\"search-icon\">\n      <cx-icon [type]=\"iconTypes.SEARCH\"></cx-icon>\n    </div>\n\n    <button\n      [attr.aria-label]=\"'common.search' | cxTranslate\"\n      class=\"search\"\n      (click)=\"open()\"\n    >\n      <cx-icon [type]=\"iconTypes.SEARCH\"></cx-icon>\n    </button>\n  </label>\n</div>\n\n<div\n  *ngIf=\"results$ | async as result\"\n  class=\"results\"\n  id=\"results\"\n  (click)=\"close($any($event), true)\"\n  role=\"dialog\"\n>\n  <div\n    *ngIf=\"result.message\"\n    class=\"message\"\n    [innerHTML]=\"result.message\"\n  ></div>\n\n  <ul\n    class=\"suggestions\"\n    attr.aria-label=\"{{ 'searchBox.ariaLabelSuggestions' | cxTranslate }}\"\n    role=\"listbox\"\n  >\n    <li *ngFor=\"let suggestion of result.suggestions\">\n      <a\n        role=\"option\"\n        [innerHTML]=\"suggestion | cxHighlight: searchInput.value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'search',\n            params: { query: suggestion }\n          } | cxUrl\n        \"\n        (keydown.arrowup)=\"focusPreviousChild($any($event))\"\n        (keydown.arrowdown)=\"focusNextChild($any($event))\"\n        (keydown.enter)=\"close($any($event), true)\"\n        (keydown.escape)=\"close($any($event), true)\"\n        (blur)=\"close($event)\"\n        (mousedown)=\"preventDefault($event)\"\n        (click)=\"\n          dispatchSuggestionEvent({\n            freeText: searchInput.value,\n            selectedSuggestion: suggestion,\n            searchSuggestions: result.suggestions ?? []\n          });\n          updateChosenWord(suggestion)\n        \"\n      >\n      </a>\n    </li>\n  </ul>\n\n  <ul\n    class=\"products\"\n    *ngIf=\"result.products\"\n    attr.aria-label=\"{{ 'searchBox.ariaLabelProducts' | cxTranslate }}\"\n    role=\"listbox\"\n  >\n    <li *ngFor=\"let product of result.products\">\n      <a\n        role=\"option\"\n        [routerLink]=\"\n          {\n            cxRoute: 'product',\n            params: product\n          } | cxUrl\n        \"\n        [class.has-media]=\"config.displayProductImages\"\n        (keydown.arrowup)=\"focusPreviousChild($any($event))\"\n        (keydown.arrowdown)=\"focusNextChild($any($event))\"\n        (keydown.enter)=\"close($any($event), true)\"\n        (keydown.escape)=\"close($any($event), true)\"\n        (blur)=\"close($any($event))\"\n        (mousedown)=\"preventDefault($event)\"\n        (click)=\"\n          dispatchProductEvent({\n            freeText: searchInput.value,\n            productCode: product.code\n          })\n        \"\n      >\n        <cx-media\n          *ngIf=\"config.displayProductImages\"\n          [container]=\"product.images?.PRIMARY\"\n          format=\"thumbnail\"\n          role=\"presentation\"\n        ></cx-media>\n        <div class=\"name\" [innerHTML]=\"product.nameHtml\"></div>\n        <span class=\"price\">{{ product.price?.formattedValue }}</span>\n      </a>\n    </li>\n  </ul>\n  <span id=\"initialDescription\" class=\"cx-visually-hidden\">\n    {{ 'searchBox.initialDescription' | cxTranslate }}\n  </span>\n  <div\n    *ngIf=\"result.suggestions?.length || result.products?.length\"\n    aria-live=\"assertive\"\n    class=\"cx-visually-hidden\"\n  >\n    {{\n      'searchBox.suggestionsResult'\n        | cxTranslate: { count: result.suggestions?.length }\n    }}\n    {{\n      'searchBox.productsResult'\n        | cxTranslate: { count: result.products?.length }\n    }}\n    {{ 'searchBox.initialDescription' | cxTranslate }}\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.SearchBoxComponentService }, { type: i2.CmsComponentData, decorators: [{
                    type: Optional
                }] }, { type: i3.WindowRef }, { type: i3.RoutingService }]; }, propDecorators: { config: [{
                type: Input
            }], queryText: [{
                type: Input,
                args: ['queryText']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL25hdmlnYXRpb24vc2VhcmNoLWJveC9zZWFyY2gtYm94LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbmF2aWdhdGlvbi9zZWFyY2gtYm94L3NlYXJjaC1ib3guY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFHTCxRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVMLFFBQVEsR0FHVCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBYyxFQUFFLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUNBQXlDLENBQUM7Ozs7Ozs7Ozs7QUFTcEUsTUFBTSx5QkFBeUIsR0FBb0I7SUFDakQsMEJBQTBCLEVBQUUsQ0FBQztJQUM3QixlQUFlLEVBQUUsSUFBSTtJQUNyQixrQkFBa0IsRUFBRSxJQUFJO0lBQ3hCLFdBQVcsRUFBRSxDQUFDO0lBQ2QsY0FBYyxFQUFFLENBQUM7SUFDakIsb0JBQW9CLEVBQUUsSUFBSTtDQUMzQixDQUFDO0FBQ0YsTUFBTSxtQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQztBQU9sRCxNQUFNLE9BQU8sa0JBQWtCO0lBRzdCOztPQUVHO0lBQ0gsSUFDSSxTQUFTLENBQUMsS0FBYTtRQUN6QixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxN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QyxZQUFZLEVBQUUsQ0FBQztRQUU5QyxzRkFBc0Y7UUFDdEYsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLGlEQUFpRDtZQUNqRCxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7OytHQTFQVSxrQkFBa0I7bUdBQWxCLGtCQUFrQiwwR0M5Qy9CLG9ySkF5SkE7MkZEM0dhLGtCQUFrQjtrQkFMOUIsU0FBUzsrQkFDRSxjQUFjLG1CQUVQLHVCQUF1QixDQUFDLE1BQU07OzBCQTJCNUMsUUFBUTtpR0F4QkYsTUFBTTtzQkFBZCxLQUFLO2dCQU1GLFNBQVM7c0JBRFosS0FBSzt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDbXNTZWFyY2hCb3hDb21wb25lbnQsXG4gIFBhZ2VUeXBlLFxuICBSb3V0aW5nU2VydmljZSxcbiAgV2luZG93UmVmLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUNPTl9UWVBFIH0gZnJvbSAnLi4vLi4vLi4vY21zLWNvbXBvbmVudHMvbWlzYy9pY29uL2luZGV4JztcbmltcG9ydCB7IENtc0NvbXBvbmVudERhdGEgfSBmcm9tICcuLi8uLi8uLi9jbXMtc3RydWN0dXJlL3BhZ2UvbW9kZWwvY21zLWNvbXBvbmVudC1kYXRhJztcbmltcG9ydCB7IFNlYXJjaEJveENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC1ib3gtY29tcG9uZW50LnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgU2VhcmNoQm94UHJvZHVjdFNlbGVjdGVkRXZlbnQsXG4gIFNlYXJjaEJveFN1Z2dlc3Rpb25TZWxlY3RlZEV2ZW50LFxufSBmcm9tICcuL3NlYXJjaC1ib3guZXZlbnRzJztcbmltcG9ydCB7IFNlYXJjaEJveENvbmZpZywgU2VhcmNoUmVzdWx0cyB9IGZyb20gJy4vc2VhcmNoLWJveC5tb2RlbCc7XG5cbmNvbnN0IERFRkFVTFRfU0VBUkNIX0JPWF9DT05GSUc6IFNlYXJjaEJveENvbmZpZyA9IHtcbiAgbWluQ2hhcmFjdGVyc0JlZm9yZVJlcXVlc3Q6IDEsXG4gIGRpc3BsYXlQcm9kdWN0czogdHJ1ZSxcbiAgZGlzcGxheVN1Z2dlc3Rpb25zOiB0cnVlLFxuICBtYXhQcm9kdWN0czogNSxcbiAgbWF4U3VnZ2VzdGlvbnM6IDUsXG4gIGRpc3BsYXlQcm9kdWN0SW1hZ2VzOiB0cnVlLFxufTtcbmNvbnN0IFNFQVJDSEJPWF9JU19BQ1RJVkUgPSAnc2VhcmNoYm94LWlzLWFjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXNlYXJjaGJveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtYm94LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaEJveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgY29uZmlnOiBTZWFyY2hCb3hDb25maWc7XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlYXJjaCBib3ggaW5wdXQgZmllbGRcbiAgICovXG4gIEBJbnB1dCgncXVlcnlUZXh0JylcbiAgc2V0IHF1ZXJ5VGV4dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNlYXJjaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgaWNvblR5cGVzID0gSUNPTl9UWVBFO1xuXG4gIC8qKlxuICAgKiBJbiBzb21lIG9jY2FzaW9ucyB3ZSBuZWVkIHRvIGlnbm9yZSB0aGUgY2xvc2UgZXZlbnQsXG4gICAqIGZvciBleGFtcGxlIHdoZW4gd2UgY2xpY2sgaW5zaWRlIHRoZSBzZWFyY2ggcmVzdWx0IHNlY3Rpb24uXG4gICAqL1xuICBwcml2YXRlIGlnbm9yZUNsb3NlRXZlbnQgPSBmYWxzZTtcbiAgY2hvc2VuV29yZCA9ICcnO1xuICBwdWJsaWMgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHNlYXJjaEJveENvbXBvbmVudFNlcnZpY2U6IFNlYXJjaEJveENvbXBvbmVudFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKClcbiAgICBwcm90ZWN0ZWQgY29tcG9uZW50RGF0YTogQ21zQ29tcG9uZW50RGF0YTxDbXNTZWFyY2hCb3hDb21wb25lbnQ+LFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgU2VhcmNoQm94IGNvbmZpZ3VyYXRpb24uIFRoZSBjb25maWd1cmF0aW9uIGlzIGRyaXZlbiBieSBtdWx0aXBsZVxuICAgKiBsYXllcnM6IGRlZmF1bHQgY29uZmlndXJhdGlvbiwgKG9wdGlvbmFsKSBiYWNrZW5kIGNvbmZpZ3VyYXRpb24gYW5kIChvcHRpb25hbClcbiAgICogaW5wdXQgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBjb25maWckOiBPYnNlcnZhYmxlPFNlYXJjaEJveENvbmZpZz4gPSAoXG4gICAgdGhpcy5jb21wb25lbnREYXRhPy5kYXRhJCB8fCBvZih7fSBhcyBhbnkpXG4gICkucGlwZShcbiAgICBtYXAoKGNvbmZpZykgPT4ge1xuICAgICAgY29uc3QgaXNCb29sID0gKG9iajogU2VhcmNoQm94Q29uZmlnLCBwcm9wOiBzdHJpbmcpOiBib29sZWFuID0+XG4gICAgICAgIG9ialtwcm9wIGFzIGtleW9mIFNlYXJjaEJveENvbmZpZ10gIT09ICdmYWxzZScgJiZcbiAgICAgICAgb2JqW3Byb3AgYXMga2V5b2YgU2VhcmNoQm94Q29uZmlnXSAhPT0gZmFsc2U7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLkRFRkFVTFRfU0VBUkNIX0JPWF9DT05GSUcsXG4gICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgZGlzcGxheVByb2R1Y3RzOiBpc0Jvb2woY29uZmlnLCAnZGlzcGxheVByb2R1Y3RzJyksXG4gICAgICAgIGRpc3BsYXlQcm9kdWN0SW1hZ2VzOiBpc0Jvb2woY29uZmlnLCAnZGlzcGxheVByb2R1Y3RJbWFnZXMnKSxcbiAgICAgICAgZGlzcGxheVN1Z2dlc3Rpb25zOiBpc0Jvb2woY29uZmlnLCAnZGlzcGxheVN1Z2dlc3Rpb25zJyksXG4gICAgICAgIC8vIHdlJ3JlIG1lcmdpbmcgdGhlIChvcHRpb25hbCkgaW5wdXQgb2YgdGhpcyBjb21wb25lbnQsIGJ1dCB3cml0ZSB0aGUgbWVyZ2VkXG4gICAgICAgIC8vIHJlc3VsdCBiYWNrIHRvIHRoZSBpbnB1dCBwcm9wZXJ0eSwgYXMgdGhlIHZpZXcgbG9naWMgZGVwZW5kcyBvbiBpdC5cbiAgICAgICAgLi4udGhpcy5jb25maWcsXG4gICAgICB9O1xuICAgIH0pLFxuICAgIHRhcCgoY29uZmlnKSA9PiAodGhpcy5jb25maWcgPSBjb25maWcpKVxuICApO1xuXG4gIHJlc3VsdHMkOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdHM+ID0gdGhpcy5jb25maWckLnBpcGUoXG4gICAgc3dpdGNoTWFwKChjb25maWcpID0+IHRoaXMuc2VhcmNoQm94Q29tcG9uZW50U2VydmljZS5nZXRSZXN1bHRzKGNvbmZpZykpXG4gICk7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRpbmdTZXJ2aWNlXG4gICAgICAuZ2V0Um91dGVyU3RhdGUoKVxuICAgICAgLnBpcGUoZmlsdGVyKChkYXRhKSA9PiAhZGF0YS5uZXh0U3RhdGUpKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIShcbiAgICAgICAgICAgIGRhdGEuc3RhdGUuY29udGV4dD8uaWQgPT09ICdzZWFyY2gnICYmXG4gICAgICAgICAgICBkYXRhLnN0YXRlLmNvbnRleHQ/LnR5cGUgPT09IFBhZ2VUeXBlLkNPTlRFTlRfUEFHRVxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jaG9zZW5Xb3JkID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgc2VhcmNoQm94IGFuZCBvcGVucyB0aGUgc2VhcmNoIHJlc3VsdCBwYWdlLlxuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnNlYXJjaEJveENvbXBvbmVudFNlcnZpY2Uuc2VhcmNoKHF1ZXJ5LCB0aGlzLmNvbmZpZyk7XG4gICAgLy8gZm9yY2UgdGhlIHNlYXJjaEJveCB0byBvcGVuXG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIHR5cGUtYWhlYWQgc2VhcmNoQm94XG4gICAqL1xuICBvcGVuKCk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoQm94Q29tcG9uZW50U2VydmljZS50b2dnbGVCb2R5Q2xhc3MoU0VBUkNIQk9YX0lTX0FDVElWRSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2ggVUkgZXZlbnRzIGZvciBTdWdnZXN0aW9uIHNlbGVjdGVkXG4gICAqXG4gICAqIEBwYXJhbSBldmVudERhdGEgdGhlIGRhdGEgZm9yIHRoZSBldmVudFxuICAgKi9cbiAgZGlzcGF0Y2hTdWdnZXN0aW9uRXZlbnQoZXZlbnREYXRhOiBTZWFyY2hCb3hTdWdnZXN0aW9uU2VsZWN0ZWRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoQm94Q29tcG9uZW50U2VydmljZS5kaXNwYXRjaFN1Z2dlc3Rpb25TZWxlY3RlZEV2ZW50KGV2ZW50RGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2ggVUkgZXZlbnRzIGZvciBQcm9kdWN0IHNlbGVjdGVkXG4gICAqXG4gICAqIEBwYXJhbSBldmVudERhdGEgdGhlIGRhdGEgZm9yIHRoZSBldmVudFxuICAgKi9cbiAgZGlzcGF0Y2hQcm9kdWN0RXZlbnQoZXZlbnREYXRhOiBTZWFyY2hCb3hQcm9kdWN0U2VsZWN0ZWRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoQm94Q29tcG9uZW50U2VydmljZS5kaXNwYXRjaFByb2R1Y3RTZWxlY3RlZEV2ZW50KGV2ZW50RGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSB0eXBlLWFoZWFkIHNlYXJjaEJveC5cbiAgICovXG4gIGNsb3NlKGV2ZW50OiBVSUV2ZW50LCBmb3JjZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAvLyBVc2UgdGltZW91dCB0byBkZXRlY3QgY2hhbmdlc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCghdGhpcy5pZ25vcmVDbG9zZUV2ZW50ICYmICF0aGlzLmlzU2VhcmNoQm94Rm9jdXNlZCgpKSB8fCBmb3JjZSkge1xuICAgICAgICB0aGlzLmJsdXJTZWFyY2hCb3goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGJsdXJTZWFyY2hCb3goZXZlbnQ6IFVJRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLnNlYXJjaEJveENvbXBvbmVudFNlcnZpY2UudG9nZ2xlQm9keUNsYXNzKFNFQVJDSEJPWF9JU19BQ1RJVkUsIGZhbHNlKTtcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQudGFyZ2V0KSB7XG4gICAgICAoPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldCkuYmx1cigpO1xuICAgIH1cbiAgfVxuXG4gIC8vIENoZWNrIGlmIGZvY3VzIGlzIG9uIHNlYXJjaGJveCBvciByZXN1bHQgbGlzdCBlbGVtZW50c1xuICBwcml2YXRlIGlzU2VhcmNoQm94Rm9jdXNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRSZXN1bHRFbGVtZW50cygpLmluY2x1ZGVzKHRoaXMuZ2V0Rm9jdXNlZEVsZW1lbnQoKSkgfHxcbiAgICAgIHRoaXMud2luUmVmLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W2FyaWEtbGFiZWw9XCJTZWFyY2hcIl0nKSA9PT1cbiAgICAgICAgdGhpcy5nZXRGb2N1c2VkRWxlbWVudCgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFc3BlY2lhbGx5IGluIG1vYmlsZSB3ZSBkbyBub3Qgd2FudCB0aGUgc2VhcmNoIGljb25cbiAgICogdG8gZm9jdXMgdGhlIGlucHV0IGFnYWluIHdoZW4gaXQncyBhbHJlYWR5IG9wZW4uXG4gICAqICovXG4gIGF2b2lkUmVvcGVuKGV2ZW50OiBVSUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VhcmNoQm94Q29tcG9uZW50U2VydmljZS5oYXNCb2R5Q2xhc3MoU0VBUkNIQk9YX0lTX0FDVElWRSkpIHtcbiAgICAgIHRoaXMuY2xvc2UoZXZlbnQpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm4gcmVzdWx0IGxpc3QgYXMgSFRNTEVsZW1lbnQgYXJyYXlcbiAgcHJpdmF0ZSBnZXRSZXN1bHRFbGVtZW50cygpOiBIVE1MRWxlbWVudFtdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShcbiAgICAgIHRoaXMud2luUmVmLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICcucHJvZHVjdHMgPiBsaSBhLCAuc3VnZ2VzdGlvbnMgPiBsaSBhJ1xuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvLyBSZXR1cm4gZm9jdXNlZCBlbGVtZW50IGFzIEhUTUxFbGVtZW50XG4gIHByaXZhdGUgZ2V0Rm9jdXNlZEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiA8SFRNTEVsZW1lbnQ+dGhpcy53aW5SZWYuZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgfVxuXG4gIHVwZGF0ZUNob3NlbldvcmQoY2hvc2VuV29yZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jaG9zZW5Xb3JkID0gY2hvc2VuV29yZDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Rm9jdXNlZEluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVzdWx0RWxlbWVudHMoKS5pbmRleE9mKHRoaXMuZ2V0Rm9jdXNlZEVsZW1lbnQoKSk7XG4gIH1cblxuICAvLyBGb2N1cyBvbiBwcmV2aW91cyBpdGVtIGluIHJlc3VsdHMgbGlzdFxuICBmb2N1c1ByZXZpb3VzQ2hpbGQoZXZlbnQ6IFVJRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBOZWdhdGUgbm9ybWFsIGtleXNjcm9sbFxuICAgIGNvbnN0IFtyZXN1bHRzLCBmb2N1c2VkSW5kZXhdID0gW1xuICAgICAgdGhpcy5nZXRSZXN1bHRFbGVtZW50cygpLFxuICAgICAgdGhpcy5nZXRGb2N1c2VkSW5kZXgoKSxcbiAgICBdO1xuICAgIC8vIEZvY3VzIG9uIGxhc3QgaW5kZXggbW92aW5nIHRvIGZpcnN0XG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICBpZiAoZm9jdXNlZEluZGV4IDwgMSkge1xuICAgICAgICByZXN1bHRzW3Jlc3VsdHMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdHNbZm9jdXNlZEluZGV4IC0gMV0uZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBGb2N1cyBvbiBuZXh0IGl0ZW0gaW4gcmVzdWx0cyBsaXN0XG4gIGZvY3VzTmV4dENoaWxkKGV2ZW50OiBVSUV2ZW50KSB7XG4gICAgdGhpcy5vcGVuKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gTmVnYXRlIG5vcm1hbCBrZXlzY3JvbGxcbiAgICBjb25zdCBbcmVzdWx0cywgZm9jdXNlZEluZGV4XSA9IFtcbiAgICAgIHRoaXMuZ2V0UmVzdWx0RWxlbWVudHMoKSxcbiAgICAgIHRoaXMuZ2V0Rm9jdXNlZEluZGV4KCksXG4gICAgXTtcbiAgICAvLyBGb2N1cyBvbiBmaXJzdCBpbmRleCBtb3ZpbmcgdG8gbGFzdFxuICAgIGlmIChyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgaWYgKGZvY3VzZWRJbmRleCA+PSByZXN1bHRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgcmVzdWx0c1swXS5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0c1tmb2N1c2VkSW5kZXggKyAxXS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgUExQIHdpdGggdGhlIGdpdmVuIHF1ZXJ5LlxuICAgKlxuICAgKiBUT0RPOiBpZiB0aGVyZSdzIGEgc2luZ2xlIHByb2R1Y3QgbWF0Y2gsIHdlIGNvdWxkIG9wZW4gdGhlIFBEUC5cbiAgICovXG4gIGxhdW5jaFNlYXJjaFJlc3VsdChldmVudDogVUlFdmVudCwgcXVlcnk6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghcXVlcnkgfHwgcXVlcnkudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNsb3NlKGV2ZW50KTtcbiAgICB0aGlzLnNlYXJjaEJveENvbXBvbmVudFNlcnZpY2UubGF1bmNoU2VhcmNoUGFnZShxdWVyeSk7XG4gIH1cblxuICAvKipcbiAgICogRGlzYWJsZXMgY2xvc2luZyB0aGUgc2VhcmNoIHJlc3VsdCBsaXN0LlxuICAgKi9cbiAgZGlzYWJsZUNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuaWdub3JlQ2xvc2VFdmVudCA9IHRydWU7XG4gIH1cblxuICBwcmV2ZW50RGVmYXVsdChldjogVUlFdmVudCk6IHZvaWQge1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBzZWFyY2ggYm94IGlucHV0IGZpZWxkXG4gICAqL1xuICBjbGVhcihlbDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZUNsb3NlKCk7XG4gICAgZWwudmFsdWUgPSAnJztcbiAgICB0aGlzLnNlYXJjaEJveENvbXBvbmVudFNlcnZpY2UuY2xlYXJSZXN1bHRzKCk7XG5cbiAgICAvLyBVc2UgVGltZW91dCB0byBydW4gYWZ0ZXIgYmx1ciBldmVudCB0byBwcmV2ZW50IHRoZSBzZWFyY2hib3ggZnJvbSBjbG9zaW5nIG9uIG1vYmlsZVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gUmV0YWluIGZvY3VzIG9uIGlucHV0IGxvc3QgYnkgY2xpY2tpbmcgb24gaWNvblxuICAgICAgZWwuZm9jdXMoKTtcbiAgICAgIHRoaXMuaWdub3JlQ2xvc2VFdmVudCA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxkaXYgW2F0dHIuYXJpYS1sYWJlbF09XCInc2VhcmNoQm94LnByb2R1Y3RTZWFyY2gnIHwgY3hUcmFuc2xhdGVcIiByb2xlPVwic2VhcmNoXCI+XG4gIDxsYWJlbCBjbGFzcz1cInNlYXJjaGJveFwiIFtjbGFzcy5kaXJ0eV09XCIhIXNlYXJjaElucHV0LnZhbHVlXCI+XG4gICAgPGlucHV0XG4gICAgICAjc2VhcmNoSW5wdXRcbiAgICAgIFtwbGFjZWhvbGRlcl09XCInc2VhcmNoQm94LnBsYWNlaG9sZGVyJyB8IGN4VHJhbnNsYXRlXCJcbiAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICBhcmlhLWRlc2NyaWJlZGJ5PVwiaW5pdGlhbERlc2NyaXB0aW9uXCJcbiAgICAgIGFyaWEtY29udHJvbHM9XCJyZXN1bHRzXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ3NlYXJjaEJveC5wbGFjZWhvbGRlcicgfCBjeFRyYW5zbGF0ZVwiXG4gICAgICAoZm9jdXMpPVwib3BlbigpXCJcbiAgICAgIChjbGljayk9XCJvcGVuKClcIlxuICAgICAgKGlucHV0KT1cInNlYXJjaChzZWFyY2hJbnB1dC52YWx1ZSlcIlxuICAgICAgKGJsdXIpPVwiY2xvc2UoJGFueSgkZXZlbnQpKVwiXG4gICAgICAoa2V5ZG93bi5lc2NhcGUpPVwiY2xvc2UoJGFueSgkZXZlbnQpKVwiXG4gICAgICAoa2V5ZG93bi5lbnRlcik9XCJcbiAgICAgICAgY2xvc2UoJGFueSgkZXZlbnQpLCB0cnVlKTtcbiAgICAgICAgbGF1bmNoU2VhcmNoUmVzdWx0KCRhbnkoJGV2ZW50KSwgc2VhcmNoSW5wdXQudmFsdWUpO1xuICAgICAgICB1cGRhdGVDaG9zZW5Xb3JkKHNlYXJjaElucHV0LnZhbHVlKVxuICAgICAgXCJcbiAgICAgIChrZXlkb3duLmFycm93dXApPVwiZm9jdXNQcmV2aW91c0NoaWxkKCRhbnkoJGV2ZW50KSlcIlxuICAgICAgKGtleWRvd24uYXJyb3dkb3duKT1cImZvY3VzTmV4dENoaWxkKCRhbnkoJGV2ZW50KSlcIlxuICAgICAgdmFsdWU9XCJ7eyBjaG9zZW5Xb3JkIH19XCJcbiAgICAvPlxuXG4gICAgPGJ1dHRvblxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInY29tbW9uLnJlc2V0JyB8IGN4VHJhbnNsYXRlXCJcbiAgICAgIChtb3VzZWRvd24pPVwiY2xlYXIoc2VhcmNoSW5wdXQpXCJcbiAgICAgIChrZXlkb3duLmVudGVyKT1cImNsZWFyKHNlYXJjaElucHV0KVwiXG4gICAgICBjbGFzcz1cInJlc2V0XCJcbiAgICA+XG4gICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZXMuUkVTRVRcIj48L2N4LWljb24+XG4gICAgPC9idXR0b24+XG5cbiAgICA8ZGl2IHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cInNlYXJjaC1pY29uXCI+XG4gICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZXMuU0VBUkNIXCI+PC9jeC1pY29uPlxuICAgIDwvZGl2PlxuXG4gICAgPGJ1dHRvblxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInY29tbW9uLnNlYXJjaCcgfCBjeFRyYW5zbGF0ZVwiXG4gICAgICBjbGFzcz1cInNlYXJjaFwiXG4gICAgICAoY2xpY2spPVwib3BlbigpXCJcbiAgICA+XG4gICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZXMuU0VBUkNIXCI+PC9jeC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICA8L2xhYmVsPlxuPC9kaXY+XG5cbjxkaXZcbiAgKm5nSWY9XCJyZXN1bHRzJCB8IGFzeW5jIGFzIHJlc3VsdFwiXG4gIGNsYXNzPVwicmVzdWx0c1wiXG4gIGlkPVwicmVzdWx0c1wiXG4gIChjbGljayk9XCJjbG9zZSgkYW55KCRldmVudCksIHRydWUpXCJcbiAgcm9sZT1cImRpYWxvZ1wiXG4+XG4gIDxkaXZcbiAgICAqbmdJZj1cInJlc3VsdC5tZXNzYWdlXCJcbiAgICBjbGFzcz1cIm1lc3NhZ2VcIlxuICAgIFtpbm5lckhUTUxdPVwicmVzdWx0Lm1lc3NhZ2VcIlxuICA+PC9kaXY+XG5cbiAgPHVsXG4gICAgY2xhc3M9XCJzdWdnZXN0aW9uc1wiXG4gICAgYXR0ci5hcmlhLWxhYmVsPVwie3sgJ3NlYXJjaEJveC5hcmlhTGFiZWxTdWdnZXN0aW9ucycgfCBjeFRyYW5zbGF0ZSB9fVwiXG4gICAgcm9sZT1cImxpc3Rib3hcIlxuICA+XG4gICAgPGxpICpuZ0Zvcj1cImxldCBzdWdnZXN0aW9uIG9mIHJlc3VsdC5zdWdnZXN0aW9uc1wiPlxuICAgICAgPGFcbiAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwic3VnZ2VzdGlvbiB8IGN4SGlnaGxpZ2h0OiBzZWFyY2hJbnB1dC52YWx1ZVwiXG4gICAgICAgIFtyb3V0ZXJMaW5rXT1cIlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGN4Um91dGU6ICdzZWFyY2gnLFxuICAgICAgICAgICAgcGFyYW1zOiB7IHF1ZXJ5OiBzdWdnZXN0aW9uIH1cbiAgICAgICAgICB9IHwgY3hVcmxcbiAgICAgICAgXCJcbiAgICAgICAgKGtleWRvd24uYXJyb3d1cCk9XCJmb2N1c1ByZXZpb3VzQ2hpbGQoJGFueSgkZXZlbnQpKVwiXG4gICAgICAgIChrZXlkb3duLmFycm93ZG93bik9XCJmb2N1c05leHRDaGlsZCgkYW55KCRldmVudCkpXCJcbiAgICAgICAgKGtleWRvd24uZW50ZXIpPVwiY2xvc2UoJGFueSgkZXZlbnQpLCB0cnVlKVwiXG4gICAgICAgIChrZXlkb3duLmVzY2FwZSk9XCJjbG9zZSgkYW55KCRldmVudCksIHRydWUpXCJcbiAgICAgICAgKGJsdXIpPVwiY2xvc2UoJGV2ZW50KVwiXG4gICAgICAgIChtb3VzZWRvd24pPVwicHJldmVudERlZmF1bHQoJGV2ZW50KVwiXG4gICAgICAgIChjbGljayk9XCJcbiAgICAgICAgICBkaXNwYXRjaFN1Z2dlc3Rpb25FdmVudCh7XG4gICAgICAgICAgICBmcmVlVGV4dDogc2VhcmNoSW5wdXQudmFsdWUsXG4gICAgICAgICAgICBzZWxlY3RlZFN1Z2dlc3Rpb246IHN1Z2dlc3Rpb24sXG4gICAgICAgICAgICBzZWFyY2hTdWdnZXN0aW9uczogcmVzdWx0LnN1Z2dlc3Rpb25zID8/IFtdXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdXBkYXRlQ2hvc2VuV29yZChzdWdnZXN0aW9uKVxuICAgICAgICBcIlxuICAgICAgPlxuICAgICAgPC9hPlxuICAgIDwvbGk+XG4gIDwvdWw+XG5cbiAgPHVsXG4gICAgY2xhc3M9XCJwcm9kdWN0c1wiXG4gICAgKm5nSWY9XCJyZXN1bHQucHJvZHVjdHNcIlxuICAgIGF0dHIuYXJpYS1sYWJlbD1cInt7ICdzZWFyY2hCb3guYXJpYUxhYmVsUHJvZHVjdHMnIHwgY3hUcmFuc2xhdGUgfX1cIlxuICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgPlxuICAgIDxsaSAqbmdGb3I9XCJsZXQgcHJvZHVjdCBvZiByZXN1bHQucHJvZHVjdHNcIj5cbiAgICAgIDxhXG4gICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICBbcm91dGVyTGlua109XCJcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjeFJvdXRlOiAncHJvZHVjdCcsXG4gICAgICAgICAgICBwYXJhbXM6IHByb2R1Y3RcbiAgICAgICAgICB9IHwgY3hVcmxcbiAgICAgICAgXCJcbiAgICAgICAgW2NsYXNzLmhhcy1tZWRpYV09XCJjb25maWcuZGlzcGxheVByb2R1Y3RJbWFnZXNcIlxuICAgICAgICAoa2V5ZG93bi5hcnJvd3VwKT1cImZvY3VzUHJldmlvdXNDaGlsZCgkYW55KCRldmVudCkpXCJcbiAgICAgICAgKGtleWRvd24uYXJyb3dkb3duKT1cImZvY3VzTmV4dENoaWxkKCRhbnkoJGV2ZW50KSlcIlxuICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJjbG9zZSgkYW55KCRldmVudCksIHRydWUpXCJcbiAgICAgICAgKGtleWRvd24uZXNjYXBlKT1cImNsb3NlKCRhbnkoJGV2ZW50KSwgdHJ1ZSlcIlxuICAgICAgICAoYmx1cik9XCJjbG9zZSgkYW55KCRldmVudCkpXCJcbiAgICAgICAgKG1vdXNlZG93bik9XCJwcmV2ZW50RGVmYXVsdCgkZXZlbnQpXCJcbiAgICAgICAgKGNsaWNrKT1cIlxuICAgICAgICAgIGRpc3BhdGNoUHJvZHVjdEV2ZW50KHtcbiAgICAgICAgICAgIGZyZWVUZXh0OiBzZWFyY2hJbnB1dC52YWx1ZSxcbiAgICAgICAgICAgIHByb2R1Y3RDb2RlOiBwcm9kdWN0LmNvZGVcbiAgICAgICAgICB9KVxuICAgICAgICBcIlxuICAgICAgPlxuICAgICAgICA8Y3gtbWVkaWFcbiAgICAgICAgICAqbmdJZj1cImNvbmZpZy5kaXNwbGF5UHJvZHVjdEltYWdlc1wiXG4gICAgICAgICAgW2NvbnRhaW5lcl09XCJwcm9kdWN0LmltYWdlcz8uUFJJTUFSWVwiXG4gICAgICAgICAgZm9ybWF0PVwidGh1bWJuYWlsXCJcbiAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgICAgPjwvY3gtbWVkaWE+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCIgW2lubmVySFRNTF09XCJwcm9kdWN0Lm5hbWVIdG1sXCI+PC9kaXY+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicHJpY2VcIj57eyBwcm9kdWN0LnByaWNlPy5mb3JtYXR0ZWRWYWx1ZSB9fTwvc3Bhbj5cbiAgICAgIDwvYT5cbiAgICA8L2xpPlxuICA8L3VsPlxuICA8c3BhbiBpZD1cImluaXRpYWxEZXNjcmlwdGlvblwiIGNsYXNzPVwiY3gtdmlzdWFsbHktaGlkZGVuXCI+XG4gICAge3sgJ3NlYXJjaEJveC5pbml0aWFsRGVzY3JpcHRpb24nIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9zcGFuPlxuICA8ZGl2XG4gICAgKm5nSWY9XCJyZXN1bHQuc3VnZ2VzdGlvbnM/Lmxlbmd0aCB8fCByZXN1bHQucHJvZHVjdHM/Lmxlbmd0aFwiXG4gICAgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCJcbiAgICBjbGFzcz1cImN4LXZpc3VhbGx5LWhpZGRlblwiXG4gID5cbiAgICB7e1xuICAgICAgJ3NlYXJjaEJveC5zdWdnZXN0aW9uc1Jlc3VsdCdcbiAgICAgICAgfCBjeFRyYW5zbGF0ZTogeyBjb3VudDogcmVzdWx0LnN1Z2dlc3Rpb25zPy5sZW5ndGggfVxuICAgIH19XG4gICAge3tcbiAgICAgICdzZWFyY2hCb3gucHJvZHVjdHNSZXN1bHQnXG4gICAgICAgIHwgY3hUcmFuc2xhdGU6IHsgY291bnQ6IHJlc3VsdC5wcm9kdWN0cz8ubGVuZ3RoIH1cbiAgICB9fVxuICAgIHt7ICdzZWFyY2hCb3guaW5pdGlhbERlc2NyaXB0aW9uJyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=