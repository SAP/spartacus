import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import {
  AccountSummaryDocumentType,
  DocumentQueryParams,
  DocumentStatus,
  FilterByOptions
} from '@spartacus/organization/account-summary/root';
import { combineLatest } from 'rxjs';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';

interface ItemType {
  code: string;
  name?: string;
}

interface GroupValidator {
  startRange?: ValidationErrors | null;
  endRange?: ValidationErrors | null;
  groupValidator?: ValidationErrors | null;
}

@Component({
  selector: 'cx-account-summary-document-filter',
  templateUrl: './account-summary-document-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSummaryDocumentFilterComponent {

  @Input()
  documentTypeOptions: Array<AccountSummaryDocumentType>;
  @Input()
  set initialFilters(initialFilters: DocumentQueryParams) {
    this.initializeForm(initialFilters);
  }

  @Output()
  filterListEvent: EventEmitter<DocumentQueryParams>;

  /* For Enum use in HTML */
  FilterByOptions = FilterByOptions;

  filterForm: FormGroup;

  private _statusOptions: Array<ItemType>;
  private _filterByOptions: Array<ItemType>;

  constructor(
    protected translation: TranslationService,
    private fb: FormBuilder
  ) {
    this.filterListEvent = new EventEmitter<DocumentQueryParams>();
  }

  formSearch(): void {
    const status = this.filterForm.get('status')?.value as DocumentStatus;
    const filterByKey = this.filterForm.get('filterBy')?.value as FilterByOptions;
    let filterByValue;
    let startRange;
    let endRange;

    switch (filterByKey) {
      case FilterByOptions.DOCUMENT_TYPE: {
        filterByValue = this.filterForm.get('documentType')?.value;
        break;
      }
      case FilterByOptions.DOCUMENT_NUMBER: {
        filterByValue = this.filterForm.get('documentNumber')?.value;
        break;
      }
      case FilterByOptions.DOCUMENT_NUMBER_RANGE: {
        startRange = this.filterForm.get('documentNumberRange.from')?.value;
        endRange = this.filterForm.get('documentNumberRange.to')?.value;
        break;
      }
      case FilterByOptions.DATE_RANGE: {
        const from = this.filterForm.get('documentDateRange.from')?.value;
        const to = this.filterForm.get('documentDateRange.to')?.value;
        startRange = from ? this.encodeDate(from) : '';
        endRange = to ? this.encodeDate(to) : '';
        break;
      }
      case FilterByOptions.DUE_DATE_RANGE: {
        const from = this.filterForm.get('dueDateRange.from')?.value;
        const to = this.filterForm.get('dueDateRange.to')?.value;
        startRange = from ? this.encodeDate(from) : '';
        endRange = to ? this.encodeDate(to) : '';
        break;
      }
      case FilterByOptions.AMOUNT_RANGE: {
        startRange = this.filterForm.get('originalAmountRange.from')?.value;
        endRange = this.filterForm.get('originalAmountRange.to')?.value;
        break;
      }
      case FilterByOptions.OPEN_AMOUNT_RANGE: {
        startRange = this.filterForm.get('openAmountRange.from')?.value;
        endRange = this.filterForm.get('openAmountRange.to')?.value;
        break;
      }
    }
    this.filterListEvent.emit({ status, filterByKey, filterByValue, startRange, endRange });
  }

  resetForm(andSearch = false): void {
    const defaults = {
      documentType: '',
      documentNumber: '',
      documentNumberRange: { from: '', to: '' },
      documentDateRange: { from: '', to: '' },
      dueDateRange: { from: '', to: '' },
      originalAmountRange: { from: '', to: '' },
      openAmountRange: { from: '', to: '' },
    };

    if (andSearch) { // if set, clear all fields and perform search
      this.filterForm.patchValue({
        ...defaults,
        status: DocumentStatus.ALL,
        filterBy: FilterByOptions.DOCUMENT_NUMBER,
      });
      this.formSearch();
    } else { // otherwise just clear all fields except status and filterBy
      this.filterForm.patchValue(defaults);
    }
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

  private initializeForm({ status, filterByKey, filterByValue, startRange, endRange }: DocumentQueryParams): void {

    const generateRangeGroup = (filterByOption: FilterByOptions, validator?: GroupValidator): FormGroup => {
      return this.fb.group({
        from: [filterByKey === filterByOption && startRange ? startRange : '', validator?.startRange],
        to: [filterByKey === filterByOption && endRange ? endRange : '', validator?.endRange],
      }, { validator: validator?.groupValidator});
    };

    const generateDateRangeGroup = (filterByOption: FilterByOptions, validator?: GroupValidator | null): FormGroup => {
      return this.fb.group({
        from: [filterByKey === filterByOption && startRange ? this.decodeDate(startRange) : '', validator?.startRange],
        to: [filterByKey === filterByOption && endRange ? this.decodeDate(endRange) : '', validator?.endRange],
      }, { validator: validator?.groupValidator});
    };

    const validRange = (type: 'date' | 'number'): ValidationErrors => {
      return (c: AbstractControl): ValidationErrors | null => {
        const from = c.get('from') as AbstractControl;
        const to = c.get('to') as AbstractControl;

        if (from.pristine || from.invalid || to.pristine || to.invalid) {
          return null;
        } else if (type === 'date' && from.value > to.value) {
          return { toDateMustComeAfterFrom: true };
        } else if (type === 'number') {
          const fromValue = parseFloat(from.value) || 0;
          const toValue = parseFloat(to.value) || 0;
          console.log(fromValue, toValue);
          return (!isNaN(from.value) && !isNaN(to.value) && fromValue > toValue) ? { toAmountMustBeLargeThanFrom: true } : null;
        } else {
          return null;
        }
      };
    };

    this.filterForm = this.fb.group({
      status: status || DocumentStatus.ALL,
      filterBy: filterByKey || FilterByOptions.DOCUMENT_NUMBER,
      documentType: filterByKey === FilterByOptions.DOCUMENT_TYPE && filterByValue ? filterByValue : '',
      documentNumber: filterByKey === FilterByOptions.DOCUMENT_NUMBER && filterByValue ? filterByValue : '',
      documentNumberRange: generateRangeGroup(FilterByOptions.DOCUMENT_NUMBER_RANGE),
      documentDateRange: generateDateRangeGroup(FilterByOptions.DATE_RANGE,
        { groupValidator: validRange('date') }),
      dueDateRange: generateDateRangeGroup(FilterByOptions.DUE_DATE_RANGE,
        { groupValidator: validRange('date') }),
      originalAmountRange: generateRangeGroup(FilterByOptions.AMOUNT_RANGE,
        { groupValidator: validRange('number') }),
      openAmountRange: generateRangeGroup(FilterByOptions.OPEN_AMOUNT_RANGE,
        { groupValidator: validRange('number') }),
    });
    this.filterForm.get('filterBy')?.valueChanges.subscribe(() => this.filterByChanged());
  }

  private filterByChanged() {
    this.resetForm(false);
  }

  private encodeDate(inputDate: string): string {
    const [year, month, day] = inputDate.split('-');
    return `${month}/${day}/${year}`;
  }

  private decodeDate(inputDate: string): string {
    const [month, day, year] = inputDate.split('/');
    return `${year}-${month}-${day}`;
  }
}
