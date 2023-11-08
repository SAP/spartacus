import { DebugElement, ElementRef } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AsmService } from '@spartacus/asm/core';
import { AsmConfig, CustomerSearchPage } from '@spartacus/asm/root';
import {
  FeaturesConfig,
  FeaturesConfigModule,
  GlobalMessageService,
  I18nTestingModule,
  User,
} from '@spartacus/core';
import {
  DirectionMode,
  DirectionService,
  FormErrorsModule,
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { CustomerSelectionComponent } from './customer-selection.component';
import { DotSpinnerComponent } from '../dot-spinner/dot-spinner.component';

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

class MockDirectionService {
  getDirection() {
    return DirectionMode.LTR;
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

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe() {
    return EMPTY;
  }
}

describe('CustomerSelectionComponent', () => {
  let customerSearchResults: Subject<CustomerSearchPage>;
  let customerSearchResultsLoading: Subject<boolean>;

  class MockAsmService {
    customerSearch(_searchTerm: string): void {
      customerSearchResults.next(mockCustomerSearchPage);
      customerSearchResultsLoading.next(false);
    }
    customerSearchReset(): void {}
    getCustomerSearchResults(): Observable<CustomerSearchPage> {
      return customerSearchResults.asObservable();
    }
    getCustomerSearchResultsLoading(): Observable<boolean> {
      return customerSearchResultsLoading.asObservable();
    }
  }

  let component: CustomerSelectionComponent;
  let fixture: ComponentFixture<CustomerSelectionComponent>;
  let asmService: AsmService;
  let el: DebugElement;
  let searchResultItems: Array<ElementRef<HTMLElement>> = [];
  let launchDialogService: LaunchDialogService;

  const validSearchTerm = 'cUstoMer@test.com';

  beforeEach(
    waitForAsync(() => {
      customerSearchResults = new BehaviorSubject<CustomerSearchPage>({
        entries: [],
      });
      customerSearchResultsLoading = new BehaviorSubject<boolean>(false);

      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          I18nTestingModule,
          FormErrorsModule,
          FeaturesConfigModule,
        ],
        declarations: [CustomerSelectionComponent, DotSpinnerComponent],
        providers: [
          { provide: AsmService, useClass: MockAsmService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
          { provide: AsmConfig, useValue: MockAsmConfig },
          {
            provide: DirectionService,
            useClass: MockDirectionService,
          },
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '*' },
            },
          },
        ],
      }).compileComponents();

      launchDialogService = TestBed.inject(LaunchDialogService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSelectionComponent);
    component = fixture.componentInstance;

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
    customerSearchResultsLoading.next(true);
    fixture.detectChanges();

    expect(el.query(By.css('cx-dot-spinner'))).toBeTruthy();
    expect(el.query(By.css('form'))).toBeTruthy();
  });

  it('should not display spinner when customer search is not running', () => {
    fixture.detectChanges();

    expect(el.query(By.css('div.sap-spinner'))).toBeFalsy();
    expect(el.query(By.css('form'))).toBeTruthy();
  });

  it('should trigger search for valid search term', fakeAsync(() => {
    spyOn(asmService, 'customerSearch').and.callThrough();
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

  it('should display 3 search results for valid search term', fakeAsync(() => {
    component.customerSelectionForm.controls.searchTerm.setValue(
      validSearchTerm
    );

    tick(300);

    fixture.detectChanges();
    expect(el.queryAll(By.css('div.asm-results button')).length).toEqual(
      mockCustomerSearchPage.entries.length
    );
  }));

  it('should close the result list when we click out of the result list area', () => {
    spyOn(asmService, 'customerSearchReset').and.stub();

    component.customerSelectionForm.controls.searchTerm.setValue(
      validSearchTerm
    );
    fixture.detectChanges();
    expect(el.query(By.css('div.asm-results'))).toBeTruthy();
    el.nativeElement.ownerDocument.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    expect(asmService.customerSearchReset).toHaveBeenCalled();
  });

  it('should display customer registration message if no result was found', () => {
    spyOn(asmService, 'customerSearch').and.callFake(() => {
      customerSearchResults.next({ entries: [] });
      customerSearchResultsLoading.next(false);
    });
    spyOn(asmService, 'customerSearchReset').and.stub();
    component.customerSelectionForm.controls.searchTerm.setValue(
      validSearchTerm
    );
    fixture.detectChanges();
    expect(el.queryAll(By.css('div.asm-results button')).length).toEqual(1);
    const createAccountButton = el.query(By.css('div.asm-results button'));
    expect(createAccountButton.nativeElement.innerText).toEqual(
      'asm.customerSearch.noMatchResultasm.customerSearch.createCustomer'
    );
    createAccountButton.nativeElement.dispatchEvent(new MouseEvent('click'));
    expect(asmService.customerSearchReset).toHaveBeenCalled();
  });

  it('should be able to select a customer from the result list.', fakeAsync(() => {
    spyOn(asmService, 'customerSearchReset').and.stub();

    component.customerSelectionForm.controls.searchTerm.setValue(
      validSearchTerm
    );

    tick(300);

    fixture.detectChanges();

    el.query(By.css('div.asm-results button')).nativeElement.dispatchEvent(
      new MouseEvent('click')
    );
    fixture.detectChanges();
    expect(component.selectedCustomer).toEqual(mockCustomer);
    expect(component.customerSelectionForm.controls.searchTerm.value).toEqual(
      mockCustomer.name
    );
    expect(
      el.query(By.css('button[type="submit"]')).nativeElement.disabled
    ).toBeFalsy();
    expect(asmService.customerSearchReset).toHaveBeenCalled();

    fixture.destroy();
  }));

  describe('Search result navigation', () => {
    beforeEach(fakeAsync(() => {
      component.customerSelectionForm.controls.searchTerm.setValue(
        validSearchTerm
      );

      tick(300);

      fixture.detectChanges();
      searchResultItems = component.searchResultItems.toArray();
      component.searchTerm.nativeElement.focus();
    }));
    it('should navigate between result items', () => {
      spyOn(searchResultItems[0].nativeElement, 'focus');

      expect(component.activeFocusedButtonIndex).toEqual(-1);

      component.focusFirstItem(new UIEvent('keydown.arrowdown'));
      fixture.detectChanges();
      expect(component.activeFocusedButtonIndex).toEqual(0);
      expect(searchResultItems[0].nativeElement.tabIndex).toEqual(0);
      expect(searchResultItems[0].nativeElement.focus).toHaveBeenCalled();

      component.focusNextChild(new UIEvent('keydown.arrowdown'));
      fixture.detectChanges();
      expect(component.activeFocusedButtonIndex).toEqual(1);
      expect(searchResultItems[0].nativeElement.tabIndex).toEqual(-1);
      expect(searchResultItems[1].nativeElement.tabIndex).toEqual(0);

      component.focusPreviousChild(new UIEvent('keydown.arrowup'));
      fixture.detectChanges();
      expect(component.activeFocusedButtonIndex).toEqual(0);
      expect(searchResultItems[0].nativeElement.tabIndex).toEqual(0);
      expect(searchResultItems[1].nativeElement.tabIndex).toEqual(-1);
    });
    it('should focus search text and set cursor one right to original select position', () => {
      const event = {
        code: 'ArrowRight',
        ctrlKey: false,
        stopPropagation: () => {},
        preventDefault: () => {},
      };
      spyOn(component.searchTerm.nativeElement, 'focus');

      component.searchTerm.nativeElement.selectionStart =
        validSearchTerm.length - 5;
      component.searchTerm.nativeElement.selectionEnd =
        validSearchTerm.length - 5;

      component.focusFirstItem(new UIEvent('keydown.arrowdown'));
      component.focusInputText(event as KeyboardEvent);

      expect(component.searchTerm.nativeElement.focus).toHaveBeenCalled();
      expect(component.searchTerm.nativeElement.selectionStart).toEqual(
        validSearchTerm.length - 4
      );
      expect(component.searchTerm.nativeElement.selectionEnd).toEqual(
        validSearchTerm.length - 4
      );
    });
    it('should focus search text and set cursor -1 from original position', () => {
      const event = {
        code: 'ArrowLeft',
        ctrlKey: false,
        stopPropagation: () => {},
        preventDefault: () => {},
      };
      spyOn(component.searchTerm.nativeElement, 'focus');

      component.searchTerm.nativeElement.selectionStart =
        validSearchTerm.length - 5;
      component.searchTerm.nativeElement.selectionEnd =
        validSearchTerm.length - 5;

      component.focusFirstItem(new UIEvent('keydown.arrowdown'));
      component.focusInputText(event as KeyboardEvent);

      expect(component.searchTerm.nativeElement.focus).toHaveBeenCalled();
      expect(component.searchTerm.nativeElement.selectionStart).toEqual(
        validSearchTerm.length - 6
      );
      expect(component.searchTerm.nativeElement.selectionEnd).toEqual(
        validSearchTerm.length - 6
      );
    });

    it('should focus search text and set cursor at the begining of text', () => {
      const event = {
        code: 'Home',
        ctrlKey: false,
        stopPropagation: () => {},
        preventDefault: () => {},
      };
      spyOn(component.searchTerm.nativeElement, 'focus');

      component.searchTerm.nativeElement.selectionStart =
        validSearchTerm.length - 5;
      component.searchTerm.nativeElement.selectionEnd =
        validSearchTerm.length - 5;

      component.focusFirstItem(new UIEvent('keydown.arrowdown'));
      component.focusInputText(event as KeyboardEvent);

      expect(component.searchTerm.nativeElement.focus).toHaveBeenCalled();
      expect(component.searchTerm.nativeElement.selectionStart).toEqual(0);
      expect(component.searchTerm.nativeElement.selectionEnd).toEqual(0);
    });

    it('should focus search text and set cursor at the end of text', () => {
      const event = {
        code: 'End',
        ctrlKey: false,
        stopPropagation: () => {},
        preventDefault: () => {},
      };
      spyOn(component.searchTerm.nativeElement, 'focus');

      component.searchTerm.nativeElement.selectionStart =
        validSearchTerm.length - 5;
      component.searchTerm.nativeElement.selectionEnd =
        validSearchTerm.length - 5;

      component.focusFirstItem(new UIEvent('keydown.arrowdown'));
      component.focusInputText(event as KeyboardEvent);

      expect(component.searchTerm.nativeElement.focus).toHaveBeenCalled();
      expect(component.searchTerm.nativeElement.selectionStart).toEqual(
        validSearchTerm.length
      );
      expect(component.searchTerm.nativeElement.selectionEnd).toEqual(
        validSearchTerm.length
      );
    });

    it('should be able to open dialog', () => {
      spyOn(launchDialogService, 'openDialogAndSubscribe');
      component.createCustomer();
      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
        LAUNCH_CALLER.ASM_CREATE_CUSTOMER_FORM,
        component.createCustomerLink
      );
    });
  });
});
