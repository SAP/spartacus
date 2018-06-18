import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryPageLayoutComponent } from './order-history-page-layout.component';

describe('OrderHistoryPageComponent', () => {
  let component: OrderHistoryPageLayoutComponent;
  let fixture: ComponentFixture<OrderHistoryPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderHistoryPageLayoutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
