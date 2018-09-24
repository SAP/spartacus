import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { ReviewSubmitComponent } from './review-submit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import * as fromRoot from '../../../../routing/store';
import * as fromCheckout from '../../../store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../user/store';
import * as fromAuth from '../../../../auth/store';

import { CheckoutService } from '../../../services/checkout.service';
import { CartDataService } from '../../../../cart/services/cart-data.service';

import { CardModule } from '../../../../ui/components/card/card.module';
import { CartSharedModule } from '../../../../cart/components/cart-shared/cart-shared.module';

const mockCart = {
  guid: 'test',
  code: 'test'
};
describe('ReviewSubmitComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: ReviewSubmitComponent;
  let fixture: ComponentFixture<ReviewSubmitComponent>;
  let service: CheckoutService;
  let cartData: CartDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers()),
          checkout: combineReducers(fromCheckout.getReducers()),
          auth: combineReducers(fromAuth.getReducers())
        }),
        CardModule,
        CartSharedModule
      ],
      declarations: [ReviewSubmitComponent],
      providers: [CheckoutService, CartDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSubmitComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CheckoutService);
    cartData = TestBed.get(CartDataService);
    store = TestBed.get(Store);

    cartData.cart = mockCart;
    cartData.userId = 'userId';
    cartData.cart.code = 'cartId';

    component.deliveryAddress = {
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
    component.shippingMethod = 'standard-gross';
    component.paymentDetails = {
      accountHolderName: 'Name',
      cardNumber: '123456789',
      cardType: 'Visa',
      expiryMonth: '01',
      expiryYear: '2022',
      cvn: '123'
    };

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(service, 'loadSupportedDeliveryModes').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get cart, entry, delivery mode, country name if they exists', () => {
    spyOn(store, 'select').and.returnValues(
      of({}),
      of({}),
      of('mockMode'),
      of('mockCountryName')
    );

    component.ngOnInit();
    component.deliveryMode$.subscribe(data => expect(data).toEqual('mockMode'));
    component.countryName$.subscribe(data =>
      expect(data).toEqual('mockCountryName')
    );
  });

  it('should call ngOnInit to get delivery mode if it does not exists', () => {
    spyOn(store, 'select').and.returnValues(of({}), of({}), of(null), of(null));

    component.ngOnInit();
    component.deliveryMode$.subscribe(() => {
      expect(service.loadSupportedDeliveryModes).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCheckout.LoadSupportedDeliveryModes({
          userId: 'userId',
          cartId: 'cartId'
        })
      );
    });
    component.countryName$.subscribe(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromUser.LoadDeliveryCountries()
      );
    });
  });

  it('should call getAddressCard(countryName) to get address card data', () => {
    const card = component.getAddressCard('Canada');
    expect(card.title).toEqual('Ship To');
    expect(card.textBold).toEqual('John Doe');
    expect(card.text).toEqual([
      'Toyosaki 2 create on cart',
      'line2',
      'town, JP-27, Canada',
      'zip',
      undefined
    ]);
  });

  it('should call getShippingMethodCard(deliveryMode) to get shipping method card data', () => {
    const selectedMode = {
      code: 'standard-gross',
      description: 'Standard Delivery description'
    };
    const card = component.getShippingMethodCard(selectedMode);
    expect(card.title).toEqual('Shipping Method');
    expect(card.textBold).toEqual('standard-gross');
    expect(card.text).toEqual(['Standard Delivery description']);
  });

  it('should call getPaymentCard() to get payment card data', () => {
    const card = component.getPaymentCard();
    expect(card.title).toEqual('Payment');
    expect(card.textBold).toEqual('Name');
    expect(card.text).toEqual(['123456789', 'Expires: 01/2022']);
  });
});
