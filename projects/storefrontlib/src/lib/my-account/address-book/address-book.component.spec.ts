import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { AddressBookComponent } from './address-book.component';
import { UserService } from '../../user/facade/user.service';
import { AddressBookModule } from './address-book.module';
import { SpinnerModule } from '../../ui/components/spinner/spinner.module';
import { AddressFormModule } from '../../checkout/components/multi-step-checkout/shipping-address/address-form/address-form.module';
import { CheckoutService } from '../../checkout/facade';
import { StoreModule } from '@ngrx/store';
import { GlobalMessageService } from '@spartacus/core';

const mockAddress = {
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
  defaultAddress: false
};

describe('AddressBookComponent', () => {
  let component: AddressBookComponent;
  let fixture: ComponentFixture<AddressBookComponent>;
  let mockUserService;
  let mockCheckoutService;
  let el: DebugElement;
  let mockGlobalMessageService: any;
  const addresses = new BehaviorSubject<any>({
    isLoading: false,
    isActionProcessing: false,
    list: [mockAddress]
  });
  const user = new BehaviorSubject<any>({ uid: 'userId' });

  beforeEach(async(() => {
    mockUserService = {
      addressesState$: addresses.asObservable(),
      addUserAddress: jasmine.createSpy(),
      loadAddresses: jasmine.createSpy(),
      deleteUserAddress: jasmine.createSpy(),
      updateUserAddress: jasmine.createSpy(),
      setAddressAsDefault: jasmine.createSpy(),
      getDeliveryCountries: jasmine.createSpy().and.returnValue(of([])),
      getTitles: jasmine.createSpy().and.returnValue(of([])),
      getRegions: jasmine.createSpy().and.returnValue(of([])),
      user$: user.asObservable(),
      loadTitles: jasmine.createSpy(),
      loadDeliveryCountries: jasmine.createSpy(),
      loadRegions: jasmine.createSpy()
    };

    mockCheckoutService = {
      addressVerificationResults$: new BehaviorSubject({ decision: 'ACCEPT' }),
      clearAddressVerificationResults: jasmine.createSpy(),
      verifyAddress: jasmine.createSpy()
    };

    mockGlobalMessageService = {
      add: jasmine.createSpy()
    };

    TestBed.configureTestingModule({
      imports: [
        AddressBookModule,
        AddressFormModule,
        SpinnerModule,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: CheckoutService, useValue: mockCheckoutService },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBookComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show page title', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-page__title')).nativeElement.textContent
    ).toContain('Address Book');
  });

  it('should show spinner if addresses are loading', () => {
    component.ngOnInit();
    addresses.next({
      isLoading: true
    });
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should show spinner if any action is processing', () => {
    component.ngOnInit();
    addresses.next({
      isLoading: false,
      isActionProcessing: true
    });
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should show address cards after loading', () => {
    component.ngOnInit();
    addresses.next({
      isLoading: false,
      list: [mockAddress, mockAddress]
    });
    fixture.detectChanges();
    expect(el.query(By.css('cx-address-card'))).toBeTruthy();
  });

  it('should address cards number to be equal with addresses count', () => {
    component.ngOnInit();
    addresses.next({
      isLoading: false,
      list: [mockAddress, mockAddress]
    });
    fixture.detectChanges();

    expect(el.queryAll(By.css('cx-address-card')).length).toEqual(2);
  });

  it('should show confirmation on delete', () => {
    component.ngOnInit();
    addresses.next({
      isLoading: false,
      list: [mockAddress]
    });
    fixture.detectChanges();
    el.query(By.css('.cx-address-card__actions .delete')).nativeElement.click();
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-address-card__delete-msg')).nativeElement.textContent
    ).toContain('Are you sure you want to delete this address?');
  });

  it('should show adding address form', () => {
    component.ngOnInit();
    addresses.next({
      isLoading: false,
      list: [mockAddress]
    });
    fixture.detectChanges();
    el.query(By.css('.btn-action')).nativeElement.click();
    fixture.detectChanges();
    expect(
      el.query(By.css('cx-address-form')).nativeElement.textContent
    ).toContain('Add address');
    expect(component.isAddAddressFormOpen).toBeTruthy();
  });

  it('should hide adding address form', () => {
    component.ngOnInit();
    addresses.next({
      isLoading: false,
      list: [mockAddress]
    });
    fixture.detectChanges();
    el.query(By.css('.btn-action')).nativeElement.click();
    fixture.detectChanges();
    el.queryAll(
      By.css('.cx-address-form__btns button')
    )[0].nativeElement.click();
    fixture.detectChanges();
    expect(component.isAddAddressFormOpen).toBeFalsy();
  });

  it('should show editing address form', () => {
    component.ngOnInit();
    addresses.next({
      isLoading: false,
      list: [mockAddress]
    });
    fixture.detectChanges();
    el.query(By.css('.cx-address-card__actions .edit')).nativeElement.click();
    fixture.detectChanges();
    expect(
      el.query(By.css('cx-address-form')).nativeElement.textContent
    ).toContain('Update address');
    expect(component.isEditAddressFormOpen).toBeTruthy();
  });

  it('should hide editing address form', () => {
    component.ngOnInit();
    addresses.next({
      isLoading: false,
      list: [mockAddress]
    });
    fixture.detectChanges();
    el.query(By.css('.cx-address-card__actions .edit')).nativeElement.click();
    fixture.detectChanges();
    el.queryAll(
      By.css('.cx-address-form__btns button')
    )[0].nativeElement.click();
    fixture.detectChanges();
    expect(component.isEditAddressFormOpen).toBeFalsy();
  });

  it('should successfully set address as default', () => {
    component.ngOnInit();
    addresses.next({
      isLoading: false,
      list: [mockAddress]
    });
    fixture.detectChanges();
    el.query(
      By.css('.cx-address-card__actions .set-default')
    ).nativeElement.click();
    fixture.detectChanges();
    expect(mockUserService.setAddressAsDefault).toHaveBeenCalledWith(
      'userId',
      mockAddress.id
    );
  });

  it('should successfully delete address', () => {
    component.ngOnInit();
    addresses.next({
      isLoading: false,
      list: [mockAddress]
    });
    fixture.detectChanges();
    el.query(By.css('.cx-address-card__actions .delete')).nativeElement.click();
    fixture.detectChanges();
    el.query(
      By.css('.cx-address-card__delete .btn-primary')
    ).nativeElement.click();
    fixture.detectChanges();
    expect(mockUserService.deleteUserAddress).toHaveBeenCalledWith(
      'userId',
      mockAddress.id
    );
  });
});
