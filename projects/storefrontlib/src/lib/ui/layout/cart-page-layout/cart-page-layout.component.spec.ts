import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { MaterialModule } from '../../../material.module';
import { CartDetailsComponent } from '../../../cart/components/cart-details/container/cart-details.component';
import * as fromRoot from '../../../routing/store';
import * as fromReducer from '../../../cart/store/reducers';
import * as fromCmsReducer from '../../../cms/store/reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '../../../cart/services';
import {
  DynamicSlotComponent,
  ComponentWrapperComponent
} from '../../../cms/components';
import { CartPageLayoutComponent } from './cart-page-layout.component';
import { of } from 'rxjs';
import { ComponentMapperService } from '../../../cms/services';
import { OrderSummaryComponent } from '../../../cart/components/cart-shared/order-summary/order-summary.component';
import { CartItemComponent } from '../../../cart/components/cart-shared/cart-item/cart-item.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ItemCounterComponent } from '../../../cart/components/cart-shared/item-counter/item-counter.component';

class MockCartService {
  removeCartEntry() {}

  loadCartDetails() {}
}

class MockMapperService {
  getComponentTypeByCode() {}
}

describe('CartPageLayoutComponent', () => {
  let store: Store<fromReducer.CartState>;
  let component: CartPageLayoutComponent;
  let fixture: ComponentFixture<CartPageLayoutComponent>;
  let service: CartService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          cart: combineReducers(fromReducer.reducers),
          cms: combineReducers(fromCmsReducer.reducers)
        })
      ],
      declarations: [
        CartPageLayoutComponent,
        CartDetailsComponent,
        DynamicSlotComponent,
        ComponentWrapperComponent,
        OrderSummaryComponent,
        CartItemComponent,
        ItemCounterComponent
      ],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: ComponentMapperService, useClass: MockMapperService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageLayoutComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CartService);

    store = TestBed.get(Store);

    spyOn(service, 'loadCartDetails').and.callThrough();
  });

  it('should create cart page', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngAfterViewInit', () => {
    component.cartDetail = new CartDetailsComponent(
      store,
      service,
      new FormBuilder()
    );
    component.cartDetail.cart$ = of(['mockData']);

    component.ngAfterViewInit();
    fixture.detectChanges();

    expect(component.cart[0]).toBe('mockData');
  });
});
