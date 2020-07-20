import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApprovalListComponent } from './order-approval-list.component';

describe('OrderApprovalListComponent', () => {
  let component: OrderApprovalListComponent;
  let fixture: ComponentFixture<OrderApprovalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderApprovalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
