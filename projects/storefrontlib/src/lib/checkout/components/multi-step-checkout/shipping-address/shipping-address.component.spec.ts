import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import * as fromRoot from '../../../../routing/store';
import * as fromCheckout from '../../../store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../user/store';

import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { ShippingAddressComponent } from './shipping-address.component';

import { of } from 'rxjs';
import * as fromRouting from '../../../../routing/store';
import { CheckoutService } from '../../../services';
import { CartService, CartDataService } from '../../../../cart/services';
import { AddressFormModule } from './address-form/address-form.module';
import { CardModule } from '../../../../ui/components/card/card.module';
import { Address } from '../../../models/address-model';

const mockAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' }
};

describe('ShippinegAddressComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: ShippingAddressComponent;
  let fixture: ComponentFixture<ShippingAddressComponent>;
  let service: CheckoutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AddressFormModule,
        RouterTestingModule,
        CardModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          checkout: combineReducers(fromCheckout.getReducers()),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers())
        })
      ],
      declarations: [ShippingAddressComponent],
      providers: [CheckoutService, CartService, CartDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAddressComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    service = TestBed.get(CheckoutService);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(component.addAddress, 'emit').and.callThrough();
    spyOn(component, 'addNewAddress').and.callThrough();
    spyOn(service, 'loadUserAddresses').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get existing address if they do not exist', () => {
    spyOn(store, 'select').and.returnValues(of([]));
    component.ngOnInit();
    component.existingAddresses$.subscribe(() => {
      expect(service.loadUserAddresses).toHaveBeenCalled();
    });
  });

  it('should call ngOnInit to get existing address if they exist', () => {
    const mockAddresses = [mockAddress];
    spyOn(store, 'select').and.returnValue(of(mockAddresses));
    component.ngOnInit();
    component.existingAddresses$.subscribe(data => {
      expect(data).toBe(mockAddresses);
      expect(component.cards.length).toEqual(1);
    });
  });

  it('should call getCardContent() to get address card data', () => {
    const card = component.getCardContent(mockAddress);
    expect(card.title).toEqual('');
    expect(card.textBold).toEqual('John Doe');
    expect(card.text).toEqual([
      'Toyosaki 2 create on cart',
      'line2',
      'town, JP-27, JP',
      'zip',
      undefined
    ]);
  });

  it('should call addressSelected(address, index)', () => {
    const card = { title: 'test card' };
    component.cards.push(card);
    component.addressSelected(mockAddress, 0);

    expect(component.selectedAddress).toEqual(mockAddress);
    expect(component.cards[0].header).toEqual('SELECTED');
  });

  it('should call next() to submit request', () => {
    component.selectedAddress = mockAddress;
    component.next();
    expect(component.addAddress.emit).toHaveBeenCalledWith({
      address: mockAddress,
      newAddress: false
    });
  });

  it('should call addNewAddress()', () => {
    component.addNewAddress(mockAddress);
    expect(component.addAddress.emit).toHaveBeenCalledWith({
      address: mockAddress,
      newAddress: true
    });
  });

  it('should call goToAddressForm()', () => {
    component.goToAddressForm();
    expect(component.isAddressForm).toEqual(true);
  });

  it('should call backToAddress()', () => {
    component.backToAddress();
    expect(component.isAddressForm).toEqual(false);
  });

  it('should call back()', () => {
    component.back();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromRouting.Go({
        path: ['/cart']
      })
    );
  });
});
