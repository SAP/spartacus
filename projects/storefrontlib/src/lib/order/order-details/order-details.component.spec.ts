import { ActivatedRoute } from '@angular/router';
import { StoreModule, combineReducers } from '@ngrx/store';
import { OccOrderService } from './../../occ/order/order.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailsComponent } from './order-details.component';
import { of } from 'rxjs';
import * as fromRoot from '../../routing/store';
import * as fromUserStore from '../../user/store';
class MockOccOrderService {
  getOrder() {}
}
describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          user: combineReducers(fromUserStore.reducers)
        })
      ],
      declarations: [OrderDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: of({ orderCode: '00000000' })
        },
        {
          provide: OccOrderService,
          useClass: MockOccOrderService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
