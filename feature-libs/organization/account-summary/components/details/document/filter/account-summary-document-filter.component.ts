/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TranslationService } from '@spartacus/core';
import {
  AccountSummaryDocumentType,
  DocumentQueryParams,
  DocumentStatus,
  FilterByOptions,
} from '@spartacus/organization/account-summary/root';
import { Subscription, zip } from 'rxjs';

import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSummaryDocumentFilterComponent
  implements OnInit, OnDestroy
{
  @Input()
  documentTypeOptions: Array<AccountSummaryDocumentType>;

  @Input()
  set initialFilters(initialFilters: DocumentQueryParams) {
    this.initializeForm(initialFilters);
  }

  @Output()
  filterListEvent = new EventEmitter<DocumentQueryParams>();

  /* For Enum use in HTML */
  FilterByOptions = FilterByOptions;

  filterForm: FormGroup;

  private subscription = new Subscription();

  statusOptions: ItemType[];
  filterByOptions: ItemType[];

  constructor(
    protected translation: TranslationService,
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.getStatusOptions().subscribe(
        (statusOptions) => (this.statusOptions = [...statusOptions])
      )
    );

    this.subscription.add(
      this.getFilterByOptions().subscribe(
        (filterOptions) => (this.filterByOptions = [...filterOptions])
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formSearch(): void {
    const status = this.filterForm.get('status')?.value as DocumentStatus;
    const filterByKey = this.filterForm.get('filterBy')
      ?.value as FilterByOptions;
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
    this.filterListEvent.emit({
      status,
      filterByKey,
      filterByValue,
      startRange,
      endRange,
    });
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

    if (andSearch) {
      // if set, clear all fields and perform search
      this.filterForm.patchValue({
        ...defaults,
        status: DocumentStatus.OPEN,
        filterBy: FilterByOptions.DOCUMENT_NUMBER,
      });
      this.formSearch();
    } else {
      // otherwise just clear all fields except status and filterBy
      this.filterForm.patchValue(defaults);
    }
  }

  protected getStatusOptions(): Observable<ItemType[]> {
    const statusOptions: ItemType[] = (
      Object.values(DocumentStatus) as Array<string>
    ).map((code) => ({ code }));

    const translations = statusOptions.map((status) =>
      this.translation.translate(`orgAccountSummary.statuses.${status.code}`)
    );

    return zip(...translations).pipe(
      map((texts) => {
        texts.forEach((text, index) => (statusOptions[index].name = text));
        return statusOptions;
      })
    );
  }

  protected getFilterByOptions(): Observable<ItemType[]> {
    const filterByOptions: ItemType[] = (
      Object.values(FilterByOptions) as Array<string>
    ).map((code) => ({ code }));

    const translations = filterByOptions.map((status) =>
      this.translation.translate(
        `orgAccountSummary.filterByOptions.${status.code}`
      )
    );

    return zip(...translations).pipe(
      map((texts) => {
        texts.forEach((text, index) => (filterByOptions[index].name = text));
        return filterByOptions;
      })
    );
  }

  private initializeForm({
    status,
    filterByKey,
    filterByValue,
    startRange,
    endRange,
  }: DocumentQueryParams): void {
    const generateRangeGroup = (
      filterByOption: FilterByOptions,
      validator?: GroupValidator
    ): FormGroup => {
      return this.fb.group(
        {
          from: [
            filterByKey === filterByOption && (startRange ?? ''),
            validator?.startRange,
          ],
          to: [
            filterByKey === filterByOption && (endRange ?? ''),
            validator?.endRange,
          ],
        },
        { validators: validator?.groupValidator } as AbstractControlOptions
      );
    };

    const generateDateRangeGroup = (
      filterByOption: FilterByOptions,
      validator?: GroupValidator | null
    ): FormGroup => {
      return this.fb.group(
        {
          from: [
            filterByKey === filterByOption && startRange
              ? this.decodeDate(startRange)
              : '',
            validator?.startRange,
          ],
          to: [
            filterByKey === filterByOption && endRange
              ? this.decodeDate(endRange)
              : '',
            validator?.endRange,
          ],
        },
        { validators: validator?.groupValidator } as AbstractControlOptions
      );
    };

    const validRange = (type: 'date' | 'number'): ValidationErrors => {
      return (c: AbstractControl): ValidationErrors | null => {
        const from = c.get('from') as AbstractControl;
        const to = c.get('to') as AbstractControl;

        if (from.pristine || from.invalid || to.pristine || to.invalid) {
          return null;
        }
        if (type === 'date' && from.value > to.value) {
          return { toDateMustComeAfterFrom: true };
        }
        if (type === 'number') {
          return isFromLargerThanTo(from, to)
            ? { toAmountMustBeLargeThanFrom: true }
            : null;
        }
        return null;
      };
    };

    function isFromLargerThanTo(
      from: AbstractControl<any, any>,
      to: AbstractControl<any, any>
    ) {
      const fromValue = parseFloat(from.value) || 0;
      const toValue = parseFloat(to.value) || 0;
      return !isNaN(from.value) && !isNaN(to.value) && fromValue > toValue;
    }

    this.filterForm = this.fb.group({
      status: status || DocumentStatus.OPEN,
      filterBy: filterByKey || FilterByOptions.DOCUMENT_NUMBER,
      documentType:
        filterByKey === FilterByOptions.DOCUMENT_TYPE && (filterByValue ?? ''),
      documentNumber:
        filterByKey === FilterByOptions.DOCUMENT_NUMBER &&
        (filterByValue ?? ''),
      documentNumberRange: generateRangeGroup(
        FilterByOptions.DOCUMENT_NUMBER_RANGE
      ),
      documentDateRange: generateDateRangeGroup(FilterByOptions.DATE_RANGE, {
        groupValidator: validRange('date'),
      }),
      dueDateRange: generateDateRangeGroup(FilterByOptions.DUE_DATE_RANGE, {
        groupValidator: validRange('date'),
      }),
      originalAmountRange: generateRangeGroup(FilterByOptions.AMOUNT_RANGE, {
        groupValidator: validRange('number'),
      }),
      openAmountRange: generateRangeGroup(FilterByOptions.OPEN_AMOUNT_RANGE, {
        groupValidator: validRange('number'),
      }),
    });
    this.subscription.add(
      this.filterForm
        .get('filterBy')
        ?.valueChanges.subscribe(() => this.filterByChanged())
    );
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
