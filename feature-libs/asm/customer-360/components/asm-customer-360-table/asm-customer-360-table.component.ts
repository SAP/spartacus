/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import {
  CustomerTableColumn,
  CustomerTableTextAlign,
  TableEntry,
} from './asm-customer-360-table.model';
import { AsmCustomer360Config } from '../config/asm-customer-360-config';
import { KeyBoardEventCode } from '@spartacus/asm/customer-360/root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360-table',
  templateUrl: './asm-customer-360-table.component.html',
})
export class AsmCustomer360TableComponent
  implements OnChanges, AfterViewChecked
{
  @ViewChild('table') table: ElementRef;

  @Input() columns: Array<CustomerTableColumn>;

  @Input() emptyStateText: string;

  @Input() entries: Array<TableEntry>;

  @Input() headerText: string;

  @Input() pageSize: number;

  @Input() sortProperty: keyof TableEntry;

  @Output() selectItem = new EventEmitter<TableEntry>();

  SortOrder = SortOrder;

  CustomerTableTextAlign = CustomerTableTextAlign;

  currentPageNumber = 0;

  currentPage$ = new BehaviorSubject<Array<TableEntry> | undefined>(undefined);

  listSortOrder = SortOrder.DESC;

  entryPages: Array<Array<TableEntry>>;

  focusedTableColumnIndex = 0;

  focusedTableRowIndex = 0;

  setFocusOnStartTableItem = false;

  constructor(
    protected asmCustomer360Config: AsmCustomer360Config,
    protected directionService: DirectionService
  ) {}

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
    sortProperty: keyof TableEntry,
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
    let knownKeyPressed = true;
    switch (event.code) {
      case KeyBoardEventCode.ARROW_LEFT:
      case KeyBoardEventCode.ARROW_RIGHT:
        this.moveFocusLeftRight(event, columnIndex, rowIndex);
        break;
      case KeyBoardEventCode.ARROW_DOWN:
        this.moveFocusDown(columnIndex, rowIndex);
        break;
      case KeyBoardEventCode.ARROW_UP:
        this.moveFocusUp(columnIndex, rowIndex);
        break;
      case KeyBoardEventCode.HOME:
        this.moveFocusHome(event, rowIndex);
        break;
      case KeyBoardEventCode.END:
        this.moveFocusEnd(event, rowIndex);
        break;
      case KeyBoardEventCode.PAGE_DOWN:
        this.handlePageDown();
        break;
      case KeyBoardEventCode.PAGE_UP:
        this.handlePageUp();
        break;
      default:
        knownKeyPressed = false;
    }
    if (knownKeyPressed) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
  /**
   * Update selected cell's tabIndex (change tabIndex to 0).
   * if cell contains link(button) then update link
   * @param columnIndex selected column index of table
   * @param rowIndex selected row index of table
   */
  setSelectedTabIndex(columnIndex: number, rowIndex: number): void {
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
  protected handlePageUp(): void {
    if (this.entryPages.length > 1 && this.currentPageNumber > 0) {
      const pageNumber = Math.max(0, this.currentPageNumber - 1);
      this.setPageNumber(pageNumber, true);
    }
  }
  protected handlePageDown(): void {
    const maxPage = this.entryPages.length - 1;
    if (this.entryPages.length > 1 && this.currentPageNumber < maxPage) {
      const pageNumber = Math.min(maxPage, this.currentPageNumber + 1);
      this.setPageNumber(pageNumber, true);
    }
  }
  protected moveFocusEnd(event: KeyboardEvent, rowIndex: number): void {
    const maxRow = this.table.nativeElement.rows.length - 1;
    rowIndex = event.ctrlKey ? maxRow : rowIndex;
    this.setSelectedTabIndex(this.columns.length - 1, rowIndex);
  }
  protected moveFocusHome(event: KeyboardEvent, rowIndex: number): void {
    rowIndex = event.ctrlKey ? 0 : rowIndex;
    this.setSelectedTabIndex(0, rowIndex);
  }
  protected moveFocusUp(columnIndex: number, rowIndex: number): void {
    rowIndex = Math.max(0, rowIndex - 1);
    this.setSelectedTabIndex(columnIndex, rowIndex);
  }
  protected moveFocusDown(columnIndex: number, rowIndex: number): void {
    const maxRow = this.table.nativeElement.rows.length - 1;
    rowIndex = Math.min(maxRow, rowIndex + 1);
    this.setSelectedTabIndex(columnIndex, rowIndex);
  }

  protected moveFocusLeftRight(
    event: KeyboardEvent,
    columnIndex: number,
    rowIndex: number
  ): void {
    const maxColumn = this.columns.length - 1;
    if (this.isBackNavigation(event)) {
      columnIndex = Math.max(0, columnIndex - 1);
    } else {
      columnIndex = Math.min(maxColumn, columnIndex + 1);
    }
    this.setSelectedTabIndex(columnIndex, rowIndex);
  }
  /**
   * Removes tabindex and CSS focus class from a cell in the table.
   * @param columnIndex The index of the column containing the cell.
   * @param rowIndex The index of the row containing the cell.
   */
  protected removeCellTabIndex(columnIndex: number, rowIndex: number): void {
    const tableCell =
      this.table.nativeElement.rows?.[rowIndex]?.cells?.[columnIndex];
    const childElement = tableCell?.firstChild;
    if (childElement) {
      if (childElement.tagName === 'BUTTON') {
        childElement.tabIndex = -1;
      } else {
        if (tableCell) {
          tableCell.tabIndex = -1;
        }
      }
    }
  }
  /**
   * Verifies whether the user navigates from a subgroup back to the main group menu.
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
   * @protected
   */
  protected isBackNavigation(event: KeyboardEvent): boolean {
    return (
      (event.code === KeyBoardEventCode.ARROW_LEFT && this.isLTRDirection()) ||
      (event.code === KeyBoardEventCode.ARROW_RIGHT && this.isRTLDirection())
    );
  }
  protected isLTRDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.LTR;
  }

  protected isRTLDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.RTL;
  }

  protected updateEntryPages(
    entries: Array<TableEntry>
  ): Array<Array<TableEntry>> {
    const newEntryPages = [];
    for (let i = 0; i < entries.length; i += this.pageSize) {
      newEntryPages.push(entries.slice(i, i + this.pageSize));
    }
    return newEntryPages;
  }

  protected sortEntries(
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
