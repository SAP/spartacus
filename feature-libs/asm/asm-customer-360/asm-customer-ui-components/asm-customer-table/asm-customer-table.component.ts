/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  byBoolean,
  byComparison,
  byNullish,
  byString,
  isBoolean,
  isNumber,
  isString,
  itemsWith,
  property,
  SortOrder,
  whenType,
} from '@spartacus/asm/core';
import { DirectionMode, DirectionService } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';

import { CustomerTableColumn, TableEntry } from './asm-customer-table.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-table',
  templateUrl: './asm-customer-table.component.html',
})
export class AsmCustomerTableComponent implements OnChanges, AfterViewChecked {
  @ViewChild('table') table: ElementRef;

  @Input() columns: Array<CustomerTableColumn>;

  @Input() emptyStateText: string;

  @Input() entries: Array<TableEntry>;

  @Input() headerText: string;

  @Input() pageSize: number;

  @Input() sortProperty: keyof TableEntry;

  @Output() selectItem = new EventEmitter<TableEntry>();

  SortOrder = SortOrder;

  currentPageNumber = 0;

  currentPage$ = new BehaviorSubject<Array<TableEntry> | undefined>(undefined);

  listSortOrder = SortOrder.ASC;

  entryPages: Array<Array<TableEntry>>;

  focusedTableColumnIndex = 0;

  focusedTableRowIndex = 0;

  setFocusOnStartTableItem = false;

