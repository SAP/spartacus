import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApprovalDetailsComponent } from './order-approval-details.component';

describe('OrderApprovalDetailsComponent', () => {
  let component: OrderApprovalDetailsComponent;
  let fixture: ComponentFixture<OrderApprovalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderApprovalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApprovalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
