import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCartPriceHeadingComponent } from './subscription-cart-price-heading.component';

describe('SubscriptionCartPriceHeadingComponent', () => {
  let component: SubscriptionCartPriceHeadingComponent;
  let fixture: ComponentFixture<SubscriptionCartPriceHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionCartPriceHeadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionCartPriceHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
