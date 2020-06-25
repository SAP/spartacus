import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHeadlineComponent } from './order-headline.component';

describe('OrderHeadlineComponent', () => {
  let component: OrderHeadlineComponent;
  let fixture: ComponentFixture<OrderHeadlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderHeadlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
