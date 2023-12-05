import { Store } from '@ngrx/store';
import { AsmCustomerListFacade, CustomerListsPage, CustomerSearchOptions, CustomerSearchPage } from '@spartacus/asm/root';
import { Query, QueryService, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors/asm.connector';
import { StateWithAsm } from '../store/asm-state';
import * as i0 from "@angular/core";
export declare class AsmCustomerListService implements AsmCustomerListFacade {
    protected queryService: QueryService;
    protected asmConnector: AsmConnector;
    protected store: Store<StateWithAsm>;
    protected customerListQuery$: Query<CustomerListsPage>;
    constructor(queryService: QueryService, asmConnector: AsmConnector, store: Store<StateWithAsm>);
    getCustomerLists(): Observable<CustomerListsPage | undefined>;
    getCustomerListsState(): Observable<QueryState<CustomerListsPage>>;
    /**
     * Search for customers in a customer list
     */
    customerListCustomersSearch(options: CustomerSearchOptions): void;
    /**
     * Returns the customer search result data for a customer list
     */
    getCustomerListCustomersSearchResults(): Observable<CustomerSearchPage>;
    /**
     * Returns the customer list customers search result loading status.
     */
    getCustomerListCustomersSearchResultsLoading(): Observable<boolean>;
    /**
     * Reset the customer list customers search result data to the initial state.
     */
    customerListCustomersSearchReset(): void;
    /**
     * Returns the customer list customers search result error status.
     */
    getCustomerListCustomersSearchResultsError(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomerListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmCustomerListService>;
}
