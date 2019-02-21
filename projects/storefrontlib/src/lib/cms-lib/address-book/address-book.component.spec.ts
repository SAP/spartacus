import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of, Observable } from 'rxjs';

import { Address, User } from '@spartacus/core';
import { SpinnerModule } from '../../ui/components/spinner/spinner.module';
import { AddressFormModule } from '../../checkout/components/multi-step-checkout/shipping-address/address-form/address-form.module';
import { AddressBookComponent } from './address-book.component';
import { AddressBookModule } from './address-book.module';
import { AddressBookComponentService } from './address-book.component.service';

const mockAddress: Address = {
  id: '111',
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

const mockUser: User = {
  uid: '1234'
};

const isLoading = new BehaviorSubject<boolean>(false);

class MockComponentService {
  loadAddresses = jasmine.createSpy();
  addUserAddress = jasmine.createSpy();
  updateUserAddress = jasmine.createSpy();
  getAddressesStateLoading(): Observable<boolean> {
    return isLoading.asObservable();
  }
  getAddresses(): Observable<Address[]> {
    return of([mockAddress, mockAddress]);
  }
  getUserId(): Observable<string> {
    return of(mockUser.uid);
  }
}

fdescribe('AddressBookComponent', () => {
  let component: AddressBookComponent;
  let fixture: ComponentFixture<AddressBookComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AddressBookModule, AddressFormModule, SpinnerModule],
      providers: [
        { provide: AddressBookComponentService, useClass: MockComponentService }
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

  it('should show spinner if addresses are loading', () => {
    component.ngOnInit();
    isLoading.next(true);
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should show spinner if any action is processing', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should show address cards after loading', () => {
    component.ngOnInit();
    isLoading.next(false);
    fixture.detectChanges();
    expect(el.query(By.css('cx-address-card'))).toBeTruthy();
  });

  it('should address cards number to be equal with addresses count', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(el.queryAll(By.css('cx-address-card')).length).toEqual(2);
  });

  it('should show confirmation on delete', () => {
    component.ngOnInit();
    isLoading.next(false);
    fixture.detectChanges();
    el.query(By.css('.cx-address-card__actions .delete')).nativeElement.click();
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-address-card__delete-msg')).nativeElement.textContent
    ).toContain('Are you sure you want to delete this address?');
  });

  it('should show adding address form', () => {
    component.ngOnInit();
    isLoading.next(false);
    fixture.detectChanges();
    el.query(By.css('.btn-action')).nativeElement.click();
    fixture.detectChanges();
    expect(
      el.query(By.css('cx-address-form')).nativeElement.textContent
    ).toContain('Add address');
    expect(component.showAddAddressForm).toBeTruthy();
  });

  it('should hide adding address form', () => {
    component.ngOnInit();
    isLoading.next(false);
    fixture.detectChanges();
    el.query(By.css('.btn-action')).nativeElement.click();
    fixture.detectChanges();
    el.queryAll(
      By.css('.cx-address-form__btns button')
    )[0].nativeElement.click();
    fixture.detectChanges();
    expect(component.showAddAddressForm).toBeFalsy();
  });

  it('should show editing address form', () => {
    component.ngOnInit();
    isLoading.next(false);
    fixture.detectChanges();
    el.query(By.css('.cx-address-card__actions .edit')).nativeElement.click();
    fixture.detectChanges();
    expect(
      el.query(By.css('cx-address-form')).nativeElement.textContent
    ).toContain('Update address');
    expect(component.showEditAddressForm).toBeTruthy();
  });

  it('should hide editing address form', () => {
    component.ngOnInit();
    isLoading.next(false);
    fixture.detectChanges();
    el.query(By.css('.cx-address-card__actions .edit')).nativeElement.click();
    fixture.detectChanges();
    el.queryAll(
      By.css('.cx-address-form__btns button')
    )[0].nativeElement.click();
    fixture.detectChanges();
    expect(component.showEditAddressForm).toBeFalsy();
  });
});
