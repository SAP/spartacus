import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionBillingCartItemPriceHeadingComponent } from './subscription-billing-cart-item-price-heading.component';

describe('SubscriptionBillingCartItemHeadingComponent', () => {
  let component: SubscriptionBillingCartItemPriceHeadingComponent;
  let fixture: ComponentFixture<SubscriptionBillingCartItemPriceHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionBillingCartItemPriceHeadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      SubscriptionBillingCartItemPriceHeadingComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
