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
  AsmConfig,
  AsmService,
  CustomerSearchPage,
  GlobalMessageService,
  I18nTestingModule,
  User,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import * as testUtils from '../../../shared/utils/forms/form-test-utils';
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [CustomerSelectionComponent],
      providers: [
        { provide: AsmService, useClass: MockAsmService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: AsmConfig, useValue: MockAsmConfig },
      ],
    }).compileComponents();
  }));

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

  describe('Start session button', () => {
    it('should be disabled by default', () => {
      spyOn(component, 'onSubmit').and.stub();

      expect(
        el.query(By.css('button[type="submit"]')).nativeElement.disabled
      ).toBeTruthy();

      testUtils.clickSubmit(fixture);

      expect(component.onSubmit).not.toHaveBeenCalled();
    });

    it('should be enabled when a customer is selected', () => {
      spyOn(component, 'onSubmit').and.stub();

      component.selectedCustomer = mockCustomer;
      fixture.detectChanges();
      expect(
        el.query(By.css('button[type="submit"]')).nativeElement.disabled
      ).toBeFalsy();

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
      expect(el.query(By.css('div.spinner'))).toBeTruthy();
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
      pageSize: 20,
    });
  }));

  it('should display 3 search results for valid search term', () => {
    spyOn(asmService, 'getCustomerSearchResults').and.returnValue(
      of(mockCustomerSearchPage)
    );
    component.ngOnInit();
    component.form.controls.searchTerm.setValue(validSearchTerm);
    fixture.detectChanges();
    expect(el.queryAll(By.css('div.asm-results a')).length).toEqual(
      mockCustomerSearchPage.entries.length
    );
  });

  it('should close the result list when we click out of the result list area', () => {
    spyOn(asmService, 'getCustomerSearchResults').and.returnValue(
      of(mockCustomerSearchPage)
    );
    spyOn(asmService, 'customerSearchReset').and.stub();
    component.ngOnInit();
    component.form.controls.searchTerm.setValue(validSearchTerm);
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
    component.form.controls.searchTerm.setValue(validSearchTerm);
    fixture.detectChanges();
    expect(el.queryAll(By.css('div.asm-results a')).length).toEqual(1);
    expect(
      el.query(By.css('div.asm-results a')).nativeElement.innerText
    ).toEqual('asm.customerSearch.noMatch');
    el.query(By.css('div.asm-results a')).nativeElement.dispatchEvent(
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
    component.form.controls.searchTerm.setValue(validSearchTerm);
    fixture.detectChanges();
    el.query(By.css('div.asm-results a')).nativeElement.dispatchEvent(
      new MouseEvent('click')
    );
    fixture.detectChanges();
    expect(component.selectCustomerFromList).toHaveBeenCalled();
    expect(component.selectedCustomer).toEqual(mockCustomer);
    expect(component.form.controls.searchTerm.value).toEqual(mockCustomer.name);
    expect(
      el.query(By.css('button[type="submit"]')).nativeElement.disabled
    ).toBeFalsy();
    expect(asmService.customerSearchReset).toHaveBeenCalled();
  });
});
