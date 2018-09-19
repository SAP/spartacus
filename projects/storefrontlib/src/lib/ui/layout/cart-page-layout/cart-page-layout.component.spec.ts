import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { CartDetailsComponent } from '../../../cart/components/cart-details/container/cart-details.component';

import { CartService } from '../../../cart/services';
import * as fromReducer from '../../../cart/store/reducers';
import {
  ComponentWrapperComponent,
  DynamicSlotComponent
} from '../../../cms/components';
import { ComponentMapperService } from '../../../cms/services';
import * as fromCmsReducer from '../../../cms/store';
import * as fromRoot from '../../../routing/store';
import { CartSharedModule } from './../../../cart/components/cart-shared/cart-shared.module';
import { MaterialModule } from './../../../material.module';
import { ComponentsModule } from './../../components/components.module';
import { CartPageLayoutComponent } from './cart-page-layout.component';

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
          ...fromRoot.getReducers(),
          cart: combineReducers(fromReducer.getReducers()),
          cms: combineReducers(fromCmsReducer.getReducers())
        }),
        ComponentsModule,
        CartSharedModule
      ],
      declarations: [
        CartPageLayoutComponent,
        CartDetailsComponent,
        DynamicSlotComponent,
        ComponentWrapperComponent
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
    spyOn(store, 'select').and.returnValue(of('mockCart'));
  });

  it('should create cart page', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();

    component.cart$.subscribe(cart => {
      expect(cart).toBe('mockCart');
    });
  });
});
