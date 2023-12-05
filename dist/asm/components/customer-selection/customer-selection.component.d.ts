import { ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AsmService } from '@spartacus/asm/core';
import { AsmConfig, CustomerSearchPage } from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import { DirectionService, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CustomerSelectionComponent implements OnInit, OnDestroy {
    protected fb: UntypedFormBuilder;
    protected asmService: AsmService;
    protected config: AsmConfig;
    protected directionService: DirectionService;
    protected launchDialogService?: LaunchDialogService | undefined;
    customerSelectionForm: UntypedFormGroup;
    protected subscription: Subscription;
    searchResultsLoading$: Observable<boolean>;
    searchResults: Observable<CustomerSearchPage>;
    selectedCustomer: User | undefined;
    submitEvent: EventEmitter<{
        customerId?: string | undefined;
    }>;
    resultList: ElementRef;
    searchTerm: ElementRef;
    createCustomerLink: ElementRef;
    searchResultItems: QueryList<ElementRef<HTMLElement>>;
    activeFocusedButtonIndex: number;
    constructor(fb: UntypedFormBuilder, asmService: AsmService, config: AsmConfig, directionService: DirectionService, launchDialogService: LaunchDialogService);
    /**
     * @deprecated since 6.1
     */
    constructor(fb: UntypedFormBuilder, asmService: AsmService, config: AsmConfig, directionService: DirectionService);
    ngOnInit(): void;
    protected handleSearchTerm(searchTermValue: string): void;
    selectCustomerFromList(event: UIEvent, customer: User): void;
    onSubmit(): void;
    onDocumentClick(event: UIEvent): void;
    closeResults(event: UIEvent): void;
    ngOnDestroy(): void;
    /**
     * set focus to the first searched item
     * @param event keyboard event
     */
    focusFirstItem(event: UIEvent): void;
    /**
     * set mouse cursor to the end of search text
     * @param event keyboard event
     */
    setSelectionEnd(event: UIEvent): void;
    /**
     * set focus on previous searh result item.  If no previous item then go to end of item.
     * @param event keyboard event
     */
    focusPreviousChild(event: UIEvent): void;
    /**
     * set focus on next searh result item.  if no next item then go to the first item
     * @param event keyboard event
     */
    focusNextChild(event: UIEvent): void;
    /**
     * set focus to input search text
     * @param event keyboard event
     */
    focusInputText(event: KeyboardEvent): void;
    /**
     * set focus to selected item
     * @param {number} selectedIndex - current selected item index
     */
    updateItemIndex(selectedIndex: number): void;
    createCustomer(): void;
    /**
     * Verifies whether the user navigates into a subgroup of the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
     * @protected
     */
    protected isForwardsNavigation(event: KeyboardEvent): boolean;
    /**
     * Verifies whether the user navigates from a subgroup back to the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
     * @protected
     */
    protected isBackNavigation(event: KeyboardEvent): boolean;
    protected isLTRDirection(): boolean;
    protected isRTLDirection(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerSelectionComponent, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomerSelectionComponent, "cx-customer-selection", never, {}, { "submitEvent": "submitEvent"; }, never, never, false, never>;
}
