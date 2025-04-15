import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { S4omOrderAttachmentsComponent } from './s4om-order-attachments.component';
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

describe('S4omOrderAttachmentsComponent', () => {
  let component: S4omOrderAttachmentsComponent;
  let fixture: ComponentFixture<S4omOrderAttachmentsComponent>;
  let orderDetailsService: OrderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [S4omOrderAttachmentsComponent],
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

    orderDetailsService = TestBed.inject(OrderDetailsService);
    spyOn(orderDetailsService, 'getOrderDetails').and.callThrough();
    fixture = TestBed.createComponent(S4omOrderAttachmentsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct order ', () => {
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
    const contentEls = fixture.debugElement.queryAll(By.css('.row'));
    expect(contentEls.length).toBe(1);
  });

  it('should not render content if order is missing', () => {
    // @ts-ignore
    component.order$ = of(undefined);
    fixture.detectChanges();
    const contentEls = fixture.debugElement.queryAll(By.css('.row'));
    expect(contentEls.length).toBe(0);
  });

  it('should not render content if order code is missing', () => {
    component.order$ = of({} as Order);
    fixture.detectChanges();
    const contentEls = fixture.debugElement.queryAll(By.css('.row'));
    expect(contentEls.length).toBe(0);
  });

  it('should open dialog on button click', () => {
    spyOn(component, 'onOrderAttachmentsClick').and.stub();
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonEl.click();
    expect(component.onOrderAttachmentsClick).toHaveBeenCalledWith(
      orderData.code
    );
  });
});
