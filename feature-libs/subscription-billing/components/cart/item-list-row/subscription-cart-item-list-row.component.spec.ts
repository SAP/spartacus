import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCartItemListRowComponent } from './subscription-cart-item-list-row.component';

describe('SubscriptionCartItemListRowComponent', () => {
  let component: SubscriptionCartItemListRowComponent;
  let fixture: ComponentFixture<SubscriptionCartItemListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionCartItemListRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionCartItemListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
