import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentQueryParams, DocumentStatus } from '@spartacus/organization/account-summary/root';
import { combineLatest } from 'rxjs';
// import { map } from "rxjs/operators";
import { TranslationService } from '@spartacus/core';
import {AccountSummaryDocumentType, FilterByOptions} from "../../../../../root/model";
// import {DocumentFields} from "../../../../../root/model";

interface ItemType {
  code: string;
  name?: string;
}

@Component({
  selector: 'cx-account-summary-document-filter',
  templateUrl: './account-summary-document-filter.component.html',
})
export class AccountSummaryDocumentFilterComponent implements OnInit {

  @Input()
  documentTypeOptions: Array<AccountSummaryDocumentType>;
  @Input()
  ariaControls: string;
  @Input()
  ariaLabel: string | undefined;
  @Input()
  selectedOption: string | undefined;
  @Input()
  placeholder: string;
  @Input()
  filterLabels: { [code: string]: string } | null;
  @Input()
  set initialFilters(initialFilters: DocumentQueryParams) {
    this.filters.status = initialFilters.status;
    this.filters.filterByKey = initialFilters.filterByKey;

    if (
      initialFilters.filterByKey === FilterByOptions.DOCUMENT_NUMBER ||
      initialFilters.filterByKey === FilterByOptions.DOCUMENT_TYPE) {

      this.filters.filterByValue = initialFilters.filterByValue ?? '';
    }

    if (
      initialFilters.filterByKey === FilterByOptions.DOCUMENT_NUMBER_RANGE ||
      initialFilters.filterByKey === FilterByOptions.AMOUNT_RANGE ||
      initialFilters.filterByKey === FilterByOptions.OPEN_AMOUNT_RANGE) {

      this.filters.startRange = initialFilters.startRange ?? '';
      this.filters.endRange = initialFilters.endRange ?? '';
    }

    if (
      initialFilters.filterByKey === FilterByOptions.DATE_RANGE ||
      initialFilters.filterByKey === FilterByOptions.DUE_DATE_RANGE) {

      this.filters.startRange = initialFilters.startRange ? this.decodeDate(initialFilters.startRange) : '';
      this.filters.endRange = initialFilters.endRange ? this.decodeDate(initialFilters.endRange) : '';
    }
  }

  /* For Enum use in HTML */
  FilterByOptions = FilterByOptions

  private _statusOptions: Array<ItemType>;
  private _filterByOptions: Array<ItemType>;

  @Output()
  filterListEvent: EventEmitter<DocumentQueryParams>;

  filters: DocumentQueryParams = {
    //   sort: undefined,
    //   fields: undefined,
    status: DocumentStatus.ALL,
    //   startRange: undefined,
    //   endRange: undefined,
    //   filterByKey: undefined,
    //   filterByValue: undefined,
  };

  constructor(protected translation: TranslationService) {
    this.filterListEvent = new EventEmitter<DocumentQueryParams>();
  }

  ngOnInit(): void {
  }

  changeFilterBy(event: ItemType): void {
    this.filters.filterByKey = event.code;
    if (event.code === FilterByOptions.DOCUMENT_NUMBER || event.code === FilterByOptions.DOCUMENT_TYPE) {
      this.filters.filterByValue = '';
      this.filters.startRange = undefined;
      this.filters.endRange = undefined;
    } else { // range filters
      this.filters.filterByValue = undefined;
      this.filters.startRange = '';
      this.filters.endRange = '';
    }
  }

  encodeDate(inputDate: string): string {
    const [year, month, day] = inputDate.split('-');
    return `${month}/${day}/${year}`;
  }

  decodeDate(inputDate: string): string {
    const [month, day, year] = inputDate.split('/');
    return `${year}-${month}-${day}`;
  }

  get statusOptions(): Array<ItemType> {
    if (!this._statusOptions) {
      this._statusOptions = (Object.values(DocumentStatus) as Array<string>).map(code => ({ code }));
      const translations = this._statusOptions.map(status =>
        this.translation.translate(`orgAccountSummary.statuses.${status.code}`));

      combineLatest(translations).subscribe(translationText =>
        translationText.forEach((text, index) => this._statusOptions[index].name = text));
    }
    return this._statusOptions;
  }

  get filterByOptions(): Array<ItemType> {
    if (!this._filterByOptions) {
      this._filterByOptions = (Object.values(FilterByOptions) as Array<string>).map(code => ({ code }));
      const translations = this._filterByOptions.map(status =>
        this.translation.translate(`orgAccountSummary.filterByOptions.${status.code}`));

      combineLatest(translations).subscribe(translationText =>
        translationText.forEach((text, index) => this._filterByOptions[index].name = text));
    }
    return this._filterByOptions;
  }

  search(): void {
    switch (this.filters.filterByKey) {
      case FilterByOptions.DATE_RANGE:
      case FilterByOptions.DUE_DATE_RANGE: {
        const startRange = this.encodeDate(this.filters.startRange);
        const endRange = this.encodeDate(this.filters.endRange);
        const filterByValue = undefined;
        this.filterListEvent.emit({...this.filters, startRange, endRange, filterByValue});
        break;
      }
      case FilterByOptions.DOCUMENT_NUMBER_RANGE:
      case FilterByOptions.AMOUNT_RANGE:
      case FilterByOptions.OPEN_AMOUNT_RANGE: {
        const filterByValue = undefined;
        this.filterListEvent.emit({...this.filters, filterByValue});
        break;
      }
      case FilterByOptions.DOCUMENT_NUMBER:
      case FilterByOptions.DOCUMENT_TYPE: {
        const startRange = undefined;
        const endRange = undefined;
        this.filterListEvent.emit({...this.filters, startRange, endRange});
        break;
      }
      default: {
        this.filterListEvent.emit(this.filters);
        break;
      }
    }
  }
}
