import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;

import { UserService } from '../../../../user/facade/user.service';
import { CartDataService } from '../../../../cart/services/cart-data.service';
import { RoutingService } from '@spartacus/core';
import { ShippingAddressComponent } from './shipping-address.component';
import { Address } from '../../../models/address-model';

const mockAddress1: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'first line',
  line2: 'second line',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' }
};

const mockAddress2: Address = {
  firstName: 'Alice',
  lastName: 'Smith',
  titleCode: 'mrs',
  line1: 'other first line',
  line2: 'other second line',
  town: 'other town',
  region: { isocode: 'JP-27' },
  postalCode: 'other zip',
  country: { isocode: 'JP' }
};

const mockAddresses = [mockAddress1, mockAddress2];

@Component({
  selector: 'cx-address-form',
  template: ''
})
class MockAddressFormComponent {}

@Component({
  selector: 'cx-spinner',
  template: ''
})
class MockSpinnerComponent {}

@Component({
  selector: 'cx-card',
  template: ''
})
class MockCardComponent {
  @Input()
  border;
  @Input()
  content;
  @Input()
  fitToContainer;
}

describe('ShippingAddressComponent', () => {
  let component: ShippingAddressComponent;
  let fixture: ComponentFixture<ShippingAddressComponent>;
  let mockRouting: any;
  let mockUserService: any;

  beforeEach(async(() => {
    mockUserService = {
      addresses$: new BehaviorSubject([]),
      addressesLoading$: new BehaviorSubject(null),
      loadAddresses: createSpy()
    };
    mockRouting = {
      go: createSpy()
    };
    const mockCartDataService = {
      userId: 'testUser'
    };

    TestBed.configureTestingModule({
      declarations: [
        ShippingAddressComponent,
        MockAddressFormComponent,
        MockCardComponent,
        MockSpinnerComponent
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: RoutingService, useValue: mockRouting },
        { provide: CartDataService, useValue: mockCartDataService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAddressComponent);
    component = fixture.componentInstance;

    spyOn(component.addAddress, 'emit').and.callThrough();
    spyOn(component, 'addNewAddress').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get existing address if they do not exist', done => {
    mockUserService.addressesLoading$.next(false);
    mockUserService.addresses$.next([]);
    component.ngOnInit();
    component.existingAddresses$.subscribe(() => {
      expect(mockUserService.loadAddresses).toHaveBeenCalled();
      done();
    });
  });

  it('should call ngOnInit to get existing address if they exist', () => {
    mockUserService.addressesLoading$.next(false);
    mockUserService.addresses$.next(mockAddresses);
    component.ngOnInit();
    let address;
    component.existingAddresses$.subscribe(data => {
      address = data;
    });
    expect(address).toBe(mockAddresses);
    expect(component.cards.length).toEqual(2);
  });

  it('should call getCardContent() to get address card data', () => {
    const card = component.getCardContent(mockAddress1);
    expect(card.title).toEqual('');
    expect(card.textBold).toEqual('John Doe');
    expect(card.text).toEqual([
      'first line',
      'second line',
      'town, JP-27, JP',
      'zip',
      undefined
    ]);
    expect(card.actions).toEqual([
      { name: jasmine.any(String), event: 'send' }
    ]);
  });

  it('should call addressSelected(address, index)', () => {
    const card1 = { title: 'test card 1' };
    const card2 = { title: 'test card 2' };
    const card3 = { title: 'test card 3' };
    component.cards.push(card1, card2, card3);
    component.addressSelected(mockAddress1, 1);

    expect(component.selectedAddress).toEqual(mockAddress1);
    expect(component.cards[0].header).toEqual('');
    expect(component.cards[1].header).toEqual('SELECTED');
    expect(component.cards[2].header).toEqual('');
  });

  it('should call next() to submit request', () => {
    component.selectedAddress = mockAddress1;
    component.next();
    expect(component.addAddress.emit).toHaveBeenCalledWith({
      address: mockAddress1,
      newAddress: false
    });
  });

  it('should call addNewAddress()', () => {
    component.addNewAddress(mockAddress1);
    expect(component.addAddress.emit).toHaveBeenCalledWith({
      address: mockAddress1,
      newAddress: true
    });
  });

  it('should call showNewAddressForm()', () => {
    component.showNewAddressForm();
    expect(component.newAddressFormManuallyOpened).toEqual(true);
  });

  it('should call hideNewAddressForm()', () => {
    component.hideNewAddressForm();
    expect(component.newAddressFormManuallyOpened).toEqual(false);
  });

  it('should call back()', () => {
    component.back();
    expect(mockRouting.go).toHaveBeenCalledWith(['/cart']);
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-primary'))
        .find(el => el.nativeElement.innerText === 'Continue');

    it('should be disabled when no address is selected', () => {
      mockUserService.addressesLoading$.next(false);
      mockUserService.addresses$.next(mockAddresses);
      component.selectedAddress = null;
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(true);
    });

    it('should be enabled when address is selected', () => {
      mockUserService.addressesLoading$.next(false);
      mockUserService.addresses$.next(mockAddresses);
      component.selectedAddress = mockAddress1;
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(false);
    });

    it('should call "next" function after being clicked', () => {
      mockUserService.addressesLoading$.next(false);
      mockUserService.addresses$.next(mockAddresses);
      component.selectedAddress = mockAddress1;
      fixture.detectChanges();
      spyOn(component, 'next');
      getContinueBtn().nativeElement.click();
      expect(component.next).toHaveBeenCalled();
    });
  });

  describe('UI back button', () => {
    const getBackBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-action'))
        .find(el => el.nativeElement.innerText === 'Back to cart');

    it('should call "back" function after being clicked', () => {
      mockUserService.addressesLoading$.next(false);
      mockUserService.addresses$.next(mockAddresses);
      fixture.detectChanges();
      spyOn(component, 'back');
      getBackBtn().nativeElement.click();
      expect(component.back).toHaveBeenCalled();
    });
  });

  describe('UI cards with addresses', () => {
    const getCards = () => fixture.debugElement.queryAll(By.css('cx-card'));

    it('should represent all existng addresses', () => {
      mockUserService.addressesLoading$.next(false);
      mockUserService.addresses$.next(mockAddresses);
      fixture.detectChanges();
      expect(getCards().length).toEqual(2);
    });

    it('should not display if there are no existng addresses', () => {
      mockUserService.addressesLoading$.next(false);
      mockUserService.addresses$.next([]);
      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });

    it('should not display if existng addresses are loading', () => {
      mockUserService.addressesLoading$.next(true);
      mockUserService.addresses$.next([]);
      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });
  });

  describe('UI new address form', () => {
    const getAddNewAddressBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-action'))
        .find(el => el.nativeElement.innerText === 'Add New Address');
    const getNewAddressForm = () =>
      fixture.debugElement.query(By.css('cx-address-form'));

    it('should render only after user clicks "add new address" button if there are some existing addresses', () => {
      mockUserService.addressesLoading$.next(false);
      mockUserService.addresses$.next(mockAddresses);

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeFalsy();

      getAddNewAddressBtn().nativeElement.click();

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeTruthy();
    });

    it('should render on init if there are no existing addresses', () => {
      mockUserService.addressesLoading$.next(false);
      mockUserService.addresses$.next([]);
      fixture.detectChanges();

      expect(getNewAddressForm()).toBeTruthy();
    });

    it('should not render on init if there are some existing addresses', () => {
      mockUserService.addressesLoading$.next(false);
      mockUserService.addresses$.next(mockAddresses);
      fixture.detectChanges();

      expect(getNewAddressForm()).toBeFalsy();
    });

    it('should not render when existing addresses are loading', () => {
      mockUserService.addressesLoading$.next(true);
      mockUserService.addresses$.next([]);
      fixture.detectChanges();

      expect(getNewAddressForm()).toBeFalsy();
    });
  });

  describe('UI spinner', () => {
    const getSpinner = () => fixture.debugElement.query(By.css('cx-spinner'));

    it('should render only when existing addresses are loading', () => {
      mockUserService.addressesLoading$.next(true);
      mockUserService.addresses$.next([]);
      fixture.detectChanges();
      expect(getSpinner()).toBeTruthy();

      mockUserService.addressesLoading$.next(false);
      mockUserService.addresses$.next(mockAddresses);
      fixture.detectChanges();
      expect(getSpinner()).toBeFalsy();
    });
  });
});
