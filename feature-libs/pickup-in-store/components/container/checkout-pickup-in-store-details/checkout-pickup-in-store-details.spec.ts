import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickUpItemsDetailsModule } from '../../presentational';
import { DeliveryPointsService } from '../../services/delivery-points.service';
import { DeliveryPointsServiceMock } from '../../services/delivery-points.service.spec';
import { CheckoutPickUpInStoreDetailsComponent } from './checkout-pickup-in-store-details.component';

describe('CheckoutPickUpInStoreDetailsComponent', () => {
  let component: CheckoutPickUpInStoreDetailsComponent;
  let fixture: ComponentFixture<CheckoutPickUpInStoreDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutPickUpInStoreDetailsComponent],
      imports: [CommonModule, PickUpItemsDetailsModule],
      providers: [
        {
          provide: DeliveryPointsService,
          useClass: DeliveryPointsServiceMock,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CheckoutPickUpInStoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
