import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DebugElement,
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of, Observable } from 'rxjs';

import { Address, User } from '@spartacus/core';
import { SpinnerModule } from '../../ui/components/spinner/spinner.module';
import { AddressBookComponent } from './address-book.component';
import { AddressBookComponentService } from './address-book.component.service';

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
    return of([mockAddress, mockAddress, mockAddress]);
  }
  getUserId(): Observable<string> {
    return of(mockUser.uid);
  }
}

@Component({
  selector: 'cx-address-card',
  template: ''
})
class MockAddressCardComponent {
  editMode: true;

  @Input()
  userId: string;

  @Input()
  address: Address;

  @Output()
  editEvent = new EventEmitter<any>();
}

@Component({
  selector: 'cx-address-form',
  template: ''
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

  @Output()
  submitAddress = new EventEmitter<any>();

  @Output()
  backToAddress = new EventEmitter<any>();
}

fdescribe('AddressBookComponent', () => {
  let component: AddressBookComponent;
  let fixture: ComponentFixture<AddressBookComponent>;
  let el: DebugElement;

  const checkSectionMsg = (msg: string) => {
    expect(
      el.query(By.css('.cx-section__msg')).nativeElement.textContent
    ).toContain(msg);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerModule],
      providers: [
        { provide: AddressBookComponentService, useClass: MockComponentService }
      ],
      declarations: [
        AddressBookComponent,
        MockAddressCardComponent,
        MockAddressFormComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBookComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

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
    expect(el.query(By.css('cx-address-card'))).toBeTruthy();
  });

  it('should address cards number to be equal with addresses count', () => {
    expect(el.queryAll(By.css('cx-address-card')).length).toEqual(3);
  });

  it('should display the saved shipping addresses', () => {
    checkSectionMsg('Saved shipping addresses');
  });

  it('should be able to add new address', () => {
    el.query(By.css('.btn-action')).nativeElement.click();
    expect(el.query(By.css('cx-address-form'))).toBeTruthy();
  });

  // it('should show and hide add address form', () => {
  //   el.query(By.css('.btn-action')).nativeElement.click();
  //   fixture.detectChanges();
  //   expect(component.showAddAddressForm).toBe(true);
  //   checkSectionMsg('Add');

  //   el.query(
  //     By.css('.cx-address-form__btns .btn-action')
  //   ).nativeElement.click();
  //   fixture.detectChanges();
  //   checkSectionMsg('Saved');
  // });

  // xit('should show and hide edit address form', () => {
  //   fixture.whenStable().then(() => {
  //     // console.log('ELEMENT ELEMENT: ', el);
  //     const foundElem = el.query(By.css('.cx-address-form__btns .btn-action'));

  //     console.log('!!! FOUND FOUND FOUND ELEM: ', foundElem);
  //     // foundElem.nativeElement.click();
  //     // fixture.detectChanges();
  //     // expect(component.showEditAddressForm).toBe(true);
  //     // checkSectionMsg('Edit');

  //     el.query(
  //       By.css('.cx-address-form__btns .btn-action')
  //     ).nativeElement.click();
  //     fixture.detectChanges();
  //     checkSectionMsg('Saved');
  //   });
  // });

  // xit('should delete address (with confirmation question)', () => {
  //   fixture.whenStable().then(() => {
  //     expect(el.queryAll(By.css('cx-address-card')).length).toEqual(3);
  //     el.query(
  //       By.css('.cx-address-card__actions .delete')
  //     ).nativeElement.click();
  //     fixture.detectChanges();
  //     el.query(
  //       By.css('.cx-address-card__delete .btn-primary')
  //     ).nativeElement.click();
  //     fixture.detectChanges();
  //     expect(el.queryAll(By.css('cx-address-card')).length).toEqual(2);
  //   });
  // });
});
