import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApprovalDetailApprovalDetailsComponent } from './order-approval-detail-approval-details.component';

describe('OrderApprovalDetailApprovalDetailsComponent', () => {
  let component: OrderApprovalDetailApprovalDetailsComponent;
  let fixture: ComponentFixture<OrderApprovalDetailApprovalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderApprovalDetailApprovalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApprovalDetailApprovalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
