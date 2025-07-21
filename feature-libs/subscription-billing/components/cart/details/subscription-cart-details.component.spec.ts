import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCartDetailsComponent } from './subscription-cart-details.component';

describe('SubscriptionCartDetailsComponent', () => {
  let component: SubscriptionCartDetailsComponent;
  let fixture: ComponentFixture<SubscriptionCartDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionCartDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionCartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
