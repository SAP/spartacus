import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Component } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';

import { of } from 'rxjs';

import { CartService } from '../../../cart/services';
import * as fromReducer from '../../../cart/store/reducers';

import { CartPageLayoutComponent } from './cart-page-layout.component';

class MockCartService {
  removeCartEntry() {}

  loadCartDetails() {}
}

@Component({
  selector: 'cx-dynamic-slot',
  template: ''
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
}

@Component({
  selector: 'cx-cart-details',
  template: ''
})
export class MockCartDetailsComponent {}

describe('CartPageLayoutComponent', () => {
  let component: CartPageLayoutComponent;
  let fixture: ComponentFixture<CartPageLayoutComponent>;
  let service: CartService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromReducer.getReducers())
      ],
      declarations: [
        CartPageLayoutComponent,
        MockCartDetailsComponent,
        MockDynamicSlotComponent
      ],
      providers: [{ provide: CartService, useClass: MockCartService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageLayoutComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CartService);

    spyOn(service, 'loadCartDetails').and.callThrough();
    spyOnProperty(NgrxStore, 'select').and.returnValue(() => () =>
      of('mockCart')
    );
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
