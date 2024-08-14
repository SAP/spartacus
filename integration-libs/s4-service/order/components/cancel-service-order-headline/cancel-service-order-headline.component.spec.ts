import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CancelServiceOrderHeadlineComponent } from './cancel-service-order-headline.component';
import { OrderDetailsService } from '@spartacus/order/components';
import { I18nTestingModule } from '@spartacus/core';
import { Pipe, PipeTransform } from '@angular/core';

// Mock data
const mockOrder = {
  servicedAt: '2024-07-29T10:00:00Z',
  deliveryAddress: { town: 'Test Town' },
  entries: [{ product: { productTypes: 'SERVICE' } }],
};
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('CancelServiceOrderHeadlineComponent', () => {
  let component: CancelServiceOrderHeadlineComponent;
  let fixture: ComponentFixture<CancelServiceOrderHeadlineComponent>;
  let orderDetailsService: jasmine.SpyObj<OrderDetailsService>;

  beforeEach(waitForAsync(() => {
    const orderDetailsServiceSpy = jasmine.createSpyObj('OrderDetailsService', [
      'getOrderDetails',
    ]);
    orderDetailsServiceSpy.getOrderDetails.and.returnValue(of(mockOrder));

    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CancelServiceOrderHeadlineComponent, MockUrlPipe],
      providers: [
        { provide: OrderDetailsService, useValue: orderDetailsServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelServiceOrderHeadlineComponent);
    component = fixture.componentInstance;
    orderDetailsService = TestBed.inject(
      OrderDetailsService
    ) as jasmine.SpyObj<OrderDetailsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getOrderDetails from OrderDetailsService and set order$', () => {
    component.order$.subscribe((order) => {
      expect(order).toEqual({
        ...mockOrder,
        entries: mockOrder.entries.filter(
          (entry) => entry.product && entry.product.productTypes === 'SERVICE'
        ),
      });
    });
    expect(orderDetailsService.getOrderDetails).toHaveBeenCalled();
  });

  it('should display correct service details in the table', () => {
    // Convert the ISO string to a date object
    const mockOrderDate = new Date(mockOrder.servicedAt);

    // Format date and time according to the format used in the component
    const expectedDate = mockOrderDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
    const expectedTime = mockOrderDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    fixture.detectChanges();
    const dateCell = fixture.debugElement
      .query(By.css('.service-row td:nth-child(1)'))
      .nativeElement.textContent.trim();
    const timeCell = fixture.debugElement
      .query(By.css('.service-row td:nth-child(2)'))
      .nativeElement.textContent.trim();
    const locationCell = fixture.debugElement
      .query(By.css('.service-row td:nth-child(3)'))
      .nativeElement.textContent.trim();

    expect(dateCell).toBe(expectedDate);
    expect(timeCell).toBe(expectedTime);
    expect(locationCell).toBe(mockOrder.deliveryAddress.town);
  });

  it('should render the correct aria-label attribute for the heading', () => {
    const headingElement = fixture.debugElement.query(
      By.css('.cx-checkout-title')
    ).nativeElement;
    expect(headingElement.getAttribute('aria-label')).toBe(
      'cancelService.heading'
    );
  });

  it('should render the correct content in the cx-checkout-title', () => {
    const titleElement = fixture.debugElement.query(
      By.css('.cx-checkout-title')
    ).nativeElement;
    expect(titleElement.textContent).toContain('cancelService.heading');
  });
});
