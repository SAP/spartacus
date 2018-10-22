import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';
import { ReviewSubmitComponent } from './review-submit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import * as fromRoot from '../../../../routing/store';
import * as fromCheckout from '../../../store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../user/store';
import * as fromAuth from '../../../../auth/store';

import { CheckoutService } from '../../../services/checkout.service';
import { CartDataService } from '../../../../cart/services/cart-data.service';

import { By } from '@angular/platform-browser';

import { Input, Component } from '@angular/core';

const mockCart = {
  guid: 'test',
  code: 'test',
  totalItems: 123,
  subTotal: { formattedValue: '$999.98' },
  potentialProductPromotions: ['promotion 1', 'promotion 2']
};

const mockDeliveryAddress = {
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

const mockShippingMethod = 'standard-gross';

const mockPaymentDetails = {
  accountHolderName: 'Name',
  cardNumber: '123456789',
  cardType: 'Visa',
  expiryMonth: '01',
  expiryYear: '2022',
  cvn: '123'
};

const mockEntries = ['cart entry 1', 'cart entry 2'];

@Component({
  selector: 'y-cart-item-list',
  template: ''
})
class MockCartItemListComponent {
  @Input()
  items;
  @Input()
  isReadOnly;
  @Input()
  potentialProductPromotions;
}

@Component({
  selector: 'y-card',
  template: ''
})
class MockCardComponent {
  @Input()
  content;
}

describe('ReviewSubmitComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: ReviewSubmitComponent;
  let fixture: ComponentFixture<ReviewSubmitComponent>;
  let service: CheckoutService;
  let cartData: CartDataService;
  let mockSelectors: {
    cart: {
      getActiveCart: BehaviorSubject<object>;
      getEntries: BehaviorSubject<any[]>;
    };
    checkout: {
      getSelectedDeliveryMode: BehaviorSubject<string>;
    };
    user: {
      countrySelectorFactory: BehaviorSubject<any>;
    };
  };

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
        })
      ],
      declarations: [
        ReviewSubmitComponent,
        MockCartItemListComponent,
        MockCardComponent
      ],
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

    component.deliveryAddress = mockDeliveryAddress;
    component.shippingMethod = mockShippingMethod;
    component.paymentDetails = mockPaymentDetails;

    mockSelectors = {
      cart: {
        getActiveCart: new BehaviorSubject({}),
        getEntries: new BehaviorSubject([])
      },
      checkout: {
        getSelectedDeliveryMode: new BehaviorSubject('')
      },
      user: {
        countrySelectorFactory: new BehaviorSubject({})
      }
    };
    spyOnProperty(NgrxStore, 'select').and.returnValue(selector => {
      switch (selector) {
        case fromCart.getActiveCart:
          return () => mockSelectors.cart.getActiveCart;
        case fromCart.getEntries:
          return () => mockSelectors.cart.getEntries;
        case fromCheckout.getSelectedDeliveryMode:
          return () => mockSelectors.checkout.getSelectedDeliveryMode;
        default:
          return () => mockSelectors.user.countrySelectorFactory;
      }
    });

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(service, 'loadSupportedDeliveryModes').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get cart, entry, delivery mode, country name if they exists', () => {
    mockSelectors.cart.getActiveCart.next({});
    mockSelectors.cart.getEntries.next([]);
    mockSelectors.checkout.getSelectedDeliveryMode.next('mockMode');
    mockSelectors.user.countrySelectorFactory.next('mockCountryName');

    component.ngOnInit();
    component.deliveryMode$.subscribe(data => expect(data).toEqual('mockMode'));
    component.countryName$.subscribe(data =>
      expect(data).toEqual('mockCountryName')
    );
  });

  it('should call ngOnInit to get delivery mode if it does not exists', () => {
    mockSelectors.cart.getActiveCart.next({});
    mockSelectors.cart.getEntries.next([]);
    mockSelectors.checkout.getSelectedDeliveryMode.next(null);
    mockSelectors.user.countrySelectorFactory.next(null);

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

  it('should call getShippingAddressCard(countryName) to get address card data', () => {
    const card = component.getShippingAddressCard('Canada');
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

  it('should call getPaymentMethodCard() to get payment card data', () => {
    const card = component.getPaymentMethodCard();
    expect(card.title).toEqual('Payment');
    expect(card.textBold).toEqual('Name');
    expect(card.text).toEqual(['123456789', 'Expires: 01/2022']);
  });

  describe('UI cart total section', () => {
    const getCartTotalText = () =>
      fixture.debugElement.query(By.css('.y-review__cart-total')).nativeElement
        .textContent;

    beforeEach(() => {
      mockSelectors.cart.getActiveCart.next(mockCart);
      mockSelectors.cart.getEntries.next([]);
      fixture.detectChanges();
    });

    it('should contain total number of items', () => {
      expect(getCartTotalText()).toContain(123);
    });

    it('should contain total price', () => {
      expect(getCartTotalText()).toContain('$999.98');
    });
  });

  describe('child y-card component of shipping address', () => {
    const getShippingAddressCardContent = () =>
      fixture.debugElement.query(
        By.css('.y-review__summary-card__address y-card')
      ).componentInstance.content;

    it('should receive content attribute with shipping address', () => {
      const mockShippingAdddressCardData = 'test shipping address';
      spyOn(component, 'getShippingAddressCard').and.returnValue(
        mockShippingAdddressCardData
      );
      fixture.detectChanges();
      expect(getShippingAddressCardContent()).toBe(
        mockShippingAdddressCardData
      );
    });
  });

  describe('child y-card component of shipping method', () => {
    const getShippingMethodCardContent = () =>
      fixture.debugElement.query(
        By.css('.y-review__summary-card__shipping-method y-card')
      ).componentInstance.content;

    it('should receive content attribute with shipping method', () => {
      const mockShippingMethodCardData = 'test shipping method';
      spyOn(component, 'getShippingMethodCard').and.returnValue(
        mockShippingMethodCardData
      );
      fixture.detectChanges();
      expect(getShippingMethodCardContent()).toBe(mockShippingMethodCardData);
    });
  });

  describe('child y-card component of payment method', () => {
    const getPaymentMethodCardContent = () =>
      fixture.debugElement.query(
        By.css('.y-review__summary-card__payment-method y-card')
      ).componentInstance;

    it('should receive content attribute with payment method', () => {
      const mockPaymentMethodCardData = 'test payment method';
      spyOn(component, 'getPaymentMethodCard').and.returnValue(
        mockPaymentMethodCardData
      );
      fixture.detectChanges();
      expect(getPaymentMethodCardContent().content).toBe(
        mockPaymentMethodCardData
      );
    });
  });

  describe('child y-cart-item-list component', () => {
    const getCartItemList = () =>
      fixture.debugElement.query(By.css('y-cart-item-list')).componentInstance;

    it('should receive items attribute with cart entires', () => {
      mockSelectors.cart.getEntries.next(mockEntries);

      fixture.detectChanges();
      expect(getCartItemList().items).toEqual(['cart entry 1', 'cart entry 2']);
    });

    it('should receive isReadOnly attribute with value true', () => {
      fixture.detectChanges();
      expect(getCartItemList().isReadOnly).toBe(true);
    });

    it('should receive potentialProductPromotions attribute with potential product promotions of cart', () => {
      mockSelectors.cart.getActiveCart.next(mockCart);

      fixture.detectChanges();
      expect(getCartItemList().potentialProductPromotions).toEqual([
        'promotion 1',
        'promotion 2'
      ]);
    });
  });
});
