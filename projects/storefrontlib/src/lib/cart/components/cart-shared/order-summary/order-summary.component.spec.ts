import { OrderSummaryComponent } from './order-summary.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('OrderSummary', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSummaryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
