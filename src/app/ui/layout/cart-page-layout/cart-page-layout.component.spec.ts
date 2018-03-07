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

class MockCartService {
  removeCartEntry() {}
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
        providers: [{ provide: CartService, useClass: MockCartService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageLayoutComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CartService);

    store = TestBed.get(Store);
  });

  it('should create cart page', () => {
    expect(component).toBeTruthy();
  });
});
