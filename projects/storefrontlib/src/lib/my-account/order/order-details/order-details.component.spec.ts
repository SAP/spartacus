import { ActivatedRoute } from '@angular/router';
import { StoreModule, combineReducers } from '@ngrx/store';
import { OccOrderService } from './../../../occ/order/order.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailsComponent } from './order-details.component';
import { CartSharedModule } from '../../../cart/components/cart-shared/cart-shared.module';
import { CardModule } from '../../../ui/components/card/card.module';
import { of } from 'rxjs';
import * as fromRoot from '../../../routing/store';
import * as fromUserStore from '../../../user/store';
import * as fromAuth from '../../../auth/store';
class MockOccOrderService {
  getOrder() {}
}

class MockActivatedRoute {
  params = of({
    orderCode: '1'
  });
}

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CartSharedModule,
        CardModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          user: combineReducers(fromUserStore.getReducers()),
          auth: combineReducers(fromAuth.getReducers())
        })
      ],
      declarations: [OrderDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
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
