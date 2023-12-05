import { QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CustomerSearchOptions, CustomerSearchPage } from '../model/asm.models';
import { CustomerListsPage } from '../model/customer-list.model';
import * as i0 from "@angular/core";
export declare abstract class AsmCustomerListFacade {
    abstract getCustomerLists(): Observable<CustomerListsPage | undefined>;
    abstract getCustomerListsState(): Observable<QueryState<CustomerListsPage>>;
    abstract customerListCustomersSearch(options: CustomerSearchOptions): void;
    abstract getCustomerListCustomersSearchResults(): Observable<CustomerSearchPage>;
    abstract getCustomerListCustomersSearchResultsLoading(): Observable<boolean>;
    abstract customerListCustomersSearchReset(): void;
    abstract getCustomerListCustomersSearchResultsError(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomerListFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmCustomerListFacade>;
}
