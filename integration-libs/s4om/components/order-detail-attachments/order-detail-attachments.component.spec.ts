import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderDetailAttachmentsComponent } from './order-detail-attachments.component';
import { Order } from '@spartacus/order/root';
import { OrderDetailsService } from '@spartacus/order/components';
import { By } from '@angular/platform-browser';
import { LaunchDialogService } from '@spartacus/storefront';
import { I18nTestingModule } from '@spartacus/core';

const orderData: Order = {
  code: '00001004',
};

class MockOrderDetailsService {
  getOrderDetails() {
    return of(orderData);
  }
}

describe('OrderDetailAttachmentsComponent', () => {
  let component: OrderDetailAttachmentsComponent;
  let fixture: ComponentFixture<OrderDetailAttachmentsComponent>;
  let orderDetailsService: OrderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [OrderDetailAttachmentsComponent],
      providers: [
        {
          provide: OrderDetailsService,
          useClass: MockOrderDetailsService,
        },
        {
          provide: LaunchDialogService,
          useValue: {},
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(OrderDetailAttachmentsComponent);
    component = fixture.componentInstance;
    orderDetailsService = TestBed.inject(OrderDetailsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onInit call initializeOrder', () => {
    spyOn(component, 'initializeOrder').and.stub();
    component.ngOnInit();
    expect(component.initializeOrder).toHaveBeenCalled();
  });

  it('should return correct order ', () => {
    spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(of(orderData));
    component.initializeOrder();

    expect(component.order$).toBeDefined();
    component.order$.subscribe((order) => {
      expect(order).toEqual(orderData);
    }).unsubscribe();
    expect(orderDetailsService.getOrderDetails).toHaveBeenCalled();
  });

  it('should render content if order is present', () => {
    fixture.detectChanges();
    const contentEls = fixture.debugElement.queryAll(By.css('.row'));
    expect(contentEls.length).toBe(1);
  });

  it('should not render content if order is missing', () => {
    spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(of(undefined));
    fixture.detectChanges();
    const contentEls = fixture.debugElement.queryAll(By.css('.row'));
    expect(contentEls.length).toBe(0);
  });

  it('should not render content if order code is missing', () => {
    spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(of({}));
    fixture.detectChanges();
    const contentEls = fixture.debugElement.queryAll(By.css('.row'));
    expect(contentEls.length).toBe(0);
  });

  it('should open dialog on button click', () => {
    spyOn(component, 'onOrderAttachmentsClick').and.stub();
    component.order$ = of({orderCode: orderData.code} as Order);
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonEl.click();
    expect(component.onOrderAttachmentsClick).toHaveBeenCalledWith(orderData.code);
  });
});

