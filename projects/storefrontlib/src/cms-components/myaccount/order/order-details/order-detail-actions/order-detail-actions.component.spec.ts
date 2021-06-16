import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
  Order,
  StateUtils,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import { OrderDetailActionsComponent } from './order-detail-actions.component';

const mockOrder: Order = {
  code: '1',
  created: new Date('2019-02-11T13:02:58+0000'),
  returnable: true,
  cancellable: false,
};

const mockState: StateUtils.LoaderState<Order> = {
  loading: false,
  error: false,
  success: true,
  value: mockOrder,
};

const mockStateWithError: StateUtils.LoaderState<Order> = {
  loading: false,
  error: true,
  success: true,
  value: undefined,
};

const mockState$ = new BehaviorSubject(mockState);

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockOrderDetailsService {
  getOrderDetailsState(): Observable<StateUtils.LoaderState<Order>> {
    return mockState$.asObservable();
  }
}

describe('OrderDetailActionsComponent', () => {
  let component: OrderDetailActionsComponent;
  let fixture: ComponentFixture<OrderDetailActionsComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule, FeaturesConfigModule],
      providers: [
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { cancellationAndReturn: true },
          },
        },
      ],
      declarations: [OrderDetailActionsComponent, MockUrlPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ', () => {
    let order: Order;
    let error: boolean;

    component.order$
      .subscribe((value) => {
        order = value;
      })
      .unsubscribe();

    component.error$
      .subscribe((value) => {
        error = value;
      })
      .unsubscribe();

    expect(order).toEqual(mockOrder);
    expect(error).toBeFalsy();
  });

  it('should display return button when order is returnable', () => {
    const element: DebugElement = el.queryAll(By.css('a.btn-action'))[0];

    expect(element.nativeElement.textContent).toContain(
      'orderDetails.cancellationAndReturn.returnAction'
    );
  });

  it('should not display cancel button when order is not cancellable', () => {
    mockOrder.returnable = false;

    fixture.detectChanges();
    const element: DebugElement = el.queryAll(By.css('a.btn-action'))[0];

    expect(element).toBeUndefined();
  });

  it('should display order not found when order does not exist', () => {
    mockState$.next(mockStateWithError);

    fixture.detectChanges();
    const element: DebugElement = el.query(By.css('.header'));

    expect(element).toBeTruthy();
  });
});
