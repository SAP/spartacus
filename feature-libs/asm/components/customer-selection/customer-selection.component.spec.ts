import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AsmConfig, AsmService, CustomerSearchPage } from '@spartacus/asm/core';
import { GlobalMessageService, I18nTestingModule, User } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CustomerSelectionComponent } from './customer-selection.component';

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

class MockAsmService {
  customerSearch(_searchTerm: string): void {}
  customerSearchReset(): void {}
  getCustomerSearchResults(): Observable<CustomerSearchPage> {
    return of(<CustomerSearchPage>{});
  }
  getCustomerSearchResultsLoading(): Observable<boolean> {
    return of(false);
  }
}

const mockCustomer: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'customer@test.com',
  customerId: '123456',
};

const mockCustomer2: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'customer2@test.com',
  customerId: '123456',
};

const mockCustomer3: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'customer3@test.com',
  customerId: '123456',
};

const mockCustomerSearchPage: CustomerSearchPage = {
  entries: [mockCustomer, mockCustomer2, mockCustomer3],
};

const MockAsmConfig: AsmConfig = {
  asm: {
    customerSearch: {
      maxResults: 20,
    },
  },
};

describe('CustomerSelectionComponent', () => {
  let component: CustomerSelectionComponent;
  let fixture: ComponentFixture<CustomerSelectionComponent>;
  let asmService: AsmService;
  let el: DebugElement;

  const validSearchTerm = 'cUstoMer@test.com';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
        declarations: [CustomerSelectionComponent],
        providers: [
          { provide: AsmService, useClass: MockAsmService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
          { provide: AsmConfig, useValue: MockAsmConfig },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSelectionComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    asmService = TestBed.inject(AsmService);
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selection event when submitted', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    spyOn(component.submitEvent, 'emit').and.stub();

    component.customerSelectionForm.controls.searchTerm.setValue('testTerm');
    component.selectedCustomer = mockCustomer;
    fixture.detectChanges();

    const submitBtn = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.submitEvent.emit).toHaveBeenCalledWith({
      customerId: mockCustomer.customerId,
    });
  });

  it('should display spinner when customer search is running', () => {
    spyOn(asmService, 'getCustomerSearchResultsLoading').and.returnValue(
      of(true)
    );
    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('div.spinner'))).toBeTruthy();
    expect(el.query(By.css('form'))).toBeTruthy();
  });

  it('should not display spinner when customer search is not running', () => {
    fixture.detectChanges();

    expect(el.query(By.css('div.sap-spinner'))).toBeFalsy();
    expect(el.query(By.css('form'))).toBeTruthy();
  });

  it('should trigger search for valid search term', fakeAsync(() => {
    spyOn(asmService, 'customerSearch').and.callThrough();
    component.ngOnInit();
    component.customerSelectionForm.controls.searchTerm.setValue(
      validSearchTerm
    );
    fixture.detectChanges();
    tick(1000);
    expect(asmService.customerSearch).toHaveBeenCalledWith({
      query: validSearchTerm,
      pageSize: 20,
    });
  }));

  it('should display 3 search results for valid search term', () => {
    spyOn(asmService, 'getCustomerSearchResults').and.returnValue(
      of(mockCustomerSearchPage)
    );
    component.ngOnInit();
    component.customerSelectionForm.controls.searchTerm.setValue(
      validSearchTerm
    );
    fixture.detectChanges();
    expect(el.queryAll(By.css('div.asm-results button')).length).toEqual(
      mockCustomerSearchPage.entries.length
    );
  });

  it('should close the result list when we click out of the result list area', () => {
    spyOn(asmService, 'getCustomerSearchResults').and.returnValue(
      of(mockCustomerSearchPage)
    );
    spyOn(asmService, 'customerSearchReset').and.stub();
    component.ngOnInit();
    component.customerSelectionForm.controls.searchTerm.setValue(
      validSearchTerm
    );
    fixture.detectChanges();
    expect(el.query(By.css('div.asm-results'))).toBeTruthy();
    el.nativeElement.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    expect(asmService.customerSearchReset).toHaveBeenCalled();
  });

  it('should display no results message when no results are found', () => {
    spyOn(asmService, 'getCustomerSearchResults').and.returnValue(
      of(<CustomerSearchPage>{ entries: [] })
    );
    spyOn(asmService, 'customerSearchReset').and.stub();
    component.ngOnInit();
    component.customerSelectionForm.controls.searchTerm.setValue(
      validSearchTerm
    );
    fixture.detectChanges();
    expect(el.queryAll(By.css('div.asm-results button')).length).toEqual(1);
    expect(
      el.query(By.css('div.asm-results button')).nativeElement.innerText
    ).toEqual('asm.customerSearch.noMatch');
    el.query(By.css('div.asm-results button')).nativeElement.dispatchEvent(
      new MouseEvent('click')
    );
    expect(asmService.customerSearchReset).toHaveBeenCalled();
  });

  it('should be able to select a customer from the result list.', () => {
    spyOn(asmService, 'getCustomerSearchResults').and.returnValue(
      of(mockCustomerSearchPage)
    );
    spyOn(asmService, 'customerSearchReset').and.stub();
    spyOn(component, 'selectCustomerFromList').and.callThrough();
    component.ngOnInit();
    component.customerSelectionForm.controls.searchTerm.setValue(
      validSearchTerm
    );
    fixture.detectChanges();
    el.query(By.css('div.asm-results button')).nativeElement.dispatchEvent(
      new MouseEvent('click')
    );
    fixture.detectChanges();
    expect(component.selectCustomerFromList).toHaveBeenCalled();
    expect(component.selectedCustomer).toEqual(mockCustomer);
    expect(component.customerSelectionForm.controls.searchTerm.value).toEqual(
      mockCustomer.name
    );
    expect(
      el.query(By.css('button[type="submit"]')).nativeElement.disabled
    ).toBeFalsy();
    expect(asmService.customerSearchReset).toHaveBeenCalled();
  });
});