  constructor(protected directionService: DirectionService) {}

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.entries) {
      const entries = this.sortEntries(
        this.entries,
        this.sortProperty,
        this.listSortOrder
      );
      this.entryPages = this.updateEntryPages(entries);
      this.setPageNumber(this.currentPageNumber);
    }
  }

  ngAfterViewChecked(): void {
    if (this.setFocusOnStartTableItem) {
      this.setSelectedTabIndex(0, 1);
      this.setFocusOnStartTableItem = false;
    }
  }

  sortEntriesAndUpdatePages(sortProperty: string): void {
    const currentProperty = this.sortProperty;

    let newSortOrder: SortOrder;
    if (sortProperty !== currentProperty) {
      newSortOrder = SortOrder.ASC;
    } else {
      newSortOrder =
        this.listSortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    }

    this.sortProperty = sortProperty;
    this.listSortOrder = newSortOrder;

    this.entries = this.sortEntries(
      this.entries,
      this.sortProperty,
      this.listSortOrder
    );
    this.entryPages = this.updateEntryPages(this.entries);
    this.setPageNumber(this.currentPageNumber);
  }

  setPageNumber(pageNumber: number, selectFirstRecord = false): void {
    this.currentPageNumber = pageNumber;
    this.currentPage$.next(this.entryPages[this.currentPageNumber]);
    if (selectFirstRecord) {
      this.setFocusOnStartTableItem = true;
    }
  }
  /**
   * returns sort direction
   * @param columnProperty column property
   * @param sortProperty current sort property
   * @param listSortOrder current sort order
   */
  sortDirection(
    columnProperty: string,
    sortProperty: string,
    listSortOrder: SortOrder
  ): string {
    if (columnProperty === sortProperty) {
      return listSortOrder === SortOrder.ASC ? 'ascending' : 'descending';
    } else {
      return 'none';
    }
  }
  /**
   * returns tabIndex value
   * @param focusedTableColumnIndex saved column index
   * @param focusedTableRowIndex saved row index
   * @param columnIndex selected column index
   */
  tabIndexValue(
    focusedTableColumnIndex: number,
    focusedTableRowIndex: number,
    columnIndex: number
  ): number {
    return focusedTableColumnIndex === columnIndex && focusedTableRowIndex === 0
      ? 0
      : -1;
  }
  /**
   * Update cell's focus When keyboard key is pressed:
   * handles arrowUp, arrowDown, arrowRight, arrowLeft, Home, End, Home+Ctrl, End+Ctrl
   * PageDown, PageUp
   * @param event KeyboardEvent
   * @param columnIndex selected column index of table
   * @param rowIndex selected row index of table
   */
  onKeyDownCell(
    event: KeyboardEvent,
    columnIndex: number,
    rowIndex: number
  ): void {
    const maxColumn = this.columns.length - 1;
    const maxRow = this.table.nativeElement.rows.length - 1;
    const maxPage = this.entryPages.length - 1;
    let knownKeyPressed = true;
    let updatePageNumber = false;

    switch (event.code) {
      case 'ArrowLeft':
      case 'ArrowRight':
        if (this.isBackNavigation(event)) {
          columnIndex = Math.max(0, columnIndex - 1);
        } else {
          columnIndex = Math.min(maxColumn, columnIndex + 1);
        }
        break;
      case 'ArrowDown':
        rowIndex = Math.min(maxRow, rowIndex + 1);
        break;
      case 'ArrowUp':
        rowIndex = Math.max(0, rowIndex - 1);
        break;
      case 'Home':
        columnIndex = 0;
        rowIndex = event.ctrlKey ? 0 : rowIndex;
        break;
      case 'End':
        columnIndex = maxColumn;
        rowIndex = event.ctrlKey ? maxRow : rowIndex;
        break;
      case 'PageDown':
        if (this.shouldHandlePageDown()) {
          updatePageNumber = true;
          const pageNumber = Math.min(maxPage, this.currentPageNumber + 1);
          this.setPageNumber(pageNumber, true);
        }
        break;
      case 'PageUp':
        if (this.shouldHandlePageUp()) {
          updatePageNumber = true;
          const pageNumber = Math.max(0, this.currentPageNumber - 1);
          this.setPageNumber(pageNumber, true);
        }
        break;
      default:
        knownKeyPressed = false;
    }
    if (knownKeyPressed) {
      if (!updatePageNumber) {
        this.setSelectedTabIndex(columnIndex, rowIndex);
      }
      event.stopPropagation();
      event.preventDefault();
    }
  }
  private shouldHandlePageDown(): boolean {
    const maxPage = this.entryPages.length - 1;
    return this.entryPages.length > 1 && this.currentPageNumber < maxPage;
  }
  private shouldHandlePageUp(): boolean {
    return this.entryPages.length > 1 && this.currentPageNumber > 0;
  }
  /**
   * Update selected cell's tabIndex (change tabIndex to 0).
   * if cell contains link(button) then update link
   * @param columnIndex selected column index of table
   * @param rowIndex selected row index of table
   */
  private setSelectedTabIndex(columnIndex: number, rowIndex: number): void {
    const maxColumn = this.columns.length - 1;
    const maxRow = this.table.nativeElement.rows.length - 1;
    if (columnIndex > maxColumn || rowIndex > maxRow) {
      return;
    }
    this.removeCellTabIndex(
      this.focusedTableColumnIndex,
      this.focusedTableRowIndex
    );
    this.focusedTableColumnIndex = columnIndex;
    this.focusedTableRowIndex = rowIndex;
    const tableCell =
      this.table.nativeElement.rows[rowIndex].cells[columnIndex];
    const childElement = tableCell.firstChild;
    const elementToFocus =
      childElement.tagName === 'BUTTON' ? childElement : tableCell;
    elementToFocus.tabIndex = 0;
    elementToFocus.focus();
  }
  /**
   * Remove selected tab index (change tabIndex to -1)
   * if cell has link(button) then update link
   * @param columnIndex selected column index of table
   * @param rowIndex selected row index of table
   */
  private removeCellTabIndex(columnIndex: number, rowIndex: number): void {
    const tableCell =
      this.table.nativeElement.rows?.[rowIndex]?.cells?.[columnIndex];
    const childElement = tableCell?.firstChild;
    if (childElement) {
      if (childElement.tagName === 'BUTTON') {
        childElement.tabIndex = -1;
      } else {
        tableCell.tabIndex = -1;
      }
    }
  }
  /**
   * Verifies whether the user navigates from a subgroup back to the main group menu.
   *
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
   * @protected
   */
  protected isBackNavigation(event: KeyboardEvent): boolean {
    return (
      (event.code === 'ArrowLeft' && this.isLTRDirection()) ||
      (event.code === 'ArrowRight' && this.isRTLDirection())
    );
  }
  protected isLTRDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.LTR;
  }

  protected isRTLDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.RTL;
  }

  private updateEntryPages(
    entries: Array<TableEntry>
  ): Array<Array<TableEntry>> {
    const newEntryPages = [];
    for (let i = 0; i < entries.length; i += this.pageSize) {
      newEntryPages.push(entries.slice(i, i + this.pageSize));
    }
    return newEntryPages;
  }

  private sortEntries(
    entries: Array<TableEntry>,
    sortByProperty: keyof TableEntry,
    sortOrder: SortOrder
  ): Array<TableEntry> {
    if (entries?.length) {
      return entries.sort(
        itemsWith(
          property(
            sortByProperty,
            itemsWith(
              byNullish(SortOrder.DESC),
              whenType(isString, byString(sortOrder)),
              whenType(isNumber, byComparison(sortOrder)),
              whenType(isBoolean, byBoolean(sortOrder))
            )
          )
        )
      );
    } else {
      return [];
    }
  }
}
