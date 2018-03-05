import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { MaterialModule } from '../../../material.module';
import { CartDetailsComponent } from './cart-details.component';
import * as fromRoot from '../../../routing/store';
import * as fromReducer from '../../../cart/store/reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '../../../cart/services';
import { of } from 'rxjs/observable/of';
import { Location } from '@angular/common';

class MockCartService {
  removeCartEntry() {}
}

const mockComponentData = 'mockComponentData';

fdescribe('CartDetailsComponent', () => {
  let store: Store<fromReducer.CartState>;
  let cartDetailsComponent: CartDetailsComponent;
  let fixture: ComponentFixture<CartDetailsComponent>;
  let service: CartService;
  let location: Location;

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
        declarations: [CartDetailsComponent],
        providers: [{ provide: CartService, useClass: MockCartService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailsComponent);
    cartDetailsComponent = fixture.componentInstance;
    service = TestBed.get(CartService);
    location = TestBed.get(Location);

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of(mockComponentData));
    spyOn(service, 'removeCartEntry').and.callThrough();
    spyOn(location, 'back').and.callThrough();
  });

  it('should create cart details component', () => {
    expect(cartDetailsComponent).toBeTruthy();
  });

  it('should remove entry from cart', () => {
    cartDetailsComponent.removeEntry('mockEntry');
    expect(service.removeCartEntry).toHaveBeenCalledWith('mockEntry');
  });

  it('should go back to the previous page', () => {
    cartDetailsComponent.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
