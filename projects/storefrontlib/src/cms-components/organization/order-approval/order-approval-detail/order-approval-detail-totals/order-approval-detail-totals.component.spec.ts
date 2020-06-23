import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApprovalDetailTotalsComponent } from './order-approval-detail-totals.component';

describe('OrderApprovalDetailTotalsComponent', () => {
  let component: OrderApprovalDetailTotalsComponent;
  let fixture: ComponentFixture<OrderApprovalDetailTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderApprovalDetailTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApprovalDetailTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
