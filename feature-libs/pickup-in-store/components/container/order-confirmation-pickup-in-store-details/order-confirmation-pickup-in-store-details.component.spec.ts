import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickUpItemsDetailsModule } from '../../presentational';
import { OrderConfirmationPickupInStoreComponent } from './order-confirmation-pickup-in-store-details.component';

describe('OrderConfirmationPickupInStoreComponent', () => {
  let component: OrderConfirmationPickupInStoreComponent;
  let fixture: ComponentFixture<OrderConfirmationPickupInStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderConfirmationPickupInStoreComponent],
      imports: [CommonModule, PickUpItemsDetailsModule],
      providers: [],
    }).compileComponents();
    fixture = TestBed.createComponent(OrderConfirmationPickupInStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create OrderConfirmationPickupInStoreComponent component', () => {
    expect(component).toBeDefined();
  });
});
