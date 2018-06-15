import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryControlsComponent } from './order-history-controls.component';

describe('OrderHistoryControlsComponent', () => {
  let component: OrderHistoryControlsComponent;
  let fixture: ComponentFixture<OrderHistoryControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderHistoryControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
