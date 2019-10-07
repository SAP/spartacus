import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
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

const mockUser: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'customer@test.com',
  customerId: '123456',
};

const mockCustomerSearchPage: CustomerSearchPage = {
  entries: [mockUser],
};
describe('CustomerSelectionComponent', () => {
  let component: CustomerSelectionComponent;
  let fixture: ComponentFixture<CustomerSelectionComponent>;
  let searchTermFormControl: AbstractControl;
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
    searchTermFormControl = component.form.controls['searchTerm'];
    spyOn(asmService, 'customerSearch').and.stub();
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

  describe('onSubmit() ', () => {
    it('should be called when submit button is clicked', () => {
      spyOn(component, 'onSubmit').and.stub();

      testUtils.clickSubmit(fixture);

      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should NOT trigger customer search if the form is not valid', () => {
      spyOn(component, 'onSubmit').and.stub();

      component.onSubmit();

      expect(component.form.valid).toBeFalsy();
      expect(component.onSubmit).toHaveBeenCalled();
      expect(asmService.customerSearch).not.toHaveBeenCalled();
    });

    it('should trigger customer search when the form is valid', () => {
      searchTermFormControl.setValue(validSearchTerm);
      fixture.detectChanges();
      component.onSubmit();

      expect(component.form.valid).toBeTruthy();

      expect(asmService.customerSearch).toHaveBeenCalledWith({
        query: validSearchTerm,
      });
    });
  });

  describe('Error messages on form submit', () => {
    it('should NOT display when displaying the form', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'searchTerm')).toBeFalsy();
      });
    });
    it('should display when submit an empty form', () => {
      testUtils.clickSubmit(fixture);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          testUtils.isCtrlShowingError(fixture, 'searchTerm')
        ).toBeTruthy();
      });
    });

    it('should NOT display when all field have valid valies', () => {
      searchTermFormControl.setValue(validSearchTerm);
      testUtils.clickSubmit(fixture);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'searchTerm')).toBeFalsy();
      });
    });

    it('should display when the user submits invalid input', () => {
      searchTermFormControl.setValue('');
      testUtils.clickSubmit(fixture);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          testUtils.isCtrlShowingError(fixture, 'searchTerm')
        ).toBeTruthy();
      });
    });
  });

  describe('Error messages without submit', () => {
    it('should NOT display for empty abandonment', () => {
      searchTermFormControl.setValue('');
      searchTermFormControl.markAsTouched();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'searchTerm')).toBeFalsy();
      });
    });
    it('should NOT display until the user is finished typing', () => {
      searchTermFormControl.setValue('');
      searchTermFormControl.markAsDirty();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'searchTerm')).toBeFalsy();
      });
    });

    it('should display when the user is finished typing invalid input', () => {
      searchTermFormControl.setValue('');
      searchTermFormControl.markAsDirty();
      searchTermFormControl.markAsTouched();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          testUtils.isCtrlShowingError(fixture, 'searchTerm')
        ).toBeTruthy();
      });
    });

    it('should NOT display when the user is finished typing valid input', () => {
      searchTermFormControl.setValue(validSearchTerm);
      searchTermFormControl.markAsDirty();
      searchTermFormControl.markAsTouched();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'searchTerm')).toBeFalsy();
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
      expect(el.query(By.css('form'))).toBeFalsy();
    });
  });
  it('should not display spinner when customer search is not running', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(el.query(By.css('div.sap-spinner'))).toBeFalsy();
      expect(el.query(By.css('form'))).toBeTruthy();
    });
  });

  it('should find customer', () => {
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

  it('should not find customer', () => {
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
