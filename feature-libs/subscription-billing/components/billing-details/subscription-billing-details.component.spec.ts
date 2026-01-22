import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionBillingDetailsComponent } from './subscription-billing-details.component';

describe('SubscriptionBillingDetailsComponent', () => {
  let component: SubscriptionBillingDetailsComponent;
  let fixture: ComponentFixture<SubscriptionBillingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionBillingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionBillingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
