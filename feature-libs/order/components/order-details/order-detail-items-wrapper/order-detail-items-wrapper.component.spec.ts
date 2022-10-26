import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailItemsWrapperComponent } from './order-detail-items-wrapper.component';

describe('OrderDetailItemsWrapperComponent', () => {
  let component: OrderDetailItemsWrapperComponent;
  let fixture: ComponentFixture<OrderDetailItemsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailItemsWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailItemsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
