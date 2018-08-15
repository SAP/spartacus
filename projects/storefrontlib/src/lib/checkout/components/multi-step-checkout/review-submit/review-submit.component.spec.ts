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

  // let ac: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers()),
          checkout: combineReducers(fromCheckout.getReducers()),
          auth: combineReducers(fromAuth.reducers)
        })
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

    cartData.userId = 'userId';
    cartData.cart.code = 'cartId';

    spyOn(store, 'dispatch').and.callThrough();

    spyOn(service, 'loadSupportedDeliveryModes').and.callThrough();

    spyOn(component, 'toggleTAndC').and.callThrough();
    spyOn(component, 'submitOrder').and.callThrough();
    spyOn(component.backStep, 'emit').and.callThrough();
    spyOn(component.placeOrder, 'emit').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get delivery mode, country name and title name if they exists', () => {
    spyOn(store, 'select').and.returnValues(
      of('mockMode'),
      of('mockCountryName'),
      of('mockTitleName')
    );

    component.ngOnInit();
    component.deliveryMode$.subscribe(data => expect(data).toEqual('mockMode'));
    component.countryName$.subscribe(data =>
      expect(data).toEqual('mockCountryName')
    );
    component.titleName$.subscribe(data =>
      expect(data).toEqual('mockTitleName')
    );
  });

  it('should call ngOnInit to get delivery mode if it does not exists', () => {
    spyOn(store, 'select').and.returnValues(of(null), of(null), of(null));

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
    component.titleName$.subscribe(() => {
      expect(store.dispatch).toHaveBeenCalledWith(new fromUser.LoadTitles());
    });
  });

  it('should call toggleTAndC(toggle)', () => {
    expect(component.tAndCToggler).toBeFalsy();
    component.toggleTAndC();
    expect(component.tAndCToggler).toBeTruthy();
    component.toggleTAndC();
    expect(component.tAndCToggler).toBeFalsy();
  });

  it('should call back()', () => {
    component.back();
    expect(component.backStep.emit).toHaveBeenCalled();
  });

  it('should call submit()', () => {
    component.submitOrder();
    expect(component.placeOrder.emit).toHaveBeenCalled();
  });
});
