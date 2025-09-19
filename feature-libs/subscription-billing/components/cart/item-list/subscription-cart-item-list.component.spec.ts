import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCartItemListComponent } from './subscription-cart-item-list.component';

describe('SubscriptionCartItemListComponent', () => {
  let component: SubscriptionCartItemListComponent;
  let fixture: ComponentFixture<SubscriptionCartItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionCartItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionCartItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
