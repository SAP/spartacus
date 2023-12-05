import { CxEvent, Suggestion } from '@spartacus/core';
/**
 * Indicates that the user chose a suggestion
 */
export declare class SearchBoxSuggestionSelectedEvent extends CxEvent {
    /**
     * Event's type
     */
    static readonly type = "SearchBoxSuggestionSelectedEvent";
    freeText: string;
    selectedSuggestion: string;
    searchSuggestions: (Suggestion | string)[];
}
/**
 * Indicates that the user chose a product suggestion
 */
export declare class SearchBoxProductSelectedEvent extends CxEvent {
    /**
     * Event's type
     */
    static readonly type = "SearchBoxProductSelectedEvent";
    freeText: string;
    productCode: string;
}
