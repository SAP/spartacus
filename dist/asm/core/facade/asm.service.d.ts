import { Store } from '@ngrx/store';
import { AsmUi, CustomerSearchOptions, CustomerSearchPage } from '@spartacus/asm/root';
import { Observable } from 'rxjs';
import { StateWithAsm } from '../store/asm-state';
import * as i0 from "@angular/core";
export declare class AsmService {
    protected store: Store<StateWithAsm>;
    constructor(store: Store<StateWithAsm>);
    /**
     * Search for customers
     * @param options
     */
    customerSearch(options: CustomerSearchOptions): void;
    /**
     * Reset the customer search result data to the initial state.
     */
    customerSearchReset(): void;
    /**
     * Returns the customer search result data.
     */
    getCustomerSearchResults(): Observable<CustomerSearchPage>;
    /**
     * Returns the customer search result loading status.
     */
    getCustomerSearchResultsLoading(): Observable<boolean>;
    /**
     * Updates the state of the ASM UI
     */
    updateAsmUiState(asmUi: AsmUi): void;
    /**
     * Get the state of the ASM UI
     */
    getAsmUiState(): Observable<AsmUi>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmService>;
}
