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

describe('AddressBookComponent', () => {
  let component: AddressBookComponent;
  let fixture: ComponentFixture<AddressBookComponent>;
  let el: DebugElement;

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
    spyOn(component, 'addAddressButtonHandle');
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

  it('should display shipping addresses page title', () => {
    expect(
      el.query(By.css('.cx-section__msg')).nativeElement.textContent
    ).toContain('Saved shipping addresses');
  });

  it('should be able to add new address', () => {
    el.query(By.css('.btn-action')).nativeElement.click();
    expect(component.addAddressButtonHandle).toHaveBeenCalled();
  });
});
