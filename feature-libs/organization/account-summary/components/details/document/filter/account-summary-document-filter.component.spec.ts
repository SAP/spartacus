import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';

import { I18nTestingModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import {
  DocumentQueryParams,
  DocumentStatus,
  FilterByOptions,
} from '@spartacus/organization/account-summary/root';

import { AccountSummaryDocumentFilterComponent } from './account-summary-document-filter.component';

const mockQueryParams: DocumentQueryParams = {
  status: DocumentStatus.ALL,
  filterByKey: FilterByOptions.DOCUMENT_NUMBER,
};

@Component({
  selector: 'cx-date-picker',
  template: '',
})
class MockDatePickerComponent {
  @Input() control: any;
  @Input() min: any;
  @Input() max: any;
}

describe('AccountSummaryDocumentFilterComponent', () => {
  let component: AccountSummaryDocumentFilterComponent;
  let fixture: ComponentFixture<AccountSummaryDocumentFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        I18nTestingModule,
        FormErrorsModule,
        NgSelectModule,
      ],
      declarations: [
        AccountSummaryDocumentFilterComponent,
        MockDatePickerComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSummaryDocumentFilterComponent);
    component = fixture.componentInstance;
    component.initialFilters = mockQueryParams;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get status options', () => {
    const statusOptions = component.statusOptions;
    expect(statusOptions?.length).toEqual(3);
    expect(statusOptions[0]).toEqual({
      code: DocumentStatus.ALL,
      name: 'orgAccountSummary.statuses.all',
    });
    expect(statusOptions[1]).toEqual({
      code: DocumentStatus.OPEN,
      name: 'orgAccountSummary.statuses.open',
    });
    expect(statusOptions[2]).toEqual({
      code: DocumentStatus.CLOSED,
      name: 'orgAccountSummary.statuses.closed',
    });
  });

  it('should encode and decode date', () => {
    const decodedDate = '2014-02-18'; // YYYY-MM-DD used for controls
    const encodedDate = '02/18/2014'; // MM/DD/YYYY used by backend

    expect(component['encodeDate'](decodedDate)).toEqual(encodedDate);
    expect(component['decodeDate'](encodedDate)).toEqual(decodedDate);
  });

  it('should get filter by options', () => {
    const filterByOptions = component.filterByOptions;
    expect(filterByOptions?.length).toEqual(7);
    expect(filterByOptions[0]).toEqual({
      code: FilterByOptions.DOCUMENT_NUMBER,
      name: 'orgAccountSummary.filterByOptions.orgDocumentId',
    });
    expect(filterByOptions[1]).toEqual({
      code: FilterByOptions.DOCUMENT_NUMBER_RANGE,
      name: 'orgAccountSummary.filterByOptions.orgDocumentIdRange',
    });
    expect(filterByOptions[2]).toEqual({
      code: FilterByOptions.DOCUMENT_TYPE,
      name: 'orgAccountSummary.filterByOptions.orgDocumentType',
    });
    expect(filterByOptions[3]).toEqual({
      code: FilterByOptions.DATE_RANGE,
      name: 'orgAccountSummary.filterByOptions.createdAtDateRange',
    });
    expect(filterByOptions[4]).toEqual({
      code: FilterByOptions.DUE_DATE_RANGE,
      name: 'orgAccountSummary.filterByOptions.dueAtDateRange',
    });
    expect(filterByOptions[5]).toEqual({
      code: FilterByOptions.AMOUNT_RANGE,
      name: 'orgAccountSummary.filterByOptions.amountRange',
    });
    expect(filterByOptions[6]).toEqual({
      code: FilterByOptions.OPEN_AMOUNT_RANGE,
      name: 'orgAccountSummary.filterByOptions.openAmountRange',
    });
  });

  it('should test Filter By selector', () => {
    const eventSpy = spyOn(component.filterListEvent, 'emit');
    const resetSpy = spyOn<any>(component, 'resetForm').and.callThrough();

    let filterByValue: string | undefined;
    let startRange: string | undefined;
    let endRange: string | undefined;

    const pressSearch = () => {
      eventSpy.calls.reset();
      const searchButton = fixture.debugElement.query(By.css('.btn-primary'));
      searchButton?.nativeElement.click();
      fixture.detectChanges();
    };
    const pressClear = () => {
      eventSpy.calls.reset();
      const clearButton = fixture.debugElement.query(By.css('.clear-btn'));
      clearButton?.nativeElement.click();
      fixture.detectChanges();
    };

    const filterFormItems = () =>
      fixture.debugElement.queryAll(
        By.css('label.cx-account-summary-document-filter-form-item')
      );

    /**
     * The default is to have 3 form items:
     *  1) Status selector
     *  2) Filter By selector
     *  3) Document Number input
     */
    let formItems = filterFormItems();
    expect(formItems?.length).toEqual(3);
    expect(
      formItems[0].query(By.css('ng-select'))?.attributes?.formControlName
    ).toEqual('status');
    expect(
      formItems[1].query(By.css('ng-select'))?.attributes?.formControlName
    ).toEqual('filterBy');
    expect(
      formItems[2].query(By.css('input'))?.attributes?.formControlName
    ).toEqual('documentNumber');

    // Set document number and press Search. Expect search to have been triggered.
    filterByValue = '123';
    startRange = undefined;
    endRange = undefined;

    component.filterForm.controls.documentNumber.setValue(filterByValue);
    pressSearch();
    expect(eventSpy).toHaveBeenCalledWith({
      status: DocumentStatus.ALL,
      filterByKey: FilterByOptions.DOCUMENT_NUMBER,
      filterByValue,
      startRange,
      endRange,
    });

    /* From now on we can ignore the first two items because they are always there */

    // Change 'Filter By' to be 'Number Range'
    component.filterForm.controls.filterBy.setValue(
      FilterByOptions.DOCUMENT_NUMBER_RANGE
    );
    fixture.detectChanges();
    formItems = filterFormItems();
    expect(formItems.length).toEqual(4);
    expect(
      formItems[2].query(By.css('input'))?.attributes?.formControlName
    ).toEqual('from');
    expect(
      formItems[3].query(By.css('input'))?.attributes?.formControlName
    ).toEqual('to');

    // Set document range and press Search.
    filterByValue = undefined;
    startRange = '111';
    endRange = '222';

    const documentNumberRange = component.filterForm.controls
      .documentNumberRange as FormGroup;

    documentNumberRange.controls.from?.setValue(startRange);
    documentNumberRange.controls?.to?.setValue(endRange);
    pressSearch();

    // Expect values to have been set and search to have been triggered.
    expect(formItems[2].query(By.css('input'))?.nativeElement.value).toEqual(
      startRange
    );
    expect(formItems[3].query(By.css('input'))?.nativeElement.value).toEqual(
      endRange
    );
    expect(eventSpy).toHaveBeenCalledWith({
      status: DocumentStatus.ALL,
      filterByKey: FilterByOptions.DOCUMENT_NUMBER_RANGE,
      filterByValue,
      startRange,
      endRange,
    });

    // Change status to open
    component.filterForm.controls.status.setValue(DocumentStatus.OPEN);

    // Change 'Filter By' to be 'Document Type'
    component.filterForm.controls.filterBy.setValue(
      FilterByOptions.DOCUMENT_TYPE
    );
    fixture.detectChanges();
    formItems = filterFormItems();
    expect(formItems.length).toEqual(3);
    expect(
      formItems[2].query(By.css('ng-select'))?.attributes?.formControlName
    ).toEqual('documentType');

    // Set document type and press Search.
    filterByValue = 'invoice';
    startRange = undefined;
    endRange = undefined;

    component.filterForm.controls.documentType.setValue(filterByValue);
    pressSearch();

    // Expect values to have been set and search to have been triggered.
    expect(eventSpy).toHaveBeenCalledWith({
      status: DocumentStatus.OPEN,
      filterByKey: FilterByOptions.DOCUMENT_TYPE,
      filterByValue,
      startRange,
      endRange,
    });

    // Change 'Filter By' to be 'Document Date Rangee'
    component.filterForm.controls.filterBy.setValue(FilterByOptions.DATE_RANGE);
    fixture.detectChanges();
    formItems = filterFormItems();
    expect(formItems.length).toEqual(4);
    expect(formItems[2].query(By.css('cx-date-picker'))).toBeTruthy();
    expect(formItems[3].query(By.css('cx-date-picker'))).toBeTruthy();

    // Set document date range and press Search.
    filterByValue = undefined;
    startRange = '2014-06-10';
    endRange = '2014-06-14';

    const documentDateRange = component.filterForm.controls
      .documentDateRange as FormGroup;

    documentDateRange.controls.from?.setValue(startRange);
    documentDateRange.controls?.to?.setValue(endRange);
    pressSearch();

    // Expect values to have been set and search to have been triggered.
    expect(eventSpy).toHaveBeenCalledWith({
      status: DocumentStatus.OPEN,
      filterByKey: FilterByOptions.DATE_RANGE,
      filterByValue,
      startRange: '06/10/2014',
      endRange: '06/14/2014',
    });

    // Change status to open
    component.filterForm.controls.status.setValue(DocumentStatus.CLOSED);

    // Change 'Filter By' to be 'Due Date Range'
    component.filterForm.controls.filterBy.setValue(
      FilterByOptions.DUE_DATE_RANGE
    );
    fixture.detectChanges();
    formItems = filterFormItems();
    expect(formItems.length).toEqual(4);
    expect(formItems[2].query(By.css('cx-date-picker'))).toBeTruthy();
    expect(formItems[3].query(By.css('cx-date-picker'))).toBeTruthy();

    // Set due date range and press Search.
    filterByValue = undefined;
    startRange = '2015-01-05';
    endRange = '2016-02-12';

    const dueDateRange = component.filterForm.controls
      .dueDateRange as FormGroup;

    dueDateRange.controls.from?.setValue(startRange);
    dueDateRange.controls?.to?.setValue(endRange);
    pressSearch();

    // Expect values to have been set and search to have been triggered.
    expect(eventSpy).toHaveBeenCalledWith({
      status: DocumentStatus.CLOSED,
      filterByKey: FilterByOptions.DUE_DATE_RANGE,
      filterByValue,
      startRange: '01/05/2015',
      endRange: '02/12/2016',
    });

    // Change 'Filter By' to be 'Original Amount Range'
    component.filterForm.controls.filterBy.setValue(
      FilterByOptions.AMOUNT_RANGE
    );
    fixture.detectChanges();
    formItems = filterFormItems();
    expect(formItems.length).toEqual(4);
    expect(
      formItems[2].query(By.css('input'))?.attributes?.formControlName
    ).toEqual('from');
    expect(
      formItems[3].query(By.css('input'))?.attributes?.formControlName
    ).toEqual('to');

    // Set original amount range and press Search.
    filterByValue = undefined;
    startRange = '5000';
    endRange = '10000';

    const originalAmountRange = component.filterForm.controls
      .originalAmountRange as FormGroup;

    originalAmountRange.controls.from?.setValue(startRange);
    originalAmountRange.controls?.to?.setValue(endRange);
    pressSearch();

    // Expect values to have been set and search to have been triggered.
    expect(formItems[2].query(By.css('input'))?.nativeElement.value).toEqual(
      startRange
    );
    expect(formItems[3].query(By.css('input'))?.nativeElement.value).toEqual(
      endRange
    );
    expect(eventSpy).toHaveBeenCalledWith({
      status: DocumentStatus.CLOSED,
      filterByKey: FilterByOptions.AMOUNT_RANGE,
      filterByValue,
      startRange,
      endRange,
    });

    // Change 'Filter By' to be 'Open Amount Range'
    component.filterForm.controls.filterBy.setValue(
      FilterByOptions.OPEN_AMOUNT_RANGE
    );
    fixture.detectChanges();
    formItems = filterFormItems();
    expect(formItems.length).toEqual(4);
    expect(
      formItems[2].query(By.css('input'))?.attributes?.formControlName
    ).toEqual('from');
    expect(
      formItems[3].query(By.css('input'))?.attributes?.formControlName
    ).toEqual('to');

    // Set open amount range and press Search.
    filterByValue = undefined;
    startRange = '600';
    endRange = '1200';

    const openAmountRange = component.filterForm.controls
      .openAmountRange as FormGroup;

    openAmountRange.controls.from?.setValue(startRange);
    openAmountRange.controls?.to?.setValue(endRange);
    pressSearch();

    // Expect values to have been set and search to have been triggered.
    expect(formItems[2].query(By.css('input'))?.nativeElement.value).toEqual(
      startRange
    );
    expect(formItems[3].query(By.css('input'))?.nativeElement.value).toEqual(
      endRange
    );
    expect(eventSpy).toHaveBeenCalledWith({
      status: DocumentStatus.CLOSED,
      filterByKey: FilterByOptions.OPEN_AMOUNT_RANGE,
      filterByValue,
      startRange,
      endRange,
    });

    // Press clear button and expect default values and search to be triggered
    expect(resetSpy).toHaveBeenCalledTimes(6);
    resetSpy.calls.reset();
    pressClear();
    expect(resetSpy).toHaveBeenCalledWith(true);
    formItems = filterFormItems();
    expect(formItems?.length).toEqual(3);
    expect(
      formItems[0].query(By.css('ng-select'))?.attributes?.formControlName
    ).toEqual('status');
    expect(
      formItems[1].query(By.css('ng-select'))?.attributes?.formControlName
    ).toEqual('filterBy');
    expect(
      formItems[2].query(By.css('input'))?.attributes?.formControlName
    ).toEqual('documentNumber');

    filterByValue = '';
    startRange = undefined;
    endRange = undefined;

    expect(eventSpy).toHaveBeenCalledWith({
      status: DocumentStatus.OPEN,
      filterByKey: FilterByOptions.DOCUMENT_NUMBER,
      filterByValue,
      startRange,
      endRange,
    });
  });
});
