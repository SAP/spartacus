import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { AccountSummaryDocumentType, DocumentQueryParams, FilterByOptions } from '@spartacus/organization/account-summary/root';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
interface ItemType {
    code: string;
    name?: string;
}
export declare class AccountSummaryDocumentFilterComponent implements OnInit, OnDestroy {
    protected translation: TranslationService;
    protected fb: FormBuilder;
    documentTypeOptions: Array<AccountSummaryDocumentType>;
    set initialFilters(initialFilters: DocumentQueryParams);
    filterListEvent: EventEmitter<DocumentQueryParams>;
    FilterByOptions: typeof FilterByOptions;
    filterForm: FormGroup;
    private subscription;
    statusOptions: ItemType[];
    filterByOptions: ItemType[];
    constructor(translation: TranslationService, fb: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    formSearch(): void;
    resetForm(andSearch?: boolean): void;
    protected getStatusOptions(): Observable<ItemType[]>;
    protected getFilterByOptions(): Observable<ItemType[]>;
    private initializeForm;
    private filterByChanged;
    private encodeDate;
    private decodeDate;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccountSummaryDocumentFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccountSummaryDocumentFilterComponent, "cx-account-summary-document-filter", never, { "documentTypeOptions": "documentTypeOptions"; "initialFilters": "initialFilters"; }, { "filterListEvent": "filterListEvent"; }, never, never, false, never>;
}
export {};
