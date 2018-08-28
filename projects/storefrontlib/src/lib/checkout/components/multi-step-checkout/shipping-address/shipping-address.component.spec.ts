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
import { MaterialModule } from '../../../../material.module';
import { CheckoutService } from '../../../services';
import { CartService, CartDataService } from '../../../../cart/services';
import { AddressFormModule } from './address-form/address-form.module';

const mockAddress = 'mockAddress';

describe('ShippinegAddressComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: ShippingAddressComponent;
  let fixture: ComponentFixture<ShippingAddressComponent>;
  let service: CheckoutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AddressFormModule,
        RouterTestingModule,
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
    const mockAddresses = ['address1', 'address2'];
    spyOn(store, 'select').and.returnValue(of(mockAddresses));
    component.ngOnInit();
    component.existingAddresses$.subscribe(data => {
      expect(data).toBe(mockAddresses);
    });
  });

  it('should call addressSelected(address)', () => {
    component.addressSelected(mockAddress);
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
