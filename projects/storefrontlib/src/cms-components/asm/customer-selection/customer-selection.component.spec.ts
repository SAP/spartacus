import { DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  AsmService,
  CustomerSearchPage,
  GlobalMessageService,
  I18nTestingModule,
  User,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as testUtils from '../../../shared/utils/forms/form-test-utils';
import { FormUtils } from '../../../shared/utils/forms/form-utils';
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
fdescribe('CustomerSelectionComponent', () => {
  let component: CustomerSelectionComponent;
  let fixture: ComponentFixture<CustomerSelectionComponent>;
  let asmService: AsmService;
  let el: DebugElement;

  const validSearchTerm = 'cUstoMer@test.com';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [CustomerSelectionComponent],
      providers: [
        { provide: AsmService, useClass: MockAsmService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSelectionComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    asmService = TestBed.get(AsmService);
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isNotValid() should delegate to FormUtils.isNotValidField()', () => {
    spyOn(FormUtils, 'isNotValidField').and.stub();

    component.isNotValid('searchTerm');
    expect(FormUtils.isNotValidField).toHaveBeenCalledWith(
      component.form,
      'searchTerm',
      component['submitClicked']
    );
  });

  describe('Start session button', () => {
    it('should be disabled by default', () => {
      spyOn(component, 'onSubmit').and.stub();

      testUtils.clickSubmit(fixture);

      expect(component.onSubmit).not.toHaveBeenCalled();
    });

    it('should be enabled when a customer is selected', () => {
      spyOn(component, 'onSubmit').and.stub();

      component.selectedCustomer = mockCustomer;
      fixture.detectChanges();

      testUtils.clickSubmit(fixture);

      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should emit selection event when clicked', () => {
      spyOn(component, 'onSubmit').and.callThrough();
      spyOn(component.submitEvent, 'emit').and.stub();

      component.selectedCustomer = mockCustomer;
      fixture.detectChanges();

      testUtils.clickSubmit(fixture);

      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.submitEvent.emit).toHaveBeenCalledWith({
        customerId: mockCustomer.customerId,
      });
    });
  });

  it('should display spinner when customer search is running', () => {
    spyOn(asmService, 'getCustomerSearchResultsLoading').and.returnValue(
      of(true)
    );
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(el.query(By.css('div.sap-spinner'))).toBeTruthy();
      expect(el.query(By.css('form'))).toBeTruthy();
    });
  });
  it('should not display spinner when customer search is not running', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(el.query(By.css('div.sap-spinner'))).toBeFalsy();
      expect(el.query(By.css('form'))).toBeTruthy();
    });
  });

  it('should trigger search for valid search term', fakeAsync(() => {
    spyOn(asmService, 'customerSearch').and.callThrough();
    component.ngOnInit();
    component.form.controls.searchTerm.setValue(validSearchTerm);
    fixture.detectChanges();
    tick(1000);
    expect(asmService.customerSearch).toHaveBeenCalledWith({
      query: validSearchTerm,
    });
  }));

  xit('should display search results for valid search term', () => {
    const searchResultBehaviorSubject = new BehaviorSubject<CustomerSearchPage>(
      { entries: [] }
    );
    spyOn(asmService, 'getCustomerSearchResults').and.returnValue(
      searchResultBehaviorSubject
    );
    component.ngOnInit();
    fixture.detectChanges();

    component.form.controls.searchTerm.setValue(validSearchTerm);
    searchResultBehaviorSubject.next(mockCustomerSearchPage);
  });

  xit('should find customer', () => {
    const searchResultBehaviorSubject = new BehaviorSubject<CustomerSearchPage>(
      { entries: [] }
    );
    spyOn(component.submitEvent, 'emit').and.callThrough();
    spyOn(asmService, 'getCustomerSearchResults').and.returnValue(
      searchResultBehaviorSubject
    );
    component.ngOnInit();
    fixture.detectChanges();

    component.form.controls.searchTerm.setValue(validSearchTerm);
    searchResultBehaviorSubject.next(mockCustomerSearchPage);
    expect(component.submitEvent.emit).toHaveBeenCalled();
  });

  xit('should not find customer', () => {
    const searchResultBehaviorSubject = new BehaviorSubject<CustomerSearchPage>(
      { entries: [] }
    );
    spyOn(component.submitEvent, 'emit').and.callThrough();
    spyOn(asmService, 'getCustomerSearchResults').and.returnValue(
      searchResultBehaviorSubject
    );
    component.ngOnInit();
    fixture.detectChanges();

    component.form.controls.searchTerm.setValue('nomatch@test.com');
    searchResultBehaviorSubject.next(mockCustomerSearchPage);
    expect(component.submitEvent.emit).not.toHaveBeenCalled();
  });
});
