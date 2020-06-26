import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApprovalDetailShippingComponent } from './order-approval-detail-shipping.component';

describe('OrderApprovalDetailShippingComponent', () => {
  let component: OrderApprovalDetailShippingComponent;
  let fixture: ComponentFixture<OrderApprovalDetailShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderApprovalDetailShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApprovalDetailShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
