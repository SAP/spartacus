import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApprovalDetailHeadlineComponent } from './order-approval-detail-headline.component';

describe('OrderApprovalDetailHeadlineComponent', () => {
  let component: OrderApprovalDetailHeadlineComponent;
  let fixture: ComponentFixture<OrderApprovalDetailHeadlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderApprovalDetailHeadlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApprovalDetailHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
