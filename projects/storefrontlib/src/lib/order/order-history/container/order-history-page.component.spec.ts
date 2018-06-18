import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderHistoryPageComponent } from './order-history-page.component';
import { OrderHistoryControlsComponent } from '../order-history-controls/order-history-controls.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { OccOrderService } from './../../../occ/order/order.service';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromUserStore from '../../../user/store';

class MockOccOrderService {
  getUserOrders() {}
  getOrder() {}
}
describe('OrderHistoryControlsComponent', () => {
  // let store: Store<fromUserStore.UserState>;
  let component: OrderHistoryPageComponent;
  let fixture: ComponentFixture<OrderHistoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          user: combineReducers(fromUserStore.reducers)
        })
      ],
      declarations: [OrderHistoryPageComponent, OrderHistoryControlsComponent],
      providers: [
        {
          provide: OccOrderService,
          useClass: MockOccOrderService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryPageComponent);
    component = fixture.componentInstance;
    // store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
