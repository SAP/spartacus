import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  Address,
  CxDatePipe,
  FeatureDirective,
  FeatureToggles,
  GlobalMessageService,
  HierarchicalAddressConfig,
  I18nTestingModule,
  LanguageService,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  User,
} from '@spartacus/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AddressFormComponent } from '../public_api';
import { AddressBookComponent } from './address-book.component';
import { AddressBookComponentService } from './address-book.component.service';
import { provideMockFeatureToggles } from '@spartacus/core/src/features-config/feature-toggles/testing';

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const mockFeatureToggles: FeatureToggles = {
  enableHierarchicalAddressFormat: true,
};

const mockAddress: Address = {
  id: '123',
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' },
  defaultAddress: false,
};

const mockUser: User = {
  uid: '1234',
};

const isLoading = new BehaviorSubject<boolean>(false);
const isError = new BehaviorSubject<boolean>(false);

class MockComponentService {
  loadAddresses = jasmine.createSpy();
  addUserAddress = jasmine.createSpy();
  updateUserAddress = jasmine.createSpy();
  deleteUserAddress = jasmine.createSpy();
  setAddressAsDefault = jasmine.createSpy();
  getAddressesStateLoading(): Observable<boolean> {
    return isLoading.asObservable();
  }
  getAddressesError(): Observable<boolean> {
    return isError.asObservable();
  }
  getAddresses(): Observable<Address[]> {
    return of([mockAddress, mockAddress, mockAddress]);
  }
  getUserId(): Observable<string> {
    return of(mockUser.uid || '');
  }
}

@Component({
  selector: 'cx-address-form',
  template: '',
  imports: [SpinnerModule, I18nTestingModule, CardModule],
})
class MockAddressFormComponent {
  @Input()
  addressData: Address;

  @Input()
  actionBtnLabel: string;

  @Input()
  cancelBtnLabel: string;

  @Input()
  setAsDefaultField: boolean;

  @Input()
  showTitleCode: boolean;

  @Input()
  showCancelBtn: boolean;

  @Output()
  submitAddress = new EventEmitter<any>();

  @Output()
  backToAddress = new EventEmitter<any>();
}

