import { AfterViewChecked, ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SortOrder } from '@spartacus/asm/core';
import { DirectionService } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { CustomerTableColumn, CustomerTableTextAlign, TableEntry } from './asm-customer-360-table.model';
import { AsmCustomer360Config } from '../config/asm-customer-360-config';
import * as i0 from "@angular/core";
export declare class AsmCustomer360TableComponent implements OnChanges, AfterViewChecked {
    protected asmCustomer360Config: AsmCustomer360Config;
    protected directionService: DirectionService;
    table: ElementRef;
    columns: Array<CustomerTableColumn>;
    emptyStateText: string;
    entries: Array<TableEntry>;
    headerText: string;
    pageSize: number;
    sortProperty: keyof TableEntry;
    selectItem: EventEmitter<TableEntry>;
    SortOrder: typeof SortOrder;
    CustomerTableTextAlign: typeof CustomerTableTextAlign;
    currentPageNumber: number;
    currentPage$: BehaviorSubject<TableEntry[] | undefined>;
    listSortOrder: SortOrder;
    entryPages: Array<Array<TableEntry>>;
    focusedTableColumnIndex: number;
    focusedTableRowIndex: number;
    setFocusOnStartTableItem: boolean;
    constructor(asmCustomer360Config: AsmCustomer360Config, directionService: DirectionService);
    ngOnChanges(changes?: SimpleChanges): void;
    ngAfterViewChecked(): void;
    sortEntriesAndUpdatePages(sortProperty: string): void;
    setPageNumber(pageNumber: number, selectFirstRecord?: boolean): void;
    /**
     * returns sort direction
     * @param columnProperty column property
     * @param sortProperty current sort property
     * @param listSortOrder current sort order
     */
    sortDirection(columnProperty: string, sortProperty: keyof TableEntry, listSortOrder: SortOrder): string;
    /**
     * returns tabIndex value
     * @param focusedTableColumnIndex saved column index
     * @param focusedTableRowIndex saved row index
     * @param columnIndex selected column index
     */
    tabIndexValue(focusedTableColumnIndex: number, focusedTableRowIndex: number, columnIndex: number): number;
    /**
     * Update cell's focus When keyboard key is pressed:
     * handles arrowUp, arrowDown, arrowRight, arrowLeft, Home, End, Home+Ctrl, End+Ctrl
     * PageDown, PageUp
     * @param event KeyboardEvent
     * @param columnIndex selected column index of table
     * @param rowIndex selected row index of table
     */
    onKeyDownCell(event: KeyboardEvent, columnIndex: number, rowIndex: number): void;
    /**
     * Update selected cell's tabIndex (change tabIndex to 0).
     * if cell contains link(button) then update link
     * @param columnIndex selected column index of table
     * @param rowIndex selected row index of table
     */
    setSelectedTabIndex(columnIndex: number, rowIndex: number): void;
    protected handlePageUp(): void;
    protected handlePageDown(): void;
    protected moveFocusEnd(event: KeyboardEvent, rowIndex: number): void;
    protected moveFocusHome(event: KeyboardEvent, rowIndex: number): void;
    protected moveFocusUp(columnIndex: number, rowIndex: number): void;
    protected moveFocusDown(columnIndex: number, rowIndex: number): void;
    protected moveFocusLeftRight(event: KeyboardEvent, columnIndex: number, rowIndex: number): void;
    /**
     * Removes tabindex and CSS focus class from a cell in the table.
     * @param columnIndex The index of the column containing the cell.
     * @param rowIndex The index of the row containing the cell.
     */
    protected removeCellTabIndex(columnIndex: number, rowIndex: number): void;
    /**
     * Verifies whether the user navigates from a subgroup back to the main group menu.
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
     * @protected
     */
    protected isBackNavigation(event: KeyboardEvent): boolean;
    protected isLTRDirection(): boolean;
    protected isRTLDirection(): boolean;
    protected updateEntryPages(entries: Array<TableEntry>): Array<Array<TableEntry>>;
    protected sortEntries(entries: Array<TableEntry>, sortByProperty: keyof TableEntry, sortOrder: SortOrder): Array<TableEntry>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360TableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360TableComponent, "cx-asm-customer-360-table", never, { "columns": "columns"; "emptyStateText": "emptyStateText"; "entries": "entries"; "headerText": "headerText"; "pageSize": "pageSize"; "sortProperty": "sortProperty"; }, { "selectItem": "selectItem"; }, never, never, false, never>;
}
