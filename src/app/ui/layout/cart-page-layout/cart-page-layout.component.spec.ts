import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { MaterialModule } from '../../../material.module';
import { CartDetailsComponent } from '../../../cart/components/cart-details/cart-details.component';
import * as fromRoot from '../../../routing/store';
import * as fromReducer from '../../../cart/store/reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '../../../cart/services';
import {
  DynamicSlotComponent,
  ComponentWrapperComponent
} from '../../../cms/components';
import { CartPageLayoutComponent } from './cart-page-layout.component';
import { of } from 'rxjs/observable/of';
import { ComponentMapperService } from '../../../cms/services';
import { Subscription } from 'rxjs/Subscription';

class MockCartService {
  removeCartEntry() {}
}

class MockMapperService {
  getComponentTypeByCode() {}
}

describe('CartPageLayoutComponent', () => {
  let store: Store<fromReducer.CartState>;
  let component: CartPageLayoutComponent;
  let fixture: ComponentFixture<CartPageLayoutComponent>;
  let service: CartService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          RouterTestingModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cart: combineReducers(fromReducer.reducers)
          })
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
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageLayoutComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CartService);

    store = TestBed.get(Store);

    spyOn(store, 'select').and.returnValue(of(['mockData']));
  });

  it('should create cart page', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngAfterViewInit', () => {
    component.cartDetail = new CartDetailsComponent(store, service);

    component.ngAfterViewInit();
    fixture.detectChanges();

    expect(component.cart[0]).toBe('mockData');
  });
});
