import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromCartStore from '../../../../cart/store';
import * as fromUserStore from '../../../../user/store';
import * as fromRoot from '../../../../routing/store';
import { OrderSummaryComponent } from './order-summary.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from '../../../../cart/services';

describe('OrderSummary', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCartStore.getReducers()),
          user: combineReducers(fromUserStore.getReducers())
        })
      ],
      declarations: [OrderSummaryComponent],
      providers: [CartService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