describe('AddressBookComponent', () => {
  let component: AddressBookComponent;
  let fixture: ComponentFixture<AddressBookComponent>;
  let el: DebugElement;
  let addressBookComponentService: AddressBookComponentService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerModule, CardModule, AddressBookComponent],
      providers: [
        {
          provide: AddressBookComponentService,
          useClass: MockComponentService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: LanguageService, useClass: MockLanguageService },
        provideMockFeatureToggles({ ...mockFeatureToggles }),
        {
          provide: HierarchicalAddressConfig,
          useValue: {
            hierarchicalAddress: {
              countriesUsingHierarchicalAddressFormat: ['CN'],
            },
          },
        },
      ],
    })
      .overrideComponent(AddressBookComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            AddressFormComponent,
            FeatureDirective,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockAddressFormComponent,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBookComponent);
    component = fixture.componentInstance;
    spyOn(component, 'addAddressButtonHandle');
    el = fixture.debugElement;
    addressBookComponentService = TestBed.inject(AddressBookComponentService);

    isLoading.next(false);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner if addresses are loading', () => {
    isLoading.next(true);
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should show address cards after loading', () => {
    expect(el.query(By.css('cx-card'))).toBeTruthy();
  });

  it('should address cards number to be equal with addresses count', () => {
    expect(el.queryAll(By.css('cx-card')).length).toEqual(3);
  });

  it('should be able to add new address', () => {
    el.query(By.css('.btn-secondary')).nativeElement.click();
    expect(component.addAddressButtonHandle).toHaveBeenCalled();
  });

  it('should call addAddressButtonHandle()', () => {
    component.addAddressButtonHandle();

    expect(component.addAddressButtonHandle).toHaveBeenCalledWith();
  });

  it('should call editAddressButtonHandle(address: Address)', () => {
    spyOn(component, 'editAddressButtonHandle');
    component.editAddressButtonHandle(mockAddress);

    expect(component.editAddressButtonHandle).toHaveBeenCalledWith(mockAddress);
  });

  it('should call addAddressSubmit(address: Address)', () => {
    spyOn(component, 'addAddressSubmit');
    component.addAddressSubmit(mockAddress);

    expect(component.addAddressSubmit).toHaveBeenCalledWith(mockAddress);
  });

  it('should call addAddressCancel()', () => {
    spyOn(component, 'addAddressCancel');
    component.addAddressCancel();

    expect(component.addAddressCancel).toHaveBeenCalledWith();
  });

  it('should call editAddressSubmit(address: Address)', () => {
    spyOn(component, 'editAddressSubmit');
    component.editAddressSubmit(mockAddress);

    expect(component.editAddressSubmit).toHaveBeenCalledWith(mockAddress);
  });

  it('should call editAddressCancel()', () => {
    spyOn(component, 'editAddressCancel');
    component.editAddressCancel();

    expect(component.editAddressCancel).toHaveBeenCalledWith();
  });

  it('should display address data', () => {
    const element = el.query(By.css('cx-card'));
    expect(element.nativeElement.textContent).toContain(
      mockAddress.firstName &&
        mockAddress.lastName &&
        mockAddress.line1 &&
        mockAddress.line2 &&
        mockAddress.town &&
        mockAddress.country?.isocode &&
        mockAddress.postalCode
    );
  });

  it('should display default label on address default', () => {
    mockAddress.defaultAddress = true;
    fixture.detectChanges();
    const element = el.query(By.css('.card-header'));
    expect(element.nativeElement.textContent).toContain(
      ' ✓ addressCard.default '
    );
  });

  it('should cancel card', () => {
    component.cancelCard();
    expect(component.editCard).toEqual(null);
  });

  it('should cancel edit', () => {
    component.editAddressCancel();
    expect(component.showEditAddressForm).toBeFalsy();
  });

  it('should cancel add', () => {
    component.addAddressCancel();
    expect(component.showAddAddressForm).toBeFalsy();
  });

  it('should handle edit on card', () => {
    spyOn(component, 'deleteAddress');

    component.setEdit(mockAddress.id || '1');
    expect(component.editCard).toEqual(mockAddress.id);
    component.setEdit(mockAddress.id || '1');
    expect(component.deleteAddress).toHaveBeenCalledWith(mockAddress.id);
  });

  it('should not call updateUserAddress when editAddressSubmit receives falsy address', () => {
    component.currentAddress = mockAddress;
    component.editAddressSubmit(undefined as any);
    expect(
      addressBookComponentService.updateUserAddress
    ).not.toHaveBeenCalled();
    expect(component.showEditAddressForm).toBeFalsy();
  });

  describe('addAddressSubmit', () => {
    beforeEach(() => {
      isLoading.next(false);
      isError.next(false);
      spyOn(
        addressBookComponentService,
        'getAddressesStateLoading'
      ).and.callThrough();
      spyOn(addressBookComponentService, 'getAddressesError').and.callThrough();
    });

    it('should close the form when addUserAddress succeeds', () => {
      component.showAddAddressForm = true;
      component.addAddressSubmit(mockAddress);
      isLoading.next(true);
      isLoading.next(false);
      expect(addressBookComponentService.addUserAddress).toHaveBeenCalledWith(
        mockAddress
      );
      expect(component.showAddAddressForm).toBeFalsy();
      expect(
        addressBookComponentService.getAddressesStateLoading
      ).toHaveBeenCalled();
      expect(addressBookComponentService.getAddressesError).toHaveBeenCalled();
    });

    it('should keep the form open when addUserAddress fails', () => {
      component.showAddAddressForm = true;
      component.addAddressSubmit(mockAddress);
      isError.next(true);
      isLoading.next(true);
      isLoading.next(false);
      expect(addressBookComponentService.addUserAddress).toHaveBeenCalledWith(
        mockAddress
      );
      expect(component.showAddAddressForm).toBe(true);
      expect(
        addressBookComponentService.getAddressesStateLoading
      ).toHaveBeenCalled();
      expect(addressBookComponentService.getAddressesError).toHaveBeenCalled();
    });

    it('should close the form immediately when address is undefined', () => {
      component.showAddAddressForm = true;
      component.addAddressSubmit(undefined as any);
      expect(component.showAddAddressForm).toBeFalsy();
      expect(addressBookComponentService.addUserAddress).not.toHaveBeenCalled();
      expect(
        addressBookComponentService.getAddressesStateLoading
      ).not.toHaveBeenCalled();
      expect(
        addressBookComponentService.getAddressesError
      ).not.toHaveBeenCalled();
    });
  });

  describe('editAddressSubmit', () => {
    beforeEach(() => {
      isLoading.next(false);
      isError.next(false);
      spyOn(
        addressBookComponentService,
        'getAddressesStateLoading'
      ).and.callThrough();
      spyOn(addressBookComponentService, 'getAddressesError').and.callThrough();
    });

    it('should close the form when updateUserAddress succeeds', () => {
      component.currentAddress = mockAddress;
      component.showEditAddressForm = true;
      component.editAddressSubmit(mockAddress);
      isLoading.next(true);
      isLoading.next(false);
      expect(
        addressBookComponentService.updateUserAddress
      ).toHaveBeenCalledWith(mockAddress.id, mockAddress);
      expect(component.showEditAddressForm).toBeFalsy();
      expect(
        addressBookComponentService.getAddressesStateLoading
      ).toHaveBeenCalled();
      expect(addressBookComponentService.getAddressesError).toHaveBeenCalled();
    });

    it('should keep the form open when updateUserAddress fails', () => {
      component.currentAddress = mockAddress;
      component.showEditAddressForm = true;
      component.editAddressSubmit(mockAddress);
      isError.next(true);
      isLoading.next(true);
      isLoading.next(false);
      expect(
        addressBookComponentService.updateUserAddress
      ).toHaveBeenCalledWith(mockAddress.id, mockAddress);
      expect(component.showEditAddressForm).toBe(true);
      expect(
        addressBookComponentService.getAddressesStateLoading
      ).toHaveBeenCalled();
      expect(addressBookComponentService.getAddressesError).toHaveBeenCalled();
    });
  });

  describe('getCardContent', () => {
    it('should use city name and country name when available', () => {
      const addressWithNames: Address = {
        ...mockAddress,
        city: { name: 'Beijing', isocode: 'CN-11-1' },
        country: { name: 'China', isocode: 'CN' },
        region: { name: 'Beijing Region', isocode: 'CN-11' },
      };
      let card: any;
      component.getCardContent(addressWithNames).subscribe((c) => (card = c));
      expect(card.text.some((t: string) => t.includes('Beijing'))).toBe(true);
    });

    it('should use legacy region+country format when toggle is off', () => {
      const featureToggles = TestBed.inject(FeatureToggles);
      featureToggles.enableHierarchicalAddressFormat = false;
      let card: any;
      component.getCardContent(mockAddress).subscribe((c) => (card = c));
      expect(card.text.some((t: string) => t.includes('JP-27, JP'))).toBe(true);
    });
  });

  describe('toggle off behavior', () => {
    let featureToggles: FeatureToggles;

    beforeEach(() => {
      featureToggles = TestBed.inject(FeatureToggles);
      featureToggles.enableHierarchicalAddressFormat = false;
    });

    it('addAddressSubmit should close the form immediately and add the address', () => {
      component.showAddAddressForm = true;
      component.addAddressSubmit(mockAddress);
      expect(component.showAddAddressForm).toBe(false);
      expect(addressBookComponentService.addUserAddress).toHaveBeenCalledWith(
        mockAddress
      );
    });

    it('editAddressSubmit should close the form immediately and update the address', () => {
      component.currentAddress = mockAddress;
      component.showEditAddressForm = true;
      component.editAddressSubmit(mockAddress);
      expect(component.showEditAddressForm).toBe(false);
      expect(
        addressBookComponentService.updateUserAddress
      ).toHaveBeenCalledWith(mockAddress.id, mockAddress);
    });
  });

  describe('setAddressAsDefault', () => {
    it('should set Address as default', () => {
      component.setAddressAsDefault(mockAddress);
      expect(
        addressBookComponentService.setAddressAsDefault
      ).toHaveBeenCalledWith(mockAddress.id);
    });

    it('should use empty string as id fallback when address has no id', () => {
      const addressWithoutId: Address = { ...mockAddress, id: undefined };
      component.setAddressAsDefault(addressWithoutId);
      expect(
        addressBookComponentService.setAddressAsDefault
      ).toHaveBeenCalledWith('');
    });
  });

  describe('deleteAddress', () => {
    it('should set delete user Address', () => {
      component.deleteAddress('1');
      expect(
        addressBookComponentService.deleteUserAddress
      ).toHaveBeenCalledWith('1');
    });
  });

  describe('Header', () => {
    it('should set correct header for add new address', () => {
      component.showEditAddressForm = false;
      component.showAddAddressForm = true;
      fixture.detectChanges();

      expect(el.query(By.css('h2')).nativeElement.innerText).toEqual(
        'addressBook.addNewDeliveryAddress'
      );
    });
    it('should set correct header for edit address', () => {
      component.editAddressButtonHandle(mockAddress);
      fixture.detectChanges();

      expect(el.query(By.css('h2')).nativeElement.innerText).toEqual(
        'addressBook.editDeliveryAddress'
      );
    });
  });
});
