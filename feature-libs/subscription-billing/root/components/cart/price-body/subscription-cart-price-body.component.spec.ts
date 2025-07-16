import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCartPriceBodyComponent } from './subscription-cart-price-body.component';

describe('SubscriptionCartPriceBodyComponent', () => {
  let component: SubscriptionCartPriceBodyComponent;
  let fixture: ComponentFixture<SubscriptionCartPriceBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionCartPriceBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionCartPriceBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
