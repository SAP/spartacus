import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from '@spartacus/storefront';
import { DeliveryPointsService } from '../../services/delivery-points.service';
import { DeliveryPointsServiceMock } from '../../services/delivery-points.service.spec';
import { CheckoutPickUpInStoreDetailsComponent } from './checkout-pickup-in-store-details.component';

describe('CheckoutPickUpInStoreDetailsComponent', () => {
  let component: CheckoutPickUpInStoreDetailsComponent;
  let fixture: ComponentFixture<CheckoutPickUpInStoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutPickUpInStoreDetailsComponent],
      imports: [CommonModule, I18nTestingModule, IconTestingModule],
      providers: [
        {
          provide: DeliveryPointsService,
          useClass: DeliveryPointsServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPickUpInStoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
