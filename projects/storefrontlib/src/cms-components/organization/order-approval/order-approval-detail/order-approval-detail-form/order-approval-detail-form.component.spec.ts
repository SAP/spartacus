import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApprovalDetailFormComponent } from './order-approval-detail-form.component';

describe('OrderApprovalDetailFormComponent', () => {
  let component: OrderApprovalDetailFormComponent;
  let fixture: ComponentFixture<OrderApprovalDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderApprovalDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApprovalDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
