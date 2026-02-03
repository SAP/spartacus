import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OrderDocumentFlowComponent } from './order-document-flow.component';

const orderData: Order = {
  code: '00001004',
};

class MockOrderDetailsService {
  getOrderDetails() {
    return of(orderData);
  }
}

describe('OrderDocumentFlowComponent', () => {
  let component: OrderDocumentFlowComponent;
  let fixture: ComponentFixture<OrderDocumentFlowComponent>;
  let orderDetailsService: OrderDetailsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, OrderDocumentFlowComponent],
      providers: [
        {
          provide: LaunchDialogService,
          useValue: {},
        },
        {
          provide: OrderDetailsService,
          useClass: MockOrderDetailsService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    orderDetailsService = TestBed.inject(OrderDetailsService);
    spyOn(orderDetailsService, 'getOrderDetails').and.callThrough();
    fixture = TestBed.createComponent(OrderDocumentFlowComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct order', () => {
    expect(component.order$).toBeDefined();
    component.order$
      .subscribe((order) => {
        expect(order).toEqual(orderData);
      })
      .unsubscribe();
    expect(orderDetailsService.getOrderDetails).toHaveBeenCalled();
  });

  it('should render content if order is present', () => {
    fixture.detectChanges();
    const contentEls = fixture.debugElement.queryAll(
      By.css('div.row div button')
    );
    expect(contentEls.length).toBe(1);
  });

  it('should not render content if order is missing', () => {
    // @ts-ignore
    component.order$ = of(undefined);
    fixture.detectChanges();
    const contentEls = fixture.debugElement.queryAll(
      By.css('div.row div button')
    );
    expect(contentEls.length).toBe(0);
  });

  it('should not render content if order code is missing', () => {
    component.order$ = of({} as Order);
    fixture.detectChanges();
    const contentEls = fixture.debugElement.queryAll(
      By.css('div.row div button')
    );
    expect(contentEls.length).toBe(0);
  });

  it('should open dialog on button click', () => {
    spyOn(component, 'onOrderDocumentFlowClick').and.stub();
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonEl.click();
    expect(component.onOrderDocumentFlowClick).toHaveBeenCalledWith(
      orderData.code
    );
  });
});
