import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailApprovalDetailsComponent } from './order-detail-approval-details.component';

describe('OrderDetailApprovalDetailsComponent', () => {
  let component: OrderDetailApprovalDetailsComponent;
  let fixture: ComponentFixture<OrderDetailApprovalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailApprovalDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailApprovalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
